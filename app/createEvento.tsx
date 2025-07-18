import { db } from '@/db/db'
import { eventos } from '@/db/schema'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { copyAsync, documentDirectory } from 'expo-file-system'
import {
  launchImageLibraryAsync,
  requestMediaLibraryPermissionsAsync
} from 'expo-image-picker'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function CreateEvento() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState<null | Date>(null)
  const [uri, setUri] = useState('')
  const router = useRouter()

  const pickDate = () => {
    DateTimePickerAndroid.open({
      value: date || new Date(),
      mode: 'date',
      onChange: ({ type }, date) => {
        if (type === 'set') setDate(date!)
      }
    })
  }

  const pickImage = async () => {
    const permission = await requestMediaLibraryPermissionsAsync()
    if (!permission.granted) {
      return alert('Permisos de la libreria de imagenes denegada')
    }

    const result = await launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true
    })

    if (result.canceled) return

    setUri(result.assets[0].uri)
  }

  const saveEvent = async () => {
    if (!title.trim()) return alert('El titulo es obligatorio')
    if (!description.trim()) return alert('La descripcion es obligatoria')
    if (!uri.trim()) return alert('La imagen es obligatoria')
    if (date === null) return alert('La fecha es obligatoria')

    const fileName = uri.split('/').pop()
    if (!fileName) return alert('La imagen no es valida')

    const path = documentDirectory + fileName

    await copyAsync({ from: uri, to: path })

    await db.insert(eventos).values({
      date,
      description,
      title,
      uri: path
    })
    router.replace('/')
  }

  return (
    <View className='flex-1 p-4'>
      <View className='gap-2 mt-10'>
        <Text className='text-2xl'>Titulo del evento</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder='Rescate de perros'
          className='text-lg border rounded-xl p-4'
        />
      </View>
      <View className='gap-2 mt-10'>
        <Text className='text-2xl'>Descripcion del evento</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder='Escriba la descripcion de lo que paso en el evento'
          className='text-lg border rounded-xl p-4'
          multiline
          numberOfLines={6}
        />
      </View>
      <View className='gap-2 mt-10'>
        <Text className='text-2xl'>Fecha del evento</Text>
        <TouchableOpacity
          onPress={pickDate}
          className='border rounded-xl p-4 bg-slate-300'
        >
          <Text>
            {date
              ? date.toLocaleDateString('es-ES', {
                  day: 'numeric',
                  year: 'numeric',
                  weekday: 'long',
                  month: 'long'
                })
              : 'Seleccione una fecha'}
          </Text>
        </TouchableOpacity>
      </View>
      <View className='gap-2 mt-10'>
        <Text className='text-2xl'>Imagen del evento</Text>
        <TouchableOpacity
          onPress={pickImage}
          className='border rounded-xl p-4 bg-slate-300'
        >
          <Text>Seleccione una imagen</Text>
        </TouchableOpacity>
        {uri && (
          <Image
            source={{ uri }}
            className='size-60 rounded-xl'
          />
        )}
      </View>
      <TouchableOpacity
        onPress={saveEvent}
        className='mx-auto px-8 py-4 border border-neutral-400 bg-green-500 rounded-lg mt-8'
      >
        <Text className='text-white text-2xl italic'>Crear evento</Text>
      </TouchableOpacity>
    </View>
  )
}
