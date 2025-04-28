# AI PII Finder 🕵️
An AI-powered Personal Identifiable Information (PII) detection tool built with Next.js, and the [Vercel AI SDK](https://sdk.vercel.ai), leveraging Google's Gemini model
## Overview
This application provides a conversational interface to analyze and detect Personal Identifiable Information (PII) in text content. The tool leverages Google's Gemini 2.0 Flash model with the [Google Generative AI Provider](https://sdk.vercel.ai/providers/ai-sdk-providers/google-generative-ai.). And the project is deployed on [Vercel](https://vercel.com/).

### Technical Challenges and Development Process
I started this project on top of the Supplier Search Tool. The implementation of a PII reader was very simple. 
The first step was to build a component for file upload. The one implemented is capable of uploading multiple files, but I decided to work with only one for now. I also added a new rule requiring the user to upload a file before trying to start a conversation with the model.

To allow file uploads in the messages, we first need to use a model that supports it. In the implementation, we also need to leverage the **experimental_attachment** feature in the useChat handleSubmit chatRequestOptions.
It was also necessary to update the system's initial prompt to enable a more objective behavior in PII extraction.

## Features
- **Conversational AI Interface**: Upload a PDF or Image file and chat with the AI to analyze PII
- **PII Detection**: Identify various types of personal information including:
  - Names
  - Email addresses
  - Phone numbers
  - Social security numbers
  - Credit card numbers
  - Physical addresses
  - And more
- **Responsive Design**: Works on desktop and mobile devices
- **Markdown Support**: Well-formatted responses with a beautiful markdown rendering

## Technologies
- **Framework**: Next.js 15 with App Router
- **AI**: Google Gemini 2.0 Flash via [Vercel AI SDK](https://sdk.vercel.ai)
- **Frontend**: React 19, TailwindCSS 4
- **TypeScript**: Type safety
- **Libraries**:
  - `ai`: v4.3.9 - Core AI functionality 
  - `@ai-sdk/google`: v1.2.13 - Google AI models integration
  - `@ai-sdk/react`: v1.2.9 - React hooks for AI
  - `react-markdown`: v10.1.0 - Markdown rendering
  - `rehype-highlight`: v7.0.2 - Syntax highlighting
  - `remark-gfm`: v4.0.1 - GitHub Flavored Markdown support
  - `zod`: v3.24.3 - Schema validation
  - `react-loading-indicators`: v1.0.0 - Loading state indicators

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/cdznd/ai-pii-finder.git
cd ai-pii-finder

# Install dependencies
npm install

# Start development server with TurboRepo
npm run dev
```

The application will be available at http://localhost:3000

### Building for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/                # Next.js app router
│   ├── api/            # API routes
│   │   └── chat/       # Chat API endpoint
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main chat interface
├── components/         # React components
│   ├── chat/           # Chat-related components
│   └── layout/         # Layout components  
├── lib/                # Shared libraries
│   ├── ai.ts           # AI model configuration
└── styles/             # Global styles
```

## Screenshots

<p align="center">
  <table>
    <tr>
      <td><img src="public/project_screenshots/ss1.png" alt="" width="800"></td>
    </tr>
  </table>
</p>
