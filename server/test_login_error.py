import urllib.request
import json

data = json.dumps({'email': 'wrong@example.com', 'password': 'wrongpass'}).encode('utf-8')
req = urllib.request.Request('http://localhost:8000/auth/login', data=data, headers={'Content-Type': 'application/json'})

try:
    response = urllib.request.urlopen(req)
    print('Unexpected success')
except urllib.error.HTTPError as e:
    print('Expected error:', e.code)
    result = json.loads(e.read())
    print('Error message:', result)
