import {MessageType} from "../types/message.type";
import {io, Socket} from "socket.io-client";
import {getBearerAccessToken, getBearerRefreshToken} from "../common/local-storage";


interface ServerToClientEvents {
    // message: (message: MessageType) => void;
    listSender: (listSender: any) => void;

    error: (error: any) => void;
    accessToken: (accessToken: string) => void;
    retrieveAccessTokenByRefreshToken: (accessToken: string) => void;
    connect_server: (info: any) => void;
    client_disconnected: (reason: string) => void;
}

interface ClientToServerEvents {
    // chat: (message: MessageType) => void,
    listSender: () => void;
    accessToken: (refreshToken: string) => void;
    error: (error: any) => void;
    // refreshToken: (bearerRefreshToken: string, response: string) => void;
    client_disconnected: (reason: string) => void;
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    'http://localhost:8080', {
        transports: ['websocket'],
        autoConnect: true,
        auth: {
            token: getBearerAccessToken(),
        },
    }
);

export const socketEmitEventRefreshToken = () => socket.emit('refreshToken' as any, `${getBearerRefreshToken()}`);

export const socketEmitEventChat = (message: MessageType) => socket.emit('chat' as any, message);


export const socketEmitEventListSender = () => socket.emit('listSender');







