import express from 'express'
import dotenv from 'dotenv'
import { testDbConnection } from './config/database'
import authRoutes from './routes/collaborativeRoutes'
import projectRoutes from './routes/collaborativeRoutes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000;

const startServer = async () =>{
    await testDbConnection();
    app.use(express.json());
    app.use('api/auth', authRoutes)
    app.use('api', projectRoutes)
app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
});
};

startServer();