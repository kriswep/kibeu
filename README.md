This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Hasura

Start hasura: `docker compose up -d`
Start hasura console via cli

```bash
cd hasura
npx hasura console
```

## Deployment

docker compose -f docker/development/docker-compose.yml --env-file ./.env build
docker compose -f docker/development/docker-compose.yml --env-file ./.env up -d

docker compose -f docker/development/docker-compose.yml --env-file ./.env down

cd hasura
npx hasura metadata diff
npx hasura metadata apply
npx hasura migrate status
npx hasura migrate apply
npx hasura metadata apply

npx hasura console

### Squah migrations

npx hasura migrate squash --name "<descr>" --from Version

**mark as applied without reapplying changed migration (only if needed)**
npx hasura migrate apply --version "Version" --skip-execution
npx hasura migrate status
