import { SocketServer } from "./models/server.js"
import 'dotenv/config';

const server = new SocketServer();

server.listen();