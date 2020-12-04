import axios from 'axios';
import {Request, Response} from 'express';
import Repositories from '../entity/repositories.entity';
import {findBucket, saveBucket} from '../services/bucket.services'

export async function findRespositories(req: Request, res: Response) {
    const {pageNumber, language} = req.query
    if(!pageNumber) return res.status(400).json({message: "Precisa incluir a query pageNumber"}).send()
    if(!language) return res.status(400).json({message: "Precisa incluir a query language"}).send()

    const bucket = await findBucket(Number(pageNumber), String(language))
    if(bucket.length > 0) return res.status(200).json(bucket[0].repositories).send()

    const repositories = await axios.get(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&page=${pageNumber}&per_page=20`)

    if(repositories.data.count === 0) return res.status(200).json({message: "Nenhum dado foi econtrado"}).send()

    const repositoriesisAlreadyExists = repositories.data.items

    let repositoriesList: Repositories[] = []
    
    repositoriesisAlreadyExists.forEach(item => {
        const {
            name, 
            description,
            forks,
            stargazers_count,
            created_at,
        } = item
        const {avatar_url, login} = item.owner

        repositoriesList.push({
            avatarUrl: avatar_url,
            description:description,
            forks,
            name,
            login,
            targazersCount: stargazers_count,
            createdAt: created_at
        })
    })

    saveRepositories(repositoriesList ,Number(pageNumber) ,req ,res, String(language))
}


async function saveRepositories(repositoriesList: Repositories[], pageNumber: number, req: Request, res: Response, languageName: string) {
    await saveBucket({
        languageName: languageName,
        pageNumber: pageNumber,
        count: repositoriesList.length,
        repositories: repositoriesList
    })

    return res.status(200).json(repositoriesList).send()
}