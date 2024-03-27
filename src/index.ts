// src/index.ts
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import 'reflect-metadata';
import { createConnections, Connection } from 'typeorm';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', authRoutes);

const createConnectionsAsync = async (): Promise<void> => {
    try {
        const connections: Connection[] = await createConnections();
        console.log(`Connected to databases`);
    } catch (error) {
        console.error('TypeORM connection error: ', error);
    }
};

createConnectionsAsync().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
});
