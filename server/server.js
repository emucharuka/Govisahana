const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/govisahana';

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const { Resend } = require('resend');
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// --- EMAIL TRANSPORTER (Gmail SMTP fallback) ---
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS  // Gmail App Password
  }
});

// --- MONGOOSE MODELS ---

// User Schema (updated: email added, phone optional for login but stored at signup)
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, default: '' },
  name: { type: String, required: true },
  role: { type: String, enum: ['farmer', 'expert'], required: true },
  district: { type: String, default: 'Anuradhapura' },
  cropOrDept: { type: String, default: '' },
  designation: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

// OTP Schema — stores temporary OTP codes
const otpSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, trim: true },
  code: { type: String, required: true },
  expiresAt: { type: Date, required: true }
});
const OTP = mongoose.model('OTP', otpSchema);

// Consultation Ticket Schema
const consultationSchema = new mongoose.Schema({
  ticketId: { type: String, required: true, unique: true },
  farmerPhone: { type: String, default: '' },
  farmerName: { type: String, required: true },
  farmerDistrict: { type: String, required: true },
  title: { type: String, required: true },
  cropType: { type: String, required: true },
  cropLabel: { type: String, required: true },
  description: { type: String, required: true },
  sampleImage: { type: String, default: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80' },
  status: { type: String, enum: ['Pending', 'In Progress', 'Resolved'], default: 'Pending' },
  assignedExpertName: { type: String, default: 'Agronomist Extension Desk' },
  prescription: {
    diagnosis: String,
    treatment: String,
    dosage: String,
    timing: String,
    issuedAt: Date,
    expertName: String
  },
  createdAt: { type: Date, default: Date.now }
});
const Consultation = mongoose.model('Consultation', consultationSchema);

// Chat Message Schema
const messageSchema = new mongoose.Schema({
  consultationId: { type: String, required: true },
  senderName: { type: String, required: true },
  senderRole: { type: String, required: true },
  text: { type: String, default: '' },
  image: { type: String, default: null },
  timestamp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

// --- HELPER: Send OTP Email ---
async function sendOtpEmail(email, code) {
  const emailHtml = `
    <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;background:#f4f9f5;padding:32px;border-radius:16px;">
      <div style="text-align:center;margin-bottom:24px;">
        <h1 style="color:#1B5E20;font-size:28px;margin:0;">🌾 GoviSahana</h1>
        <p style="color:#555;font-size:13px;margin-top:6px;">Sri Lanka Agricultural Advisory Platform</p>
      </div>
      <div style="background:#fff;border-radius:12px;padding:24px;text-align:center;border:1px solid #c8e6c9;">
        <p style="color:#333;font-size:14px;margin:0 0 16px;">Your One-Time Verification Code is:</p>
        <div style="background:#1B5E20;color:#fff;font-size:40px;font-weight:900;letter-spacing:10px;padding:16px 24px;border-radius:10px;display:inline-block;font-family:monospace;">
          ${code}
        </div>
        <p style="color:#888;font-size:12px;margin-top:16px;">This code expires in <strong>5 minutes</strong>.</p>
        <p style="color:#888;font-size:12px;">If you did not request this, please ignore this email.</p>
      </div>
      <p style="text-align:center;color:#aaa;font-size:11px;margin-top:20px;">GoviSahana • Cultivating Knowledge Together</p>
    </div>
  `;

  // 1. Try Resend HTTPS API first (Never blocked by local ISP firewalls)
  if (resend) {
    try {
      const response = await resend.emails.send({
        from: 'GoviSahana <onboarding@resend.dev>',
        to: email,
        subject: 'Your GoviSahana Verification Code: ' + code,
        html: emailHtml
      });
      if (response && response.error) {
        throw new Error(response.error.message || 'Resend API returned error');
      }
      console.log(`🚀 Real email delivered via Resend to ${email} (ID: ${response.data?.id})`);
      return response;
    } catch (apiErr) {
      console.warn(`Resend attempt failed (${apiErr.message}), trying SMTP fallback...`);
    }
  }

  // 2. Fallback to Nodemailer SMTP
  const mailOptions = {
    from: `"GoviSahana 🌾" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your GoviSahana Verification Code',
    html: emailHtml
  };
  return transporter.sendMail(mailOptions);
}

// --- REST API ENDPOINTS ---

// Healthcheck
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'GoviSahana Express & MongoDB API',
    timestamp: new Date().toISOString(),
    dbConnected: mongoose.connection.readyState === 1
  });
});

// --- OTP: Send ---
app.post('/api/otp/send', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email address is required.' });
    }

    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Delete any existing OTP for this email, then save new one
    await OTP.deleteMany({ email: email.toLowerCase() });
    await OTP.create({ email: email.toLowerCase(), code, expiresAt });

    // Attempt to send email
    try {
      await sendOtpEmail(email, code);
      console.log(`✉️ OTP email successfully dispatched to ${email}`);
      res.json({ message: `OTP sent to ${email}` });
    } catch (mailErr) {
      console.warn(`⚠️ Email delivery failed (${mailErr.message}).`);
      console.log(`🔑 [DEBUG OTP CODE FOR ${email}]: ${code}`);
      
      // If Resend test restriction triggered (sending to non-registered email on free sandbox domain)
      if (mailErr.message && mailErr.message.includes('only send testing emails to your own email address')) {
        return res.status(403).json({
          error: `Resend sandbox only allows sending to your account email (govisahana.srilanka@gmail.com). To test, please use govisahana.srilanka@gmail.com, or check console code: ${code}`,
          devCode: code
        });
      }

      res.status(500).json({ 
        error: `Failed to deliver email: ${mailErr.message}. For local testing, code is: ${code}`,
        devCode: code 
      });
    }
  } catch (err) {
    console.error('OTP send error:', err.message);
    res.status(500).json({ error: 'Failed to process OTP request.', details: err.message });
  }
});

// --- OTP: Verify ---
app.post('/api/otp/verify', async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      return res.status(400).json({ error: 'Email and OTP code are required.' });
    }

    const otpRecord = await OTP.findOne({ email: email.toLowerCase() });

    if (!otpRecord) {
      return res.status(400).json({ error: 'No OTP found for this email. Please request a new one.' });
    }
    if (new Date() > otpRecord.expiresAt) {
      await OTP.deleteMany({ email: email.toLowerCase() });
      return res.status(400).json({ error: 'OTP has expired. Please request a new one.' });
    }
    if (otpRecord.code !== code.toString()) {
      return res.status(400).json({ error: 'Incorrect OTP code. Please try again.' });
    }

    // OTP is valid — delete it
    await OTP.deleteMany({ email: email.toLowerCase() });
    res.json({ message: 'OTP verified successfully.', verified: true });
  } catch (err) {
    res.status(500).json({ error: 'OTP verification failed.', details: err.message });
  }
});

// --- Auth: Register ---
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, phone, role, district, cropOrDept, designation } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({ error: 'Name, email, and role are required.' });
    }

    let existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      // Update existing user
      existingUser.name = name;
      existingUser.role = role;
      existingUser.phone = phone || existingUser.phone;
      existingUser.district = district || existingUser.district;
      existingUser.cropOrDept = cropOrDept || existingUser.cropOrDept;
      existingUser.designation = designation || existingUser.designation;
      await existingUser.save();
      return res.json({ message: 'User updated successfully', user: existingUser });
    }

    const newUser = new User({ name, email: email.toLowerCase(), phone: phone || '', role, district, cropOrDept, designation });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed', details: err.message });
  }
});

// --- Auth: Login (by email) ---
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, role } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    let user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // Auto-create user on first login
      const defaultName = role === 'expert' ? 'Agronomist Officer' : 'Farmer Member';
      user = new User({
        email: email.toLowerCase(),
        name: defaultName,
        role: role || 'farmer',
        district: 'Anuradhapura'
      });
      await user.save();
    }

    res.json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
});

// Consultations: Get All
app.get('/api/consultations', async (req, res) => {
  try {
    const { district, status, farmerPhone } = req.query;
    let filter = {};
    if (district && district !== 'all') filter.farmerDistrict = district;
    if (status && status !== 'all') filter.status = status;
    if (farmerPhone) filter.farmerPhone = farmerPhone;
    const consultations = await Consultation.find(filter).sort({ createdAt: -1 });
    res.json(consultations);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch consultations', details: err.message });
  }
});

// Consultations: Create Ticket
app.post('/api/consultations', async (req, res) => {
  try {
    const { farmerPhone, farmerName, farmerDistrict, title, cropType, cropLabel, description, sampleImage } = req.body;
    if (!title || !description || !farmerName) {
      return res.status(400).json({ error: 'Title, description, and farmer name are required' });
    }
    const ticketCount = await Consultation.countDocuments();
    const ticketId = `GS-2026-${String(ticketCount + 101).padStart(3, '0')}`;
    const newTicket = new Consultation({
      ticketId,
      farmerPhone: farmerPhone || '',
      farmerName,
      farmerDistrict: farmerDistrict || 'Anuradhapura',
      title,
      cropType: cropType || 'paddy',
      cropLabel: cropLabel || 'Paddy / Rice',
      description,
      sampleImage: sampleImage || 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80',
      status: 'Pending'
    });
    await newTicket.save();
    const initialMsg = new Message({
      consultationId: newTicket._id.toString(),
      senderName: farmerName,
      senderRole: 'farmer',
      text: `Consultation Ticket Created: ${description}`,
      image: sampleImage || null,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    await initialMsg.save();
    res.status(201).json({ message: 'Consultation ticket created', consultation: newTicket });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create consultation', details: err.message });
  }
});

// Consultations: Get Messages
app.get('/api/consultations/:id/messages', async (req, res) => {
  try {
    const messages = await Message.find({ consultationId: req.params.id }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages', details: err.message });
  }
});

// Consultations: Send Message
app.post('/api/consultations/:id/messages', async (req, res) => {
  try {
    const { senderName, senderRole, text, image } = req.body;
    const newMsg = new Message({
      consultationId: req.params.id,
      senderName: senderName || 'User',
      senderRole: senderRole || 'farmer',
      text: text || '',
      image: image || null,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    await newMsg.save();
    await Consultation.findByIdAndUpdate(req.params.id, { $set: { status: 'In Progress' } });
    res.status(201).json(newMsg);
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message', details: err.message });
  }
});

// Consultations: Issue Prescription
app.post('/api/consultations/:id/prescription', async (req, res) => {
  try {
    const { diagnosis, treatment, dosage, timing, expertName } = req.body;
    const prescription = { diagnosis, treatment, dosage, timing, expertName: expertName || 'Senior Agronomist', issuedAt: new Date() };
    const updatedConsultation = await Consultation.findByIdAndUpdate(
      req.params.id,
      { $set: { prescription, status: 'Resolved' } },
      { new: true }
    );
    const systemMsg = new Message({
      consultationId: req.params.id,
      senderName: expertName || 'Extension Officer Desk',
      senderRole: 'expert',
      text: `Official Agronomist Prescription Issued for ${diagnosis}. Remedy: ${treatment}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    await systemMsg.save();
    res.json({ message: 'Prescription issued successfully', consultation: updatedConsultation });
  } catch (err) {
    res.status(500).json({ error: 'Failed to issue prescription', details: err.message });
  }
});

// Agro Data
app.get('/api/agro-data', (req, res) => {
  res.json({
    season: 'Maha Season 2026',
    soilHumidity: '78% Optimal',
    weatherForecast: 'Moderate rainfall expected across Dry Zone over next 48 hours. Hold nitrogen fertilizer application until clear weather.',
    marketRates: [
      { crop: 'Paddy (Samba)', price: 'Rs. 125/kg', trend: 'up' },
      { crop: 'Tea Green Leaf', price: 'Rs. 240/kg', trend: 'up' },
      { crop: 'Coconut', price: 'Rs. 95/nut', trend: 'up' },
      { crop: 'Black Pepper', price: 'Rs. 1,450/kg', trend: 'stable' }
    ]
  });
});

// Connect to MongoDB & Start Server
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log(`✅ Connected to MongoDB at: ${MONGODB_URI}`);
    app.listen(PORT, () => {
      console.log(`🚀 GoviSahana Backend running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.warn(`⚠️ MongoDB error (${err.message}). Starting in offline mode...`);
    app.listen(PORT, () => {
      console.log(`🚀 GoviSahana Backend running on http://localhost:${PORT} (Offline mode)`);
    });
  });
