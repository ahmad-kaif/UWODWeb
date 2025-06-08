# About the Website

## Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Node.js (JavaScript) & Flask (Python)

---

## Getting Started

### Step 1: Start the Frontend

```bash
npm run dev
```

### Step 2: Start the Backend

Navigate to the `backend` directory and run:

```bash
npm start
```

---

## How It Works

1. The user uploads a sonar image using the React frontend.
2. The frontend sends the image to the Node.js backend.
3. The Node.js backend spawns a Python process to run the detection script (no need to run the Python script manually).
4. The Python script loads the model, processes the image, and detects objects.
5. The Python script returns the result to the Node.js backend, which then sends the response to the frontend to display the detected objects.

