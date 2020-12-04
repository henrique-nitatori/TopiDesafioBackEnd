import {getRepository} from "typeorm";
import Bucket from '../entity/bucket.entity'


export async function findBucket (pageNumber: number, languageName: string){
     const buckerRepository = getRepository(Bucket);
     return await buckerRepository.find({pageNumber: pageNumber, languageName: languageName})
}

export async function saveBucket (bucket: Bucket) {
    const buckerRepository = getRepository(Bucket);
    return await buckerRepository.save(bucket)
}
