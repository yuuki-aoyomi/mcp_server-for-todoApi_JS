import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const API_Base = "http://host.docker.internal:3000";

const server = new McpServer({
    name: "todo-mcp",
    version: "1.0.0",
    capabilities: {
        tools: {}
    }
});

//ツール一覧
server.registerTool(
    "add_todo",
    {
        desctiption: "Add a todo",
        inputSchema: {
            type: "object",
            properties: {
                title: { type: "string" }
            },
            required: ["title"]
        }
    },
    async ({ title }) => {
        const res = await fetch(`${API_BASE}/todos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: args.title })
        });
        return { content: [{ type: "text", text: JSON.stringify(await res.json()) }] };
    }
);

server.registerTool(
    "list_todos",
    {
        desctiption: "List todos",
        inputSchema: { type: "object", properties: {} }
    },
    async () => {
        const res = await fetch(`${API_BASE}/todos`);
        return { content: [{ type: "text", text: JSON.stringify(await res.json()) }] };
    }
);

server.registerTool(
    "delete_todo",
    {
        desctiption: "Delete a todo",
        inputSchema: {
            type: "object",
            properties: {
                id: { type: "number" }
            },
            required: ["id"]
        }
    },
    async ({ id }) => {
        if (args.id === 0) {
            return { content: [{ type: "text", text: JSON.stringify(await res.json()) }] };
        }

        const res = await fetch(`${API_BASE}/todos/${args.id}`, {
            method: "DELETE"
        });
        return { content: [{ type: "text", text: JSON.stringify(await res.json()) }] };
    }
);

const transport = new StdioServerTransport();
await server.connect(transport);