# MotoVerse Bike Showroom

A modern Bike Showroom frontend built with React + Vite and served through a Node.js/Express server.

## Run locally

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal.

## Production build

```bash
npm run build
npm run server
```

Open:

```text
http://localhost:3000
```

Health API:

```text
http://localhost:3000/api/health
```

## Docker

```bash
docker build -t bike-showroom:latest .
docker run -d --name bike-showroom -p 3000:3000 bike-showroom:latest
```

Open:

```text
http://SERVER-IP:3000
```

## Project structure

- `index.html` - HTML entry point
- `src/main.jsx` - React application
- `src/style.css` - complete showroom styling
- `server.js` - Node.js/Express production server
- `Dockerfile` - Docker deployment
- `package.json` - dependencies and scripts
