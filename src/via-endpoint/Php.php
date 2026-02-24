<?php
$ch = curl_init('https://api.aisool.com/v1/chat/completions');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer YOUR_API_KEY', 
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'model' => 'sool-max',
    'messages' => [
        ['role' => 'user', 'content' => 'Hello AI!']
    ]
]));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$res = curl_exec($ch);
curl_close($ch);

$data = json_decode($res, true);
$message = $data['choices'][0]['message'] ?? [];

echo 'Role: ' . ($message['role'] ?? '') . PHP_EOL;
echo 'Content: ' . ($message['content'] ?? '') . PHP_EOL;
echo 'Finish Reason: ' . ($data['choices'][0]['finish_reason'] ?? '') . PHP_EOL;
echo 'Usage: ' . json_encode($data['usage'] ?? []) . PHP_EOL;


// image generation
<?php
$ch = curl_init('https://api.aisool.com/v1/images/generations');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer YOUR_API_KEY', 
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'prompt' => 'A cute cat wearing a hat',
    'n' => 1,
    'size' => '1024x1024'
]));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$res = curl_exec($ch);
curl_close($ch);

$data = json_decode($res, true);
$imageUrl = $data['data'][0]['url'] ?? '';

echo 'Image URL/Base64: ' . $imageUrl . PHP_EOL;
echo 'Created: ' . ($data['created'] ?? '') . PHP_EOL;
