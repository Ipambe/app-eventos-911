import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

const eventos = sqliteTable('eventos', {
  id: int().primaryKey({ autoIncrement: true }),
  date: int({ mode: 'timestamp' }).notNull(),
  title: text().notNull().unique(),
  description: text().notNull(),
  uri: text().notNull()
})

const schema = {
  eventos
}

type Evento = typeof eventos.$inferSelect

export { Evento, eventos, schema }
