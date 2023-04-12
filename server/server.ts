import express from 'express';
import cors from 'cors';

const server = express();
server.use(cors());

export interface User {
    id: string;
    firstName: string;
    lastName: string;
}

const userList: User[] = [
    {
        id: '1',
        firstName: 'Jason',
        lastName: 'Paff',
    },
];

server.listen(3000, () => console.log('SERVER STARTED!!!'));