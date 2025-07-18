// Nombre: Rafael Adolfo Rosa
// Matricula: 2023-1025

import { db } from '@/db/db'
import { Evento, eventos } from '@/db/schema'
import { Ionicons } from '@expo/vector-icons'
import { eq } from 'drizzle-orm'
import { Link } from 'expo-router'
import { useEffect, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

export default function Index() {
  const [events, setEvents] = useState<Evento[]>([])

  const loadEvents = async () => {
    const events = await db.query.eventos.findMany()
    setEvents(events)
  }
  useEffect(() => {
    loadEvents()
  }, [])

  const deleteEvent = async (id: number) => {
    await db.delete(eventos).where(eq(eventos.id, id))
    await loadEvents()
  }

  return (
    <View className='flex-1 items-center p-4'>
      <Link
        asChild
        href={{ pathname: '/createEvento' }}
      >
        <TouchableOpacity className='p-4 bg-blue-600 border border-neutral-400 rounded-lg'>
          <Text className='text-white text-2xl'>Crear un nuevo evento</Text>
        </TouchableOpacity>
      </Link>
      {events && (
        <View className='w-full flex-1 mt-10 gap-6'>
          <Text className='text-2xl font-bold'>Eventos</Text>
          <ScrollView className='w-full flex-1'>
            {events.map((e) => (
              <View
                key={e.id}
                className='flex-row gap-4 mb-4'
              >
                <Link
                  href={{ pathname: '/evento', params: { id: e.id } }}
                  asChild
                >
                  <TouchableOpacity className='flex-1 flex-row bg-blue-500 p-4 rounded-xl'>
                    <Text className='text-xl text-white mr-2 font-bold'>
                      {e.title}
                    </Text>
                    <Text className='text-lg text-neutral-200'>
                      ({e.date.toLocaleDateString()})
                    </Text>
                  </TouchableOpacity>
                </Link>
                <TouchableOpacity
                  onPress={() => deleteEvent(e.id)}
                  className='bg-red-500 items-center justify-center p-2 aspect-square rounded-xl'
                >
                  <Ionicons
                    name='trash-bin-outline'
                    size={24}
                    color={'white'}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  )
}
