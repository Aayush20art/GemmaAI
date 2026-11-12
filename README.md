<div align="center">

# 🌸 GemmaAI

**Turn any image into scroll-stopping, platform-ready captions in seconds.**

AI-powered caption generator for **Instagram** and **LinkedIn**, built with React, TypeScript, and Google Gemini.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-ec4899?style=for-the-badge&logo=vercel&logoColor=white)](https://gemma-ai-teal.vercel.app/)
![React](https://img.shields.io/badge/React-TypeScript-facc15?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-ec4899?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Gemini](https://img.shields.io/badge/Google-Gemini-facc15?style=for-the-badge&logo=google&logoColor=black)

[Live Demo](https://gemma-ai-teal.vercel.app/) · [Report a Bug](https://github.com/Aayush20art/GemmaAI/issues) · [Request a Feature](https://github.com/Aayush20art/GemmaAI/issues)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [How It Works](#-how-it-works)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Design & Accessibility](#-design--accessibility)
- [Security Notes](#-security-notes)
- [Troubleshooting](#-troubleshooting)
- [Use Cases](#-use-cases)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [Author](#-author)

---

## 🌟 Overview

Writing the right caption takes as much effort as choosing the right photo, and the right tone for Instagram is very different from the right tone for LinkedIn. **GemmaAI** removes that friction: upload an image, pick your platform, and get a polished caption you can copy and post immediately.

It pairs a vibrant **pink & yellow interface** with the multimodal capabilities of **Google Gemini**, so captions are based on what is actually *in* your image rather than generic filler text.

> 📸 *Screenshot / demo GIF goes here, add one to `docs/preview.png` and reference it with `![GemmaAI Preview](docs/preview.png)`.*

---

## ✨ Features

| Feature | Description |
|---|---|
| 📸 **Image Upload** | Upload any image and get captions generated instantly |
| 🤖 **AI-Powered Captions** | Google Gemini analyzes the image and writes context-aware captions |
| 📱 **Platform-Specific Output** | Separate tone and structure for Instagram (expressive, casual) and LinkedIn (professional, insight-driven) |
| 📋 **One-Click Copy** | Copy any caption to your clipboard with a single click |
| 🎨 **Modern UI** | Pink & yellow theme with a clean, card-based layout |
| 📱 **Fully Responsive** | Works smoothly on mobile, tablet, and desktop |
| ⚡ **Lightweight** | Fast load times and a minimal dependency footprint |

---

## ⚙️ How It Works

```
┌──────────────┐     ┌───────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│ Upload image │ ──▶ │ Select platform   │ ──▶ │ Gemini analyzes  │ ──▶ │ Review & copy   │
│              │     │ (Instagram / LI)  │     │ image + prompt   │     │ your caption    │
└──────────────┘     └───────────────────┘     └──────────────────┘     └─────────────────┘
```

1. **Upload**: the image is read in the browser and prepared for the API.
2. **Prompt**: `geminiService.ts` builds a platform-specific prompt around the image.
3. **Generate**: Gemini returns captions tailored to the chosen platform.
4. **Copy**: results render as cards, each with a one-click copy action.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React with TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS |
| **Icons** | Lucide Icons |
| **AI Service** | Google Gemini API |
| **Deployment** | Vercel |

---

## 📂 Project Structure

```
GemmaAI/
├── src/
│   ├── App.tsx                  # Main UI and application state
│   ├── index.tsx                # Application entry point
│   ├── types.ts                 # Shared TypeScript types
│   └── services/
│       └── geminiService.ts     # Gemini API integration and prompt logic
├── .env                         # Local environment variables (not committed)
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** (bundled with Node.js)
- A **Google Gemini API key**. You can get one for free from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Aayush20art/GemmaAI.git
cd GemmaAI
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure environment variables**

Create a `.env` file in the project root:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

**4. Start the development server**

```bash
npm run dev
```

Open the local URL printed in your terminal (typically `http://localhost:5173`).

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Create an optimized production build |
| `npm run preview` | Preview the production build locally |

---

## 🎨 Design & Accessibility

- 🎨 Bright **pink & yellow** palette with clear call-to-action buttons
- 🧱 Card-based result layout with a mobile-first responsive grid
- ✨ Subtle micro-interactions that stay out of the way
- ♿ Accessible color contrast ratios
- ⌨️ Clear focus states and readable typography

---

## 🔐 Security Notes

Variables prefixed with `VITE_` are **bundled into the client-side code**, which means the Gemini API key can be inspected in the browser. This is fine for local development and demos, but for a public production deployment you should:

- **Restrict the key** in Google AI Studio / Google Cloud (HTTP referrer restrictions and quota limits).
- **Or proxy requests** through a small backend or serverless function (e.g., a Vercel Function) so the key never reaches the browser.
- **Never commit** your `.env` file. Make sure it is listed in `.gitignore`.

---

## 🧰 Troubleshooting

| Issue | Fix |
|---|---|
| Captions fail to generate | Verify `VITE_GEMINI_API_KEY` is set correctly and restart the dev server after editing `.env` |
| `403` / `429` API errors | Your key may be restricted or you may have hit the free-tier rate limit; wait and retry |
| Large image fails to upload | Try a smaller or compressed image |
| Environment variable is `undefined` | Ensure the name starts with `VITE_` and the file is named exactly `.env` |

---

## 🎯 Use Cases

- 👩‍🎨 **Content creators** who want faster, fresher captions
- 📊 **Social media managers** handling multiple platforms and tones
- 🎓 **Students & marketers** building their personal brand
- 💼 **Portfolio / interview showcase** demonstrating AI integration in a polished UI

---

## 🔮 Roadmap

- [ ] 🌗 Light / Dark theme toggle
- [ ] 🧠 Caption tone selector *(funny, professional, bold)*
- [ ] 🏷️ Smart hashtag suggestions and analytics
- [ ] 💾 Saved caption history
- [ ] 🌍 Multi-language caption support
- [ ] 🎥 Framer Motion animations
- [ ] 🔒 Serverless API proxy for secure key handling

Have an idea? [Open an issue](https://github.com/Aayush20art/GemmaAI/issues) and let's talk.

---

## 🤝 Contributing

Contributions are welcome!

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature`
3. **Commit** your changes: `git commit -m "Add your feature"`
4. **Push** to the branch: `git push origin feature/your-feature`
5. **Open** a Pull Request

---

## 👤 Author

**Aayush**

[![GitHub](https://img.shields.io/badge/GitHub-Aayush20art-181717?style=flat&logo=github)](https://github.com/Aayush20art)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat&logo=linkedin)](https://linkedin.com/in/aayush-sharma-b108a93b0)

---

## ⭐ Support

If GemmaAI helped you, consider:

- ⭐ **Starring** the repository
- 🍴 **Forking** it and building on top
- 🐛 **Reporting issues** or suggesting improvements via GitHub Issues

---

<p align="center">Made with 💖 by Aayush &nbsp;|&nbsp; Powered by Google Gemini</p>
