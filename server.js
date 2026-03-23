const { Server } = require("@modelcontextprotocol/sdk/server/index.js");
const { StdioServerTransport } = require("@modelcontextprotocol/sdk/server/stdio.js")

const API_Base = "http://host.docker.internal:3000";

const server = new Server(
    { name: "todo-mcp", version: "1.0.0" },
    { capabilities: { tools: {} } }
);

//ツール一覧
server.setRequestHandler("tools/list", async () => ({
    tools: [
        {
            name: "add_todo",
            desctiption: "Add a todo",
            inputSchema: {
                type: "object",
                properties: {
                    title: { type: "string" }
                },
                required: ["title"]
            }
        },
        {
            name: "list_todos",
            desctiption: "List todos",
            inputSchema: { type: "object", properties: {} }
        },
        {
            name: "delete_todo",
            desctiption: "Delete a todo",
            inputSchema: {
                type: "object",
                properties: {
                    id: { type: "number" }
                },
                required: ["id"]
            }
        }
    ]
}));

//実行
server.setRequestHandler("tools/call", async (req) => {
    const { name, arguments: args } = req.params;

    if (name === "add_todo") {
        const res = await fetch(`${API_BASE}/todos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: args.title })
        });
        return { content: [{ type: "text", text: JSON.stringify(await res.json()) }] };
    }

    if (name === "list_todos") {
        const res = await fetch(`${API_BASE}/todos`);
        return { content: [{ type: "text", text: JSON.stringify(await res.json()) }] };
    }

    if (name === "delete_todo") {
        if (args.id === 0) {
            return { content: [{ type: "text", text: JSON.stringify(await res.json()) }] };
        }

        const res = await fetch(`${API_BASE}/todos/${args.id}`, {
            method: "DELETE"
        });
        return { content: [{ type: "text", text: JSON.stringify(await res.json()) }] };
    }

    throw new Error("Unknown tool");
});

const transport = new StdioServerTransport();
await server.connect(transport);