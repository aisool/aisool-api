import requests

url = 'https://api.aisool.com/v1/chat/completions'
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


# image generation
import requests

url = 'https://api.aisool.com/v1/images/generations'
headers = {
    'Authorization': 'Bearer YOUR_API_KEY', 
    'Content-Type': 'application/json'
}
data = {
    'prompt': 'A portrait of a robot holding a flower',
    'n': 1,
    'size': '1024x1024'
}

response = requests.post(url, json=data, headers=headers)
resp_json = response.json()

image_url = resp_json.get('data', [{}])[0].get('url')
print('Created:', resp_json.get('created'))
print('Image Data:', image_url)
