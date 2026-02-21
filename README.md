````markdown
# Aisool SDK

The official JavaScript / TypeScript SDK for interacting with **Aisool AI – Sool Max v2**.

Aisool SDK provides a simple and secure way to communicate with the Aisool AI API using the OpenAI-compatible Chat Completions API format.

---

## ✨ Features

- 🚀 Simple and lightweight
- 🔐 Secure Bearer token authentication
- 💬 Chat-based AI interaction
- 📦 Full TypeScript support
- ⚡ Works in Node.js and modern frameworks (Next.js, Vite, etc.)
- 🔄 OpenAI-compatible API format

---

## 📦 Installation

Install via your favorite package manager:

```bash
npm install aisool-sdk
# or
pnpm add aisool-sdk
# or
yarn add aisool-sdk
````

---

## 🚀 Quick Start

```ts
import { AisoolClient } from 'aisool-sdk';

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
```

---

## 🔑 Authentication

You must provide your **Aisool API Key** when creating the client.

The SDK uses secure Bearer authentication under the hood.

```ts
const client = new AisoolClient('YOUR_API_KEY');
```

⚠️ **Never expose your API key in frontend public code.**

Use environment variables instead:

```ts
const client = new AisoolClient(process.env.AISOOL_API_KEY!);
```

---

## 💬 Chat Method

### `client.chat(message: string)`

Sends a message to **Sool Max v2** (`sool-max` model) and returns a structured AI response.

### Example

```ts
const response = await client.chat('Explain quantum computing simply.');
console.log(response.content);
```

---

## 📦 Response Format

```ts
interface ChatResponse {
  role: 'assistant' | 'user';
  content: string;
  finish_reason: string | null;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}
```

Example returned object:

```ts
{
  role: 'assistant',
  content: 'Quantum computing is...',
  finish_reason: 'stop',
  usage: {
    prompt_tokens: 12,
    completion_tokens: 45,
    total_tokens: 57
  }
}
```

---

## 🧠 Advanced Usage (Conversation Context)

For multi-turn conversations, you can manage conversation history manually:

```ts
const response1 = await client.chat('Who is Albert Einstein?');
const response2 = await client.chat('When was he born?');

console.log(response2.content);
```

> For full conversation memory support, store previous messages and send them in sequence (coming in future SDK updates).

---

## 🛠 Error Handling

Always wrap requests in `try/catch`:

```ts
try {
  const res = await client.chat('Hello AI');
} catch (error: any) {
  console.error(error.message);
}
```

Errors may include:

* Invalid API key
* Network issues
* Rate limits
* Invalid request format

---

## 🌍 Environment Support

* Node.js 18+
* Next.js
* Vite
* React
* TypeScript projects
* Any environment supporting `fetch`

---

## 📄 License

MIT License © 2026 AiSool

---

## 🔗 Official Links

* Website: [https://aisool.com](https://aisool.com)
* Documentation & API Settings: [https://aisool.com/api](https://aisool.com/api)

---

Built with ❤️ for developers.

```