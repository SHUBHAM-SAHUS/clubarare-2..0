# ClubRare Marketplace V2

ClubRare Marketplace Frontend V2:

- Next.js
- TailwindCSS
- Wagmi
- Ethers
- Storybook

## Deployments

- Production: https://app.clubrare.xyz
- Staging (mainnet): https://staging-app.clubrare.xyz
- QA (testnet): https://qa-app.clubrare.xyz

## Architecture

```
|-- src
|  |-- abis
|  |  |-- // smart contract abis
|  |-- api-services
|  |  |-- interfaces
|  |-- // backend api call services
|  |-- assets
|  |  |-- css
|  |  |-- fonts
|  |  |-- images
|  |-- context
|  |  |-- connector.tsx
|  |  |-- global.tsx
|  |  |-- overlay.tsx
|  |  |-- index.ts
|  |-- design-systems
|  |  |-- Atoms // the minor pure components
|  |  |-- Molecules // the reusable medium sized components
|  |  |-- Organisms // the reusable large sized components
|  |  |-- Templates // the reusable page templates
|  |  |-- index.ts
|  |-- pages
|  |-- services
|  |  |-- interfaces
|  |  |-- // smart contract call services
|  |-- utils
|  |-- appConfig.ts
|  |-- interfaces.d.ts
|-- next.config.js
|-- tsconfig.json
|-- tailwind.config.js
|-- yarn.lock
```

## Environment Variables

```
# Infura
NEXT_PUBLIC_INFURA_ID=

# Environment
NEXT_PUBLIC_IS_PRODUCTION=
NEXT_PUBLIC_CLAID_API_KEY=
NEXT_PUBLIC_SENTRY_DNS=
```

## Deployment flow (Pending)

1. Staging (develop -> staging)

```
git branch -D staging;
git branch -D staging-backup;
git fetch;
git checkout staging;
git checkout -b staging-backup;
git branch -D staging;
git checkout develop;
git checkout -b staging;
git push --force origin staging;
```

2. Production (staging -> production)

```
git branch -D production;
git branch -D production-backup;
git fetch;
git checkout production;
git checkout -b production-backup;
git branch -D production;
git checkout staging;
git checkout -b production;
git push --force origin production;
```

## Component Design

- Figma: https://www.figma.com/file/ZsGXtJMIxESeCR6XOgIj2s/
- Playground: https://clubrare-playground.vercel.app/
