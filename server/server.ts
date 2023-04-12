import express from 'express';
import cors from 'cors';
import { initTRPC } from '@trpc/server';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { z } from 'zod';

export type AppRouter = typeof appRouter;

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

const server = express();
server.use(cors());

const trpc = initTRPC.create();

const isAuthed = trpc.middleware(({ next }) => {
    return next();
});

const publicProcedure = trpc.procedure;
const protectedProcedure = trpc.procedure.use(isAuthed);

const userRouter = trpc.router({
    getUserById: protectedProcedure.input(z.string()).query(({ input }) => userList.find((u) => u.id === input)),
    getAllUsers: protectedProcedure.query(() => userList),
    createUser: publicProcedure
        .input(z.object({ firstName: z.string(), lastName: z.string() }))
        .mutation(({ input }) => {
            const user: User = {
                id: String(Math.random()),
                firstName: input.firstName,
                lastName: input.lastName,
            };
            userList.push(user);
        }),
});

const appRouter = trpc.router({ userRouter });

server.use(
    '/trpc',
    createExpressMiddleware({
        router: appRouter,
        createContext() {
            return {};
        },
    })
);

server.listen(3000, () => console.log('SERVER STARTED!!!'));