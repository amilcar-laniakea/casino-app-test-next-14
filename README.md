This is a [Next.js](https://nextjs.org/) project bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run start:dev
# or
yarn start:dev
# or
pnpm start:dev
# or
bun stat:dev

- Can verify the file 'package.json' in the scrips section to look at all methods available in  the project such as test, check format, types, etc
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the
file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to
automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your
feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the
[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more
details.

## About this project:

This project involves the latest technologies of next 14, next auth in its version 4 to simulate a
login on the github platform, it is also enhanced with validation standards such as prettier, eslint
for integrity and code structure, type checking, verification of Google rules in Typescript to
ensure adequate standards for code quality, as well as an early implementation of Jest for unit
testing

Through the Husky tool, it is guaranteed that all these tools are implemented in more efficient
ways, avoiding code uploads that do not meet the minimum requirements

## Specific steps to use the app in local environment:

In order to use the application locally, it is necessary to generate a client ID and secret in your
personal profile in the github menu.

Go to Menu => settings => developer settings and generate a secret of type "OAuth Apps" which will
provide you, as mentioned, with a client ID that will be placed in the 'GITHUB_ID' variable and a
secret that will be placed in the 'GITHUB_SECRET' variable that will be placed in the
'GITHUB_SECRET' variable. You should include them in your env file in the project, in the same way
you must generate a random secret as in pages https://generate.plus/en/base64 which you will place
in the 'NEXTAUTH_SECRET' variable.
