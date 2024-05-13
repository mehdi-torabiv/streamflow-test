# Stream Flow

Stream Flow is a decentralized streaming platform built on the Solana blockchain. This platform allows users to create, manage, and interact with token streams in a seamless and efficient manner using streamflow-js-sdk.

## Features

- Create token streams
- Manage existing streams
- Cancel streams and withdraw tokens
- Interact with the Solana blockchain using streamflow-js-sdk
- Use React, TypeScript, and MUI for a modern UI & TailwindCSS
- Integrated with various Solana wallets

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed:

- Node.js (version 16 or higher)
- npm (version 7 or higher)

### Installation

1. Clone the repository

```bash
git clone https://github.com/mehdi-torabiv/streamflow-test
cd streamflow-test
```

2. Install the dependencies

Using npm:

```bash
npm install
```

### Running the Application

To start the development server:

```bash
npm run dev
```

The application will be running at [http://localhost:3000](http://localhost:3000).

### Building the Application

To create an optimized production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

### Linting and Formatting

To lint the code:

```bash
npm run lint
```

To fix linting issues:

```bash
npm run lint:fix
```

To format the code using Prettier:

```bash
npm run prettier
```

### Husky and Lint-Staged

This project uses Husky and Lint-Staged to run linting and formatting checks before commits. To set up Husky, run:

```bash
npm run prepare
```

## Project Structure

- `src/`: Source code for the application
- `app/`: Next.js pages
- `components/`: React components
- `configs/`: Configuration files
- `context/`: Context providers
- `helpers/`: Helper functions
- `hooks/`: Custom hooks
- `interfaces/`: TypeScript interfaces
- `providers/`: Context providers
- `services/`: Services for interacting with APIs
- `types/`: TypeScript type definitions
- `utils/`: Utility functions

## Dependencies

- **@mui/material**: Material-UI components
- **@tailwindcss** TailwindCSS utility-first CSS framework
- **@solana/web3.js**: Solana web3 library
- **@solana/wallet-adapter-react**: Solana wallet adapter for React
- **@streamflow/stream**: Streamflow SDK
- **react**: React library
- **next**: Next.js framework
- **typescript**: TypeScript language

## Dev Dependencies

- **eslint**: Linting utility
- **prettier**: Code formatting tool
- **husky**: Git hooks
- **tailwindcss**: Utility-first CSS framework

## Contributing

Feel free to contribute to this project by opening a pull request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.

---

Made with ❤️ by [Mehdi Torabi](https://github.com/mehdi-torabiv)
