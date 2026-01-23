const API_URL = "https://my-python-cloudflare-api.markku-lab.workers.dev";

// Select elements
const msgInput = document.getElementById('msgInput');
const adminKeyInput = document.getElementById('adminKey');
const addBtn = document.getElementById('addBtn');
const listEl = document.getElementById('messageList');
const loadingEl = document.getElementById('loading');

// Helper for headers
function getHeaders() {
    return {
        'Content-Type': 'application/json',
        'X-Admin-Key': adminKeyInput.value
    };
}

// 1. Load Rows
async function loadRows() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        loadingEl.style.display = 'none';
        
        if (data.length === 0) {
            listEl.innerHTML = "<p>Database is empty.</p>";
            return;
        }

        listEl.innerHTML = data.map(row => `
            <div class="message-item">
                <div>
                    <span class="msg-text">${row.content}</span>
                    <span class="msg-date">${new Date(row.created_at).toLocaleString()}</span>
                </div>
                <button class="btn-del" onclick="deleteRow(${row.id})">Delete</button>
            </div>
        `).join('');
    } catch (err) {
        loadingEl.textContent = "Error: API Connection Failed.";
    }
}

// 2. Add Row
async function addRow() {
    if (!msgInput.value) return;
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ message: msgInput.value })
        });
        if (res.status === 401) alert("Unauthorized!");
        else { msgInput.value = ''; loadRows(); }
    } catch (err) { alert("Error adding data."); }
}

// 3. Delete Row
window.deleteRow = async function(id) {
    if (!confirm("Delete this?")) return;
    try {
        const res = await fetch(API_URL, {
            method: 'DELETE',
            headers: getHeaders(),
            body: JSON.stringify({ id: id })
        });
        if (res.status === 401) alert("Unauthorized!");
        else loadRows();
    } catch (err) { alert("Error deleting data."); }
};

// Listeners & Initial Load
addBtn.addEventListener('click', addRow);
loadRows();
