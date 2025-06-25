# Oeducators Frontend

This is the frontend codebase for the oeducators platform, specifically for the `oeducators.com` project. It is built using modern web technologies and frameworks to deliver a seamless user experience.

⚠️ **Note**: This is a private repo, you need to be a member of the oeducators organization to access it.

## Project Structure

The project follows a modular structure with the following key directories:

- `app/`: Contains the main application code.
- `components/`: Reusable UI components.
- `public/`: Static assets like images and fonts.

## Prerequisites

Ensure you have the following installed:

- Node.js (>= 20.x)
- npm or yarn

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd oeducators.com/Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Set up environment variables:
   - Create a `.env.local` file in the root directory.
   - Add the required environment variables (refer to `sample.env` for guidance).

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open the application in your browser at `http://localhost:3000`.

## Scripts

- `dev`: Starts the development server (`next dev`).
- `build`: Builds the application for production (`next build`).
- `start`: Starts the production server (`next start`).
- `lint`: Runs linting checks (`next lint`).
- `export`: Builds and exports the application as static files (`next build && next export`).
- `deploy`: Deploys the frontend using the `deploy-frontend.sh` script.

## Deployment

The application is deployed using Next.js's built-in deployment capabilities. Ensure the production build is created using:

```bash
npm run build
# or
yarn build
```

Then, start the production server:

```bash
npm start
# or
yarn start
```