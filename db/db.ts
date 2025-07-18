import { drizzle } from 'drizzle-orm/expo-sqlite'
import * as SQLite from 'expo-sqlite'
import { schema } from './schema'

const expo = SQLite.openDatabaseSync('db.db')

const db = drizzle(expo, {schema})

export { db }
