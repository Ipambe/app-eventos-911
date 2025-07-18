// Nombre: Rafael Adolfo Rosa
// Matricula: 2023-1025

import { db } from '@/db/db'
import migrations from '@/drizzle/migrations'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import { Stack } from 'expo-router'
import { ActivityIndicator } from 'react-native'
import '../global.css'
export default function RootLayout() {
  const { success } = useMigrations(db, migrations)

  if (!success) return <ActivityIndicator size='large' />

  return (
    <Stack initialRouteName='index'>
      <Stack.Screen
        name='index'
        options={{ title: 'Listado de eventos' }}
      />
      <Stack.Screen
        name='createEvento'
        options={{ title: 'Creando un nuevo evento' }}
      />
      <Stack.Screen
        name='evento'
        options={{ title: 'Evento' }}
      />
    </Stack>
  )
}
