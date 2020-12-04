import {Entity, ObjectIdColumn, ObjectID, Column} from "typeorm";

@Entity()
export default class Repositories {

    @ObjectIdColumn()
    id?: ObjectID

    @Column('string')
    name: string;

    @Column('string')
    login: string;

    @Column('string')
    avatarUrl: string;

    @Column('string')
    description: string;

    @Column('string')
    createdAt: string;

    @Column('integer')
    targazersCount: number;

    @Column('integer')
    forks: number;


    
}
