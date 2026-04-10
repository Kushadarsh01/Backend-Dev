const http = require('http');

let todos = [];
let nextId = 1;

const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    if (pathname === '/api/todos' && method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify(todos));
    }

    else if (pathname.match(/\/api\/todos\/\d+/) && method === 'GET') {
        const id = parseInt(pathname.split('/')[3]);
        const todo = todos.find(t => t.id === id);
        
        if (todo) {
            res.writeHead(200);
            res.end(JSON.stringify(todo));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Task not found' }));
        }
    }

    else if (pathname === '/api/todos' && method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const newTodo = JSON.parse(body);
                newTodo.id = nextId++;
                newTodo.completed = newTodo.completed || false;
                
                todos.push(newTodo);
                
                res.writeHead(201);
                res.end(JSON.stringify(newTodo));
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Invalid JSON format sent to server' }));
            }
        });
    }

    else if (pathname.match(/\/api\/todos\/\d+/) && method === 'PUT') {
        const id = parseInt(pathname.split('/')[3]);
        const index = todos.findIndex(t => t.id === id);
        
        if (index !== -1) {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            
            req.on('end', () => {
                try {
                    const updates = JSON.parse(body);
                    todos[index] = { ...todos[index], ...updates, id: id };
                    
                    res.writeHead(200);
                    res.end(JSON.stringify(todos[index]));
                } catch (error) {
                    res.writeHead(400);
                    res.end(JSON.stringify({ error: 'Invalid JSON format sent to server' }));
                }
            });
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Task not found' }));
        }
    }

    else if (pathname.match(/\/api\/todos\/\d+/) && method === 'DELETE') {
        const id = parseInt(pathname.split('/')[3]);
        const index = todos.findIndex(t => t.id === id);
        
        if (index !== -1) {
            todos.splice(index, 1);
            res.writeHead(200);
            res.end(JSON.stringify({ message: 'Task deleted successfully' }));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Task not found' }));
        }
    }

    else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Route not found' }));
    }
});

module.exports = function startTodoServer() {
    const PORT = 3000;
    server.listen(PORT, () => {
        console.log(`\nTODO API server running on http://localhost:${PORT}`);
        console.log('Available endpoints:');
        console.log('  GET    /api/todos');
        console.log('  GET    /api/todos/:id');
        console.log('  POST   /api/todos');
        console.log('  PUT    /api/todos/:id');
        console.log('  DELETE /api/todos/:id\n');
    });
};