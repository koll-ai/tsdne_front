import { io } from "socket.io-client";
import * as urls from './URLs.js';

class SCPSocket {
    // create the socket
    static Socket = null;

    static getSocketInstance() {
        if (SCPSocket.Socket === null) {
            SCPSocket.Socket = io(urls.URL_API)
        }

        return this.Socket;
    }
}


export default SCPSocket