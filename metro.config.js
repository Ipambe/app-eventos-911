// Nombre: Rafael Adolfo Rosa
// Matricula: 2023-1025

const { getDefaultConfig } = require('expo/metro-config')
const { withNativeWind } = require('nativewind/metro')

const config = getDefaultConfig(__dirname)

config.resolver.sourceExts.push('sql')

module.exports = withNativeWind(config, { input: './global.css' })
