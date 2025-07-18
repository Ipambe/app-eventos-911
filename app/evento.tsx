import { db } from '@/db/db'
import { Evento as EventoType, eventos } from '@/db/schema'
import { Ionicons } from '@expo/vector-icons'
import { eq } from 'drizzle-orm'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect, useState } from 'react'
import { Image, Text, View } from 'react-native'

export default function Evento() {
  const { id } = useLocalSearchParams() as unknown as { id: string }
  const idNumber = parseInt(id)
  const [evento, setEvento] = useState<null | EventoType>(null)
  const navigation = useNavigation()

  useEffect(() => {
    const loadEvento = async () => {
      const evento = await db.query.eventos.findFirst({
        where: eq(eventos.id, idNumber)
      })
      if (!evento) return navigation.goBack()

      setEvento(evento)
    }
    loadEvento()
  }, [])

  console.log(evento)

  if (!evento)
    return (
      <Text className='text-2xl font-bold italic text-center'>Cargando...</Text>
    )

  return (
    <View className='flex-1 p-4 gap-4 items-center'>
      <View className='flex-row justify-center items-center gap-20 w-full px-20'>
        <Ionicons
          name='calendar'
          size={40}
        />
        <Text className='text-2xl italic text-neutral-700 flex-1'>
          {evento.date.toLocaleDateString('es-ES', {
            day: 'numeric',
            year: 'numeric',
            weekday: 'long',
            month: 'long'
          })}
        </Text>
      </View>
      <View className='flex-row justify-center items-center gap-20 w-full px-20'>
        <Ionicons
          name='document'
          size={40}
        />
        <View className='flex-1'>
          <Text className='text-2xl  text-neutral-700 font-bold'>
            {evento.title}
          </Text>
          <Text className='italic text-lg text-neutral-700'>
            {evento.description}
          </Text>
        </View>
      </View>
      <View className='flex-row items-center'>
        <Text className='text-2xl font-bold mr-2'></Text>
      </View>
      <Image
        source={{ uri: evento.uri }}
        className='size-96 rounded-lg mx-auto'
      />
    </View>
  )
}
