# Sociopedia

A full-stack social media application engineered with the MERN stack (MongoDB, Express.js, React 18, Node.js), featuring JWT-based authentication, real-time feed updates, friend graph interactions, responsive theme switching, and secure image upload pipelines.

---

## Architectural Overview

Sociopedia is structured as a decoupled client-server architecture:

```
Sociopedia/
├── server/
│   ├── client/               # React 18 frontend with Material UI & Redux Toolkit
│   │   ├── src/
│   │   │   ├── components/   # Modular UI primitives (UserImage, FlexBetween, etc.)
│   │   │   ├── scenes/       # Pages: LoginPage, HomePage, ProfilePage, Navbar
│   │   │   ├── state/        # Redux Toolkit slice with persisted auth state
│   │   │   └── theme.js      # Custom MUI theme palettes (Dark & Light modes)
│   ├── controllers/          # Business logic: auth, users, posts
│   ├── middleware/           # JWT verification & authorization guards
│   ├── models/               # Mongoose schemas: User, Post
│   ├── routes/               # API route definitions
│   └── index.js              # Express app initialization, Helmet & Multer setup
```

---

## Core Capabilities

* **Authentication & Authorization:** Secure registration and login using salted passwords (`bcrypt`) and signed JSON Web Tokens (`jsonwebtoken`). Protected routes enforced via middleware.
* **Social Graph & Friend Management:** One-click friend addition/removal with automatic bi-directional state updates.
* **Interactive Feed & Reactions:** Rich post publishing with multimedia attachments, interactive like counters, and comment threads.
* **Media Handling:** Multipart file uploads processed via `multer` with static asset delivery.
* **State Management & Persistence:** Redux Toolkit managing global application state, with `redux-persist` caching authentication sessions across browser refreshes.
* **Responsive Dark/Light Theme:** Custom Material UI theme configuration providing smooth visual transitions between light and dark modes.

---

## Technical Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Material UI (MUI v5), Redux Toolkit, Redux Persist, Formik, Yup, React Router v6 |
| **Backend** | Node.js, Express.js, JSON Web Tokens (JWT), Bcrypt, Multer, Helmet, Morgan, CORS |
| **Database** | MongoDB, Mongoose ODM |
| **Deployment** | Vercel configuration (`vercel.json`), Node.js production runtime |

---

## Local Development Setup

### 1. Prerequisites
* Node.js (v18 or higher recommended)
* MongoDB instance (local or MongoDB Atlas connection URI)

### 2. Backend Configuration
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
PORT=3001
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/sociopedia?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
```

Start the backend service:
```bash
npm run dev
```
The server will boot on `http://localhost:3001`.

### 3. Frontend Configuration
In a separate terminal, navigate to the client directory and install dependencies:
```bash
cd server/client
npm install
```

Create a `.env` file in the `server/client` directory if custom backend URLs are required:
```env
REACT_APP_SERVER_URL=http://localhost:3001
```

Start the React development server:
```bash
npm start
```
The application will open in your browser at `http://localhost:3000`.

---

## API Endpoints Reference

### Authentication (`/auth`)
* `POST /auth/register` — Uploads profile image, hashes password, and creates a user profile.
* `POST /auth/login` — Verifies credentials and returns signed JWT token with user object.

### Users (`/users`)
* `GET /users/:id` — Fetches user profile metadata (Protected).
* `GET /users/:id/friends` — Fetches friend list for the designated user (Protected).
* `PATCH /users/:id/:friendId` — Toggles friend relationship (Protected).

### Posts (`/posts`)
* `POST /posts` — Creates a new post with optional picture attachment (Protected).
* `GET /posts` — Retrieves global community feed (Protected).
* `GET /posts/:userId/posts` — Retrieves posts authored by a specific user (Protected).
* `PATCH /posts/:id/like` — Toggles like state for the authenticated user (Protected).

---

## License

This project is licensed under the [ISC License](LICENSE).
