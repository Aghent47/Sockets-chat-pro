import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);

// CORS configuration
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.static('public'));

// Socket.IO setup
const io = new Server(server, {
  cors: corsOptions,
  transports: ['websocket', 'polling']
});

// Socket controller
io.on('connection', (socket) => {
  console.log('Client connected', socket.id);
  
  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id);
  });

  // Chat functionality
  socket.on('enviar-mensaje', (payload) => {
    console.log('Mensaje recibido:', payload);
    io.emit('mensaje-nuevo', payload);
  });

  socket.on('configurar-usuario', (payload) => {
    console.log('Usuario configurado:', payload);
    socket.broadcast.emit('mensaje-nuevo', {
      usuario: 'Sistema',
      mensaje: `${payload.nombre} se ha unido al chat`,
      fecha: new Date().getTime()
    });
  });
});

// Netlify function handler
export const handler = async (event, context) => {
  // For static files, serve from public directory
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: 'Socket.IO server running'
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Socket.IO server is running' })
  };
};
