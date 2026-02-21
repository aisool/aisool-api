import requests

url = 'https://aisool-max-v2.hf.space/v1/chat/completions'
headers = {
    'Authorization': 'Bearer YOUR_API_KEY', 
    'Content-Type': 'application/json'
}
data = {
    'model': 'sool-max',
    'messages': [{'role': 'user', 'content': 'Hello AI!'}]
}

response = requests.post(url, json=data, headers=headers)
resp_json = response.json()

message = resp_json.get('choices', [{}])[0].get('message', {})

print('Role:', message.get('role'))
print('Content:', message.get('content'))
print('Finish Reason:', resp_json.get('choices', [{}])[0].get('finish_reason'))
print('Usage:', resp_json.get('usage'))
