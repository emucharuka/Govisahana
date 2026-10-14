import os
import sys
import json
from datetime import datetime
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse

# Ensure sys.stdout handles UTF-8 safely
sys.stdout.reconfigure(encoding='utf-8')

# MongoDB Driver Integration
try:
    from pymongo import MongoClient
    mongo_client = MongoClient(os.getenv("MONGODB_URI", "mongodb://127.0.0.1:27017/"), serverSelectionTimeoutMS=2000)
    db = mongo_client["govisahana"]
    # Trigger connection check
    mongo_client.admin.command('ping')
    db_connected = True
    print("[DB] Connected to MongoDB database successfully.")
except Exception as e:
    db = None
    db_connected = False
    print(f"[DB] Running in API Mode with fallback memory store. MongoDB notice: {e}")

# In-memory data store fallbacks
USERS_DB = {}
CONSULTATIONS_DB = [
    {
        "id": "con_101",
        "ticketId": "GS-2026-089",
        "farmerName": "Sunil Rathnayake",
        "farmerDistrict": "Anuradhapura",
        "title": "Yellowing leaves & brown spots in Maha season paddy crop",
        "cropType": "paddy",
        "cropLabel": "Paddy / Rice",
        "description": "Leaves on my 3-acre paddy field near Kekirawa are turning yellowish brown with elongated dark spots after heavy evening rain.",
        "status": "In Progress",
        "sampleImage": "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80"
    }
]
MESSAGES_DB = {
    "con_101": [
        {
            "id": "msg_1",
            "senderName": "Sunil Rathnayake",
            "senderRole": "farmer",
            "text": "Greetings Doctor! Leaves on my paddy crop are showing severe yellowing after recent heavy rains.",
            "image": "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80",
            "timestamp": "09:30 AM"
        }
    ]
}

