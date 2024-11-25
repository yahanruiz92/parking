import { io } from 'socket.io-client';

// En desarrollo
const isDev = import.meta.env.DEV;
const serverUrl = isDev 
  ? 'http://localhost:3000'
  : 'https://parking-yahan.azurewebsites.net';

export const socket = io(serverUrl);
