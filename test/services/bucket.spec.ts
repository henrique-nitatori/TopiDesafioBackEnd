import {createConnections, getConnection} from 'typeorm'
import {saveBucket, findBucket} from '../../src/services/bucket.services'

beforeAll(async () => {
    await createConnections()
  })
  
  afterAll(async () => {
    const defaultConnection = getConnection('default')
    await defaultConnection.close()
  })

  const number = new Date().getSeconds()

test('Salvando um bucket', async () => {
    await saveBucket({
        pageNumber: number,
        languageName: 'test',
        repositories: [{
            avatarUrl: 'test',
            description: 'test',
            forks: 112,
            createdAt: 'test',
            name: 'test',
            login: 'test',
            targazersCount:22
        }],
        count: 1
    });
})

test('buscando um bucket', async () => {
    const bucket = await findBucket(number, 'test')

    expect(bucket.length).toBe(1)
})