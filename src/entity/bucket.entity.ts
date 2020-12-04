import {Entity, ObjectIdColumn, ObjectID, Column} from "typeorm";
import Repositories from './repositories.entity'

@Entity({name: 'Bucket'})
export default class Bucket {

    @ObjectIdColumn()
    id?: ObjectID

    @Column('integer')
    pageNumber: number;

    @Column('string')
    languageName: string;

    @Column(type => Repositories)
    repositories: Repositories[];

    @Column('integer')
    count: number;

}
