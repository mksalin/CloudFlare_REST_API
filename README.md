# 🚀 Python-Cloudflare REST API Manager

A high-performance, serverless full-stack application utilizing **GitHub Pages** for the frontend and **Cloudflare Workers (Python)** for the backend REST API, powered by a **Cloudflare D1** SQL database.

## 🌟 Features
- **Serverless Architecture**: Hosted entirely on the edge; no servers to maintain.
- **Python Backend**: Built with the Cloudflare Workers Python runtime.
- **Persistent SQL Storage**: Real-time data persistence using Cloudflare D1.
- **Secure Admin Actions**: POST and DELETE operations are protected by a Secret Key authentication system.
- **Responsive UI**: A modern dashboard with loading states and error handling.
- **CRUD Operations**: Supports Create (POST), Read (GET), and Delete (DELETE) methods.
- **CORS Secured**: Configured specifically for secure cross-origin requests from GitHub Pages.

## 🏗️ Architecture
The system uses a modern serverless stack:
1. **Frontend**: Hosted on GitHub Pages, served from the `/frontend` directory.
2. **Backend**: Python-based API running on Cloudflare's Edge.
3. **Database**: Cloudflare D1 (Serverless SQLite).

## 🛠️ Setup & Deployment

### 1. Clone the repository

### 2. Backend Setup (Cloudflare)
Ensure you have the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed.
Navigate to the backend folder and use the Wrangler CLI:

### Create the D1 Database
```bash
wrangler d1 create my-db
```

### Initialize the Database Schema
```bash
wrangler d1 execute my-db --remote --file=./schema.sql
```

# Set your Admin Password (used for adding/deleting)
```bash
wrangler secret put ADMIN_PASSWORD
```

### Deploy the Worker
```bash
wrangler deploy
```

### 2. Frontend Configuration
Open frontend/script.js and pdate the API_URL to point to your deployed Cloudflare Worker URL:

```bash
const API_URL = "[https://your-worker-name.your-subdomain.workers.dev](https://your-worker-name.your-subdomain.workers.dev)";
```

In GitHub Settings > Pages, ensure the build source is set to your preferred method (e.g., GitHub Actions pointing to the /frontend folder in static.yml)

### 4. Usage
Open your GitHub Pages URL.

The page will fetch existing rows automatically.

To Add or Delete, enter the password you set in the ADMIN_PASSWORD secret into the "Admin Authentication" field on the page.

## 📂 Project Structure
```bash
root/
├── .github/
│   └── workflows/          # (Optional) Auto-deploy your worker
│   │   └── static.yml      # GitHub Actions Workflow / Automation
├── backend/                # All Cloudflare/Python logic
│   ├── src/
│   │   └── entry.py        # Python API code
│   ├── schema.sql          # D1 Database table structure
│   └── wrangler.toml       # Cloudflare configuration & DB bindings
├── frontend/               # All GitHub Pages files
│   ├── index.html          # Dashboard UI
│   ├── style.css           # Presentation CSS here for cleanliness
│   └── script.js           # Logic JS here for cleanliness
├── .gitignore              # Files for Git to ignore
└── README.md               # The project documentation
``` 
 - **static.yml**: Specify /frontend folder for GitHub Actions Workflow / Automation
 - **index.html**:	The structural "skeleton" of the app. It defines where the input fields, buttons, and the message list appear on the screen.
 - **style.css**:	The "designer" of the app. It handles the layout, colors, and fonts, ensuring the app is responsive (looks good on mobile) and that buttons have clear visual states.
 - **script.js**: The "brain" of the frontend. It uses the fetch() API to talk to your Cloudflare Worker, manages the Admin Key security headers, and updates the page content dynamically without a refresh.

 - **src/entry.py**: The Python logic for the REST API.

 - **wrangler.toml**: Configuration and Database bindings for Cloudflare.

 - **schema.sql**: The SQL definition for the messages table.

 - **index.html**: The UI/UX for the dashboard.

## 🔒 Security
 - CORS Policy: The API only accepts requests from mksalin.github.io.

 - Method Restriction: Explicitly handles OPTIONS preflight requests to ensure secure handshakes.
 - Secret Masking: The ADMIN_PASSWORD is stored encrypted on Cloudflare and is never committed to GitHub.
