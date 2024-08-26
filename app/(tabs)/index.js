import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';

export default function HomeTitle() {
  const [bgColor, setBgColor] = useState('#45b766'); // Color inicial del fondo
  const translateY = useSharedValue(-1000); // Definir la ubicación del texto en el eje Y
  const opacity = useSharedValue(1); // Valor de opacidad inicial para el título

  // Usa useEffect para iniciar la transición de deslizamiento del título
  useEffect(() => {
    translateY.value = withTiming(0, { duration: 1000 }); // La transición dura 1 seg hasta su posición final
  }, []);

  // Función para cambiar el color de fondo después del desvanecimiento
  const changeBackgroundColor = () => {
    const newColor = bgColor === '#45b766' ? '#001f3f' : '#45b766'; // Cambia entre verde y azul utilizndo un ternario. Si el color es verde cambia a azul, sino al revés.
    setBgColor(newColor);
  };

  const handlePress = () => {
    // Inicia la animación de desvanecimiento (fade out) del título
    opacity.value = withTiming(0, { duration: 500 }, () => {
      runOnJS(changeBackgroundColor)(); // Cambia el color de fondo
      // Inicia la animación de aparición (fade in) del título
      opacity.value = withTiming(1, { duration: 500 });
    });
  };

  // Define el estilo de animación para el texto
  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value, // Aplica la opacidad al texto
    };
  });

  // Define el estilo de animación para el fondo
  const animatedBackgroundStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor: bgColor }, animatedBackgroundStyle]}>
      <Animated.Text style={[styles.title, animatedTextStyle]}>Bienvenido</Animated.Text>
      <Button title="Iniciar" color="black" onPress={handlePress} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
});
