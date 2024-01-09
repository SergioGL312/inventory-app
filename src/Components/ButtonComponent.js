import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';

export default function ButtonComponent({ onPress, imageSource, customImageStyles, buttonText, customStyles }) {
  return (
    <TouchableOpacity
      style={[styles.button, customStyles]}
      onPress={onPress}
    >
      <View style={styles.buttonContent}>
        <View style={styles.imageContainer}>
          <Image source={imageSource} style={[styles.buttonImage, customImageStyles]} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textButton}>{buttonText}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    borderWidth: 2,
    height: 78,
    width: 310,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  buttonImage: {
    width: 50,
    height: 50,
  },
  textContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  textButton: {
    fontSize: 16,
    fontWeight: 'normal',
    marginLeft: 20,
  },
});