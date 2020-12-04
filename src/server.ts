import dotenv from 'dotenv';
dotenv.config()

import cors from 'cors'
import express from 'express';
import MongoConnection from  './database/mongodb.database'
MongoConnection()

import GitHubApiRouter from './routes/repository.routes'

const server = express();

server.use(cors())
server.use(express.json())
server.use(GitHubApiRouter)

server.listen(process.env.SERVER_PORT || 4000, 
    () => {console.log(`Servidor iniciado em ${process.env.SERVER_PORT}`)})