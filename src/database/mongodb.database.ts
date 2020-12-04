import { createConnections } from 'typeorm'


export default async function connection() {
    await createConnections()
}