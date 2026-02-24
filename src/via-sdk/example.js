// npm install aisool-sdk
// or
// pnpm add aisool-sdk
// or
// yarn add aisool-sdk

import { AisoolClient } from 'aisool-sdk';
// Or use esm.sh 
// import { AisoolClient } from 'https://esm.sh/aisool-sdk';

const client = new AisoolClient('YOUR_API_KEY');

async function askAI() {
  try {
    const response = await client.chat('Hello! How are you?');
    console.log('AI Response:', response.content);
    console.log('Usage:', response.usage);
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

askAI();

// Image generation
async function generateArt() {
  try {
    const response = await client.generateImage('A futuristic neon city at night');
    console.log('Image URL (Base64):', response.data[0].url);
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

generateArt();
