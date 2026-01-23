# 🚀 Python-Cloudflare REST API Manager

A high-performance, serverless full-stack application utilizing **GitHub Pages** for the frontend and **Cloudflare Workers (Python)** for the backend REST API, powered by a **Cloudflare D1** SQL database.

## 🌟 Features
- **Serverless Architecture**: Zero infrastructure to manage.
- **Python Backend**: Leverages Cloudflare's new Python runtime (Pyodide).
- **Persistent Storage**: SQL database integration using Cloudflare D1.
- **CRUD Operations**: Supports Create (POST), Read (GET), and Delete (DELETE) methods.
- **CORS Secured**: Configured specifically for secure cross-origin requests from GitHub Pages.

## 🏗️ Architecture
The application is split into two distinct layers:
1. **Frontend**: A static HTML/JS dashboard hosted on GitHub Pages.
2. **Backend**: A Python-based REST API running on Cloudflare’s global edge network.



## 🛠️ Setup Instructions

### 1. Backend Setup (Cloudflare)
Ensure you have the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed.

### Clone the repository

### Initialize the D1 Database
```bash
wrangler d1 create my-db
```

### Initialize the Database Schema
```bash
wrangler d1 execute my-db --remote --file=./schema.sql
```

### Deploy the Worker
```bash
wrangler deploy
```

### 2. Frontend Configuration
Update the API_URL constant in index.html to point to your deployed Cloudflare Worker URL:

```bash
const API_URL = "[https://your-worker-name.your-subdomain.workers.dev](https://your-worker-name.your-subdomain.workers.dev)";
```

### 3. Deployment
 - Push the code to your GitHub repository.

 - Enable GitHub Pages in the repository settings (Settings > Pages).

 - Set the source to the main branch.

## 📂 Project Structure
 - **src/entry.py**: The Python logic for the REST API.

 - **wrangler.toml**: Configuration and Database bindings for Cloudflare.

 - **schema.sql**: The SQL definition for the messages table.

 - **index.html**: The UI/UX for the dashboard.

## 🔒 Security
 - CORS Policy: The API only accepts requests from mksalin.github.io.

 - Method Restriction: Explicitly handles OPTIONS preflight requests to ensure secure handshakes.
