import React from 'react';
import { View, Text, TextInput } from 'react-native';
// rneui/base
import { Overlay, Button } from '@rneui/base';

export default function NewProductOverlayComponent({ visible, hide, onChangeTextNewProduct, onChangeCantNewProduct, saveNewProduct, textNewProduct }) {
  return (
    <Overlay
      overlayStyle={{ backgroundColor: 'white', width: '80%', padding: 20, height: '60%', justifyContent: 'center' }}
      isVisible={visible}
      onBackdropPress={hide}
    >
      <View>
        <Text style={{ fontSize: 18, marginBottom: 10, fontWeight: 'bold' }}>Nuevo producto</Text>
        <TextInput
          style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 20 }}
          placeholder='Nombre nuevo producto'
          onChangeText={onChangeTextNewProduct}
        />
        <TextInput
          style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 20 }}
          placeholder="0"
          keyboardType="numeric"
          onChangeText={onChangeCantNewProduct}
        />
      </View>
      <Button
        color="#ECADAD"
        title="Guardar"
        onPress={saveNewProduct}
        disabled={textNewProduct.trim() === ''}
        style={{ marginTop: 20 }}
      />
    </Overlay>
  );
}