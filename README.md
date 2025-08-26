<div align="center">
  <br />
    <a href="#" target="_blank">
      <img src="/public/logo.png" alt="Mock Mate Banner" width="400"/>
    </a>
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Next.JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=black" alt="next.js" />
    <img src="https://img.shields.io/badge/-Vapi-white?style=for-the-badge&color=5dfeca" alt="vapi" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-Firebase-black?style=for-the-badge&logoColor=white&logo=firebase&color=DD2C00" alt="firebase" />
    <img src="https://img.shields.io/badge/-Google_Gemini-black?style=for-the-badge&logo=google&color=4285F4" alt="gemini" />
  </div>

  <h3 align="center">Mock Mate: An AI-powered mock interview platform for practicing & improving your interview skills</h3>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 📂 [Project Structure](#project-structure)
6. 🕸️ [Snippets (Code to Copy)](#snippets)
7. 🧪 [Tests](#tests)
8. 📚 [Documentation](#documentation)

---

## <a name="introduction">🤖 Introduction</a>

**Mock Mate** is an **AI-driven mock interview platform** that simulates realistic interviews (voice or text) and generates structured feedback on performance. Whether you’re preparing for your next tech interview or brushing up on communication skills, Mock Mate provides an **immersive, feedback-oriented learning experience**.

---

## <a name="tech-stack">⚙️ Tech Stack</a>

* **Frontend/SSR**: Next.js (App Router) + Tailwind CSS + shadcn/ui
* **AI**: Google Gemini (via Vercel AI SDK), Vapi, Deepgram, ElevenLabs
* **Backend**: Firebase Admin SDK with Firestore
* **Validation**: Zod for schema validation and type safety

---

## <a name="features">🔋 Features</a>

👉 **AI-Powered Interviews** — Dynamic question flow with text & voice support<br />
👉 **Automated Feedback** — Scores, strengths, weaknesses, and final assessment<br />
👉 **Interview Management** — Track all past interviews with detailed feedback<br />
👉 **Auth Ready** — Secure sign-in/sign-up flow<br />
👉 **Modern UI/UX** — Responsive, accessible, and powered by shadcn/ui

---

## <a name="quick-start">🤸 Quick Start</a>

### Prerequisites

* [Node.js](https://nodejs.org/) >= 18
* [npm](https://www.npmjs.com/)
* [Firebase Project](https://firebase.google.com/)
* API keys for: Vapi, Deepgram, ElevenLabs, Google Gemini

### Clone & Install

```bash
git clone https://github.com/imtiaj-007/Mock-Mate.git
cd mock-mate
npm install
```

### Environment Variables

Create `.env.local` and add:

```env
FIREBASE_PROJECT_ID=your_firebase_credentials
FIREBASE_CLIENT_EMAIL=your_firebase_credentials
FIREBASE_PRIVATE_KEY=your_firebase_credentials

NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_credentials
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_credentials
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_credentials
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_credentials
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_credentials
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_credentials
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_credentials

GOOGLE_GENERATIVE_AI_API_KEY=your_api_keys
NEXT_PUBLIC_VAPI_WEB_TOKEN=your_api_keys
```

### Run Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## <a name="project-structure">📂 Project Structure</a>

```bash
mock-mate/
├─ app/                          # Next.js App Router: routes, layouts, API handlers, global styles
│  ├─ (auth)/                    # Auth group (isolated layout for auth pages)
│  │  ├─ layout.tsx              # Layout for auth pages
│  │  ├─ sign-in/                # Sign-in route
│  │  └─ sign-up/                # Sign-up route
│  ├─ (root)/                    # Main app group (primary layout + pages)
│  │  ├─ layout.tsx              # Root layout: header, theme, providers
│  │  ├─ page.tsx                # Landing/home page
│  │  └─ interview/              # Interview listing and detail routes
│  │     ├─ page.tsx             # Interviews list
│  │     └─ [id]/                # Dynamic interview route
│  │        ├─ page.tsx          # Interview detail/session page
│  │        └─ feedback/         # Feedback sub-route for an interview
│  │           └─ page.tsx       # Feedback display page
│  ├─ api/                       # Route handlers (server-only)
│  │  └─ interview/
│  │     └─ generate/
│  │        └─ route.ts          # API endpoint to generate interview data/content
│  ├─ favicon.ico                # Site favicon
│  ├─ globals.css                # Global Tailwind/CSS styles
│  └─ layout.tsx                 # App-wide layout (html/body)
├─ components/                   # Reusable UI and feature components
│  ├─ form/                      # Form-specific components
│  │  ├─ AuthForm.tsx            # Auth form logic/UI
│  │  ├─ FormField.tsx           # Generic form field wrapper
│  │  └─ GenerateInterviewForm.tsx # Create/generate interview form
│  ├─ ui/                        # shadcn/ui wrappers and primitives
│  │  ├─ button.tsx              # Button component
│  │  ├─ form.tsx                # Form provider/helpers
│  │  ├─ input.tsx               # Input component
│  │  ├─ label.tsx               # Label component
│  │  └─ sonner.tsx              # Toast/notifications setup
│  ├─ Agent.tsx                  # AI interviewer UI/logic
│  ├─ InterviewCard.tsx          # Interview summary card
│  └─ TechIcons.tsx              # Technology icons
├─ constants/                    # Static configs, prompts, schemas, constants
│  ├─ agent.ts                   # AI assistant config and feedback schema
│  ├─ interview.ts               # Interview-related constants
│  └─ index.ts                   # Barrel exports
├─ firebase/                     # Firebase setup (client/admin)
│  ├─ admin.ts                   # Admin SDK (server-side Firestore)
│  └─ client.ts                  # Client SDK (browser-safe)
├─ lib/                          # Library code: actions, utils, SDK clients
│  ├─ actions/                   # Server actions (business logic)
│  │  ├─ auth.action.ts          # Auth-related actions
│  │  └─ general.action.ts       # Feedback, interview fetch, etc.
│  ├─ utils.ts                   # General utilities/helpers
│  └─ vapi.sdk.ts                # VAPI client/config
├─ public/                       # Static assets served at / (images, svgs)
│  ├─ covers/                    # Company cover images
│  └─ ...                        # Logos, icons, avatars
├─ types/                        # Shared TypeScript types/ambient declarations
│  ├─ index.d.ts                 # App types (Interview, Feedback, etc.)
│  └─ vapi.d.ts                  # VAPI-related types
├─ components.json               # shadcn/ui config
├─ eslint.config.mjs             # ESLint configuration
├─ next-env.d.ts                 # Next.js TypeScript env types
├─ next.config.ts                # Next.js config
├─ package.json                  # Dependencies and scripts
├─ package-lock.json             # Lockfile
├─ postcss.config.mjs            # PostCSS/Tailwind config
├─ README.md                     # Documentation
├─ tsconfig.json                 # TypeScript configuration
└─ LICENSE                       # License
```

---

## <a name="snippets">🕸️ Snippets</a>

<details>
<summary><code>Generate Questions Prompt</code></summary>

```ts
`Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
`;
```

</details>

<details>
<summary><code>Generate Feedback Prompt</code></summary>

```ts
prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
        `,
system:
        "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
```

</details>

<details>
<summary><code>Dummy Interviews</code></summary>

```tsx
export const dummyInterviews: Interview[] = [
  {
    id: "1",
    userId: "user1",
    role: "Frontend Developer",
    type: "Technical",
    techstack: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    level: "Junior",
    questions: ["What is React?"],
    finalized: false,
    createdAt: "2025-06-15T10:00:00Z",
  },
  {
    id: "2",
    userId: "user1",
    role: "Full Stack Developer",
    type: "Mixed",
    techstack: ["Node.js", "Express", "MongoDB", "React"],
    level: "Senior",
    questions: ["What is Node.js?"],
    finalized: false,
    createdAt: "2025-06-14T15:30:00Z",
  },
];
```

</details>

---

## <a name="tests">🧪 Tests</a>

Testing is not yet implemented in this project, but the foundation is set up using [Jest](https://jestjs.io/) for unit testing and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for component testing.

### Recommended Test Structure

Consider implementing tests for:
- Unit tests for utility functions and core logic
- Component tests for React UI components
- Integration tests for API interactions
- Snapshot tests for critical components

The project includes the necessary configuration to get started with testing. Contributions to add comprehensive test coverage are welcome!

### Running Tests

- Run all tests:
```bash
npm test
```

- Watch mode:
```bash
npm run test:watch
```

- Coverage:
```bash
npm run test:coverage
```

- CI (no watch, with coverage and fail-fast):
```bash
npm run test:ci
```

### Scripts (add to package.json)

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --coverage --runInBand"
  }
}
```

### Jest setup (TypeScript + Next.js + RTL)

Add `jest.config.ts`:
```ts
import nextJest from 'next/jest';

const createJestConfig = nextJest({ dir: './' });

const config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },
  collectCoverageFrom: ['{app,components,lib}/**/*.{ts,tsx}', '!**/*.d.ts'],
};

export default createJestConfig(config);
```

Add `jest.setup.ts`:
```ts
import '@testing-library/jest-dom';
```

Install dev deps:
```bash
npm i -D jest @types/jest ts-jest @testing-library/react @testing-library/jest-dom whatwg-url
```

### Example tests

- Utils unit test (`lib/utils.test.ts`):
```ts
import { cn } from '@/lib/utils';

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('a', false && 'b', 'c')).toBe('a c');
  });
});
```

- Component test (`components/InterviewCard.test.tsx`):
```tsx
import { render, screen } from '@testing-library/react';
import InterviewCard from '@/components/InterviewCard';

it('renders title and company', () => {
  render(<InterviewCard title="Frontend Dev" company="Acme" date="2025-01-01" />);
  expect(screen.getByText('Frontend Dev')).toBeInTheDocument();
  expect(screen.getByText('Acme')).toBeInTheDocument();
});
```

- Server action test (mocking external services) (`lib/actions/general.action.test.ts`):
```ts
jest.mock('@/firebase/admin', () => ({ db: { collection: () => ({ doc: () => ({ set: jest.fn() }) }) } }));
jest.mock('ai', () => ({ generateObject: jest.fn().mockResolvedValue({ object: {
  totalScore: 75, categoryScores: [], strengths: [], areasForImprovement: [], finalAssessment: 'OK'
}})}));

import { createFeedback } from '@/lib/actions/general.action';

it('creates feedback successfully', async () => {
  const res = await createFeedback({ interviewId: 'id', userId: 'user', transcript: [] });
  expect(res.success).toBe(true);
});
```
---

## <a name="documentation">📚 Documentation</a>

**Mock Mate** will ship with an `MDX-powered` documentation site built on Next.js. This section outlines the plan, structure, and authoring guidelines so we can start adding docs incrementally.

### Goals

- Author docs in .mdx with React components.
- Keep docs versionable, testable, and searchable.
- Co-locate examples with code where helpful.
- Ship docs at /docs with a sidebar and search.

### Planned Structure

```bash
docs/                       # MDX content (source of truth)
  getting-started.mdx
  guides/
    interviews.mdx
    feedback.mdx
  reference/
    api.mdx
    components.mdx
  tutorials/
    first-interview.mdx
  changelog.mdx

app/(docs)/                 # Next.js routes for docs
  docs/
    layout.tsx              # Sidebar + content layout
    page.tsx                # /docs landing
    [slug]/page.tsx         # Dynamic MDX renderer (slugged routes)
components/docs/            # Reusable docs-only components (Callout, Code, Tabs)
```

---

## 📄 License

This project is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0).

- You may share and adapt the material with proper attribution.
- NonCommercial: You may not use the material for commercial purposes.
- ShareAlike: If you remix, transform, or build upon the material, you must distribute your contributions under the same license.
- No additional restrictions can be applied.

Copyright (c) 2025 SK Imtiaj Uddin

Full license text is available in the `LICENSE` file or at:
- Legal code: https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode
- Summary: https://creativecommons.org/licenses/by-nc-sa/4.0/