class GoviSahanaAPIHandler(BaseHTTPRequestHandler):
    def _set_headers(self, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers(200)

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path
        query = parse_qs(parsed.query)

        if path == '/api/health':
            self._set_headers(200)
            res = {
                'status': 'online',
                'service': 'GoviSahana Python & MongoDB Backend API',
                'timestamp': datetime.now().isoformat(),
                'dbConnected': db_connected
            }
            self.wfile.write(json.dumps(res).encode('utf-8'))

        elif path == '/api/agro-data':
            self._set_headers(200)
            res = {
                'season': 'Maha Season 2026',
                'soilHumidity': '78% Optimal',
                'weatherForecast': 'Moderate rainfall expected across Dry Zone over next 48 hours. Hold nitrogen fertilizer application until clear weather.',
                'marketRates': [
                    {'crop': 'Paddy (Samba)', 'price': 'Rs. 125/kg', 'trend': 'up'},
                    {'crop': 'Tea Green Leaf', 'price': 'Rs. 240/kg', 'trend': 'up'},
                    {'crop': 'Coconut', 'price': 'Rs. 95/nut', 'trend': 'up'},
                    {'crop': 'Black Pepper', 'price': 'Rs. 1,450/kg', 'trend': 'stable'}
                ]
            }
            self.wfile.write(json.dumps(res).encode('utf-8'))

        elif path == '/api/consultations':
            self._set_headers(200)
            district = query.get('district', ['all'])[0]
            status_filter = query.get('status', ['all'])[0]

            results = []
            if db_connected and db is not None:
                try:
                    q = {}
                    if district != 'all': q['farmerDistrict'] = district
                    if status_filter != 'all': q['status'] = status_filter
                    cursor = db.consultations.find(q, {'_id': 0}).sort('createdAt', -1)
                    results = list(cursor)
                except Exception:
                    results = CONSULTATIONS_DB
            else:
                results = CONSULTATIONS_DB

            self.wfile.write(json.dumps(results).encode('utf-8'))

        elif path.startswith('/api/consultations/') and path.endswith('/messages'):
            parts = path.split('/')
            cid = parts[3]
            self._set_headers(200)

            msgs = []
            if db_connected and db is not None:
                try:
                    cursor = db.messages.find({'consultationId': cid}, {'_id': 0}).sort('createdAt', 1)
                    msgs = list(cursor)
                except Exception:
                    msgs = MESSAGES_DB.get(cid, [])
            else:
                msgs = MESSAGES_DB.get(cid, [])

            self.wfile.write(json.dumps(msgs).encode('utf-8'))

        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({'error': 'Endpoint not found'}).encode('utf-8'))

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path

        content_length = int(self.headers.get('Content-Length', 0))
        body_bytes = self.rfile.read(content_length)
        body = json.loads(body_bytes.decode('utf-8')) if body_bytes else {}

        if path == '/api/auth/register':
            name = body.get('name', '')
            phone = body.get('phone', '')
            role = body.get('role', 'farmer')

            user_doc = {
                'name': name,
                'phone': phone,
                'role': role,
                'district': body.get('district', 'Anuradhapura'),
                'cropOrDept': body.get('cropOrDept', ''),
                'designation': body.get('designation', '')
            }

            if db_connected and db is not None:
                try:
                    db.users.update_one({'phone': phone}, {'$set': user_doc}, upsert=True)
                except Exception:
                    USERS_DB[phone] = user_doc
            else:
                USERS_DB[phone] = user_doc

            self._set_headers(201)
            self.wfile.write(json.dumps({'message': 'Registered successfully', 'user': user_doc}).encode('utf-8'))

        elif path == '/api/auth/login':
            phone = body.get('phone', '')
            role = body.get('role', 'farmer')

            user = None
            if db_connected and db is not None:
                try:
                    user = db.users.find_one({'phone': phone}, {'_id': 0})
                except Exception:
                    user = USERS_DB.get(phone)
            else:
                user = USERS_DB.get(phone)

            if not user:
                user = {
                    'phone': phone,
                    'name': 'Agronomist Officer' if role == 'expert' else 'Farmer Member',
                    'role': role,
                    'district': 'Anuradhapura'
                }

            self._set_headers(200)
            self.wfile.write(json.dumps({'message': 'Login successful', 'user': user}).encode('utf-8'))

        elif path == '/api/consultations':
            cid = f"con_{len(CONSULTATIONS_DB) + 101}"
            ticket_id = f"GS-2026-{len(CONSULTATIONS_DB) + 101}"
            consultation = {
                'id': cid,
                'ticketId': ticket_id,
                'farmerName': body.get('farmerName', 'Farmer Member'),
                'farmerDistrict': body.get('farmerDistrict', 'Anuradhapura'),
                'title': body.get('title', 'Crop Query'),
                'cropType': body.get('cropType', 'paddy'),
                'cropLabel': body.get('cropLabel', 'Paddy / Rice'),
                'description': body.get('description', ''),
                'sampleImage': body.get('sampleImage', 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80'),
                'status': 'Pending'
            }

            if db_connected and db is not None:
                try:
                    db.consultations.insert_one(dict(consultation))
                except Exception:
                    CONSULTATIONS_DB.insert(0, consultation)
            else:
                CONSULTATIONS_DB.insert(0, consultation)

            self._set_headers(201)
            self.wfile.write(json.dumps({'message': 'Created', 'consultation': consultation}).encode('utf-8'))

        elif path.startswith('/api/consultations/') and path.endswith('/messages'):
            parts = path.split('/')
            cid = parts[3]
            msg = {
                'id': f"msg_{datetime.now().timestamp()}",
                'consultationId': cid,
                'senderName': body.get('senderName', 'User'),
                'senderRole': body.get('senderRole', 'farmer'),
                'text': body.get('text', ''),
                'image': body.get('image', None),
                'timestamp': datetime.now().strftime('%I:%M %p')
            }

            if db_connected and db is not None:
                try:
                    db.messages.insert_one(dict(msg))
                except Exception:
                    if cid not in MESSAGES_DB: MESSAGES_DB[cid] = []
                    MESSAGES_DB[cid].append(msg)
            else:
                if cid not in MESSAGES_DB: MESSAGES_DB[cid] = []
                MESSAGES_DB[cid].append(msg)

            self._set_headers(201)
            self.wfile.write(json.dumps(msg).encode('utf-8'))

        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({'error': 'Endpoint not found'}).encode('utf-8'))

def run(server_class=HTTPServer, handler_class=GoviSahanaAPIHandler, port=5000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f"[Server] GoviSahana Python & MongoDB Backend API listening on http://localhost:{port}")
    httpd.serve_forever()

if __name__ == '__main__':
    run()
