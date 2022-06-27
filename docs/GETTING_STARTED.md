# Getting started

Install dependencies with `yarn` or `npm`:

```bash
yarn install
```

Then, you can run locally in development mode with live reload:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your favorite browser
to see your project.

## Code organization

```
.
├── README.md                    # README file
├── next.config.js               # Next JS configuration
├── public                       # Public folder
├── types                        # Shared TypeScript interfaces
├── components                   # Shared components
│   └── X
│       └── X.tsx
│       └── index.tsx
├── pages                        # Next JS pages
│   └── specimen
│       └── [id].tsx             # Next JS dynamic routes with query parameter
├── context                      # Shared context states
├── constants                    # Shared constants
├── hooks                        # Shared hooks
├── styles                       # PostCSS style folder with Tailwind
├── utils                        # Utility folder
│   └── x.ts                     # Shared functions
├── package.json                 # Packages of the project
├── tailwind.config.js           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript configuration
```

## Read on:

- [Home](../README.md)
- [Problem statement](./PROBLEM_STATEMENT.md)
- [Tech ecosystem](./TECH_ECOSYSTEM.md)
- [Code style](./CODE_STYLE.md)
- [Editor](./EDITOR.md)
- [Deployment](./DEPLOYMENT.md)
