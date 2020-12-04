import express, { Request, Response} from 'express';
import { findRespositories } from '../services/githubapi.services'
const repositoryRouter = express.Router()



repositoryRouter.get('/repository', (req: Request, res: Response) => {
    findRespositories(req, res)
})



export default repositoryRouter