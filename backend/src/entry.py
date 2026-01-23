from workers import WorkerEntrypoint, Response
import json

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        cors_headers = {
            "Access-Control-Allow-Origin": "https://mksalin.github.io",
            "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, X-Admin-Key", # Added custom header
        }

        if request.method == "OPTIONS":
            return Response(None, status=204, headers=cors_headers)

        # Retrieve the secret we set via wrangler
        ADMIN_PASS = self.env.ADMIN_PASSWORD
        # Get the key sent by the browser
        client_key = request.headers.get("X-Admin-Key")

        # GET: Publicly accessible
        if request.method == "GET":
            query = await self.env.DB.prepare("SELECT * FROM messages ORDER BY created_at DESC").all()
            return Response.json(query.results, headers=cors_headers)

        # PROTECTED METHODS: Require Authentication
        if request.method in ["POST", "DELETE"]:
            if client_key != ADMIN_PASS:
                return Response.json({"error": "Unauthorized"}, status=401, headers=cors_headers)

            if request.method == "POST":
                data = await request.json()
                msg = data.get("message", "")
                await self.env.DB.prepare("INSERT INTO messages (content) VALUES (?)").bind(msg).run()
                return Response.json({"status": "created"}, headers=cors_headers)

            if request.method == "DELETE":
                data = await request.json()
                row_id = data.get("id")
                await self.env.DB.prepare("DELETE FROM messages WHERE id = ?").bind(row_id).run()
                return Response.json({"status": "deleted"}, headers=cors_headers)

        return Response.json({"error": "Not found"}, status=404, headers=cors_headers)
