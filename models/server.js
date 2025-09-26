import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { socketController } from '../sockets/controller.js';

export class SocketServer {
    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new Server(this.server);

        this.paths = {};

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();

        // Sockets 
        this.sockets();

    };

    middlewares() {

        // CORS
        this.app.use(cors({
            origin: process.env.NODE_ENV === 'production' ? 
                process.env.VERCEL_URL || true : 
                ['http://localhost:3000', 'http://localhost:5000'],
            credentials: true
        }));

        // Public directory
        this.app.use(express.static('public'));

    }

    routes() {
        // Health check endpoint
        this.app.get('/health', (req, res) => {
            res.json({ 
                status: 'OK', 
                timestamp: new Date().toISOString(),
                uptime: process.uptime()
            });
        });

        // Serve index.html for root route
        this.app.get('/', (req, res) => {
            res.sendFile('index.html', { root: 'public' });
        });
        
        // this.app.use( this.paths.auth, auth),
    }

    sockets() {
        this.io.on('connection', (socket) => socketController(socket, this.io));
    }

    listen() {
        this.server.listen(process.env.PORT || 5000, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    }

}