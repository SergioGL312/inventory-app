import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
// rneui/base
import { Overlay, Button } from '@rneui/base';
// COMPONENT
import ImageSelector from './ImageSelectorComponent';

export default function NewProductOverlayComponent({ visible, hide, onChangeTextNewProduct, onChangeCantNewProduct, saveNewProduct, textNewProduct, selectedImage, onSelectImage }) {

  const handleImageSelect = async (imageUri) => {
    onSelectImage(imageUri)
  };

  return (
    <Overlay
      overlayStyle={styles.overlayContainer}
      isVisible={visible}
      onBackdropPress={hide}
    >
      <View style={styles.overlayContent}>
        <Text style={styles.overlayTitle}>Nuevo producto</Text>
        <TextInput
          style={styles.inputField}
          placeholder='Nombre nuevo producto'
          onChangeText={onChangeTextNewProduct}
        />
        <TextInput
          style={styles.inputField}
          placeholder="0"
          keyboardType="numeric"
          onChangeText={onChangeCantNewProduct}
        />
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
        ) : (
          <ImageSelector onSelect={handleImageSelect} />
        )}
      </View>
      <Button
        color="#275E96"
        title="Guardar"
        onPress={saveNewProduct}
        disabled={textNewProduct.trim() === '' || selectedImage === ''}
        buttonStyle={styles.saveButton}
      />
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlayContainer: {
    backgroundColor: 'white',
    width: '80%',
    paddingVertical: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 10,
  },
  overlayContent: {
    marginBottom: 20,
  },
  overlayTitle: {
    fontSize: 38,
    marginBottom: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#275E96',
  },
  inputField: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  selectedImage: {
    width: 100,
    height: 100,
    marginTop: 10,
    alignSelf: 'center',
  },
  saveButton: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    alignSelf: 'center',
    width: '50%',
  },
});
