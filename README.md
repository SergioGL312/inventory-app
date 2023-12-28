npm install @react-navigation/native

npx expo install react-native-screens react-native-safe-area-context

npm install @react-navigation/stack

npx expo install react-native-gesture-handler

'''
StatusBar
        barStyle="dark-content" Puedes ajustar el estilo de la barra de estado según tus preferencias
        backgroundColor="transparent"
        translucent


'''

flex: 1 asegura que el contenedor se expanda para ocupar todo el espacio disponible


container_header: {
    width: '100%',
    backgroundColor: '#ABEBC6',
    paddingVertical: 80,  // Ajusta el padding según tus necesidades
    paddingHorizontal: 40,  // Ajusta el padding según tus necesidades
    flexDirection: 'row',  // Cambiado a fila para alinear horizontalmente los elementos
    justifyContent: 'center',  // Centra los elementos horizontalmente
    alignItems: 'center',  // Centra los elementos verticalmente
    flexWrap: 'wrap',
  },

  FAB

  npm install @react-native-async-storage/async-storage

# Que hacer

En la pantalla de entradas despues de seleccionar el producto de entrada manda el id en lugar de eso mandar el mandar un obj con id y nombre de producto o nadamas mandar el nombre del producto