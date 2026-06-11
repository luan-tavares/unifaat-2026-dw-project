import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import postgres from '../../database/connections/postgres.js'

export default {
    name: 'list-tables',
    description: 'Lista as tabelas do banco de dados',

    async handle() {
        const result = await postgres.query(`
            SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'public'
            ORDER BY table_name
        `)
        result.rows.forEach(row => {
            console.log(row.table_name)
        })
        await postgres.close()
    }
}
