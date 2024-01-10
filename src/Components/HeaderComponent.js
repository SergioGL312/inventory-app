import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HeaderComponent() {
  return (
    <View style={styles.container_header}>
      <View>
        <Text style={styles.bienvenidoText}>Bienvenido!</Text>
      </View>
      <View>
        <Text style={styles.hacerText}>¿Qué deseas hacer?</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container_header: {
    width: '100%',
    height: 226,
    paddingTop: 28,
    paddingVertical: 80,
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  bienvenidoText: {
    fontSize: 48,
    fontWeight: 'normal',
    marginBottom: 20,
  },
  hacerText: {
    fontSize: 18,
    fontWeight: 'normal',
  },
});