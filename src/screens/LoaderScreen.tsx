import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Animated,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

const { width, height } = Dimensions.get('window');

const LoaderScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // scale 0.1 == 30/300; opacity 0 -> 1
  const scale = useRef(new Animated.Value(0.1)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // плавна поява та збільшення
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 4800,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    
  }, [navigation, scale, opacity]);

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.iconContainer}>
        <Animated.Image
          source={require('../assets/imgIconNew.png')}
          style={[
            styles.icon,                 // «цільовий» розмір 300×300
            { opacity, transform: [{ scale }] },
          ]}
          resizeMode="cover"
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width,
    height,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 40,
  },
  iconContainer: {
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // цільовий розмір; стартовий досягається через scale 0.1
  icon: {
    width: 300,
    height: 300,
    borderRadius: 20,
    overflow: 'hidden',
  },
});

export default LoaderScreen;
