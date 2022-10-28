import { useState, useEffect, useRef } from 'react';
import { Image, SafeAreaView, ScrollView, TextInput, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';

import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { PositionChoice } from '../components/PositionChoice';

import { styles } from './styles';
import { POSITIONS, PositionProps } from '../utils/positions';

const CAMERA_NOT_ALLOW_IMAGE = 'https://preview.redd.it/1iewg3rme8d61.png?width=1219&format=png&auto=webp&s=91b3296fcb07d98c9e8724cc091bd4994477293d';

export function Home() {
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [positionSelected, setPositionSelected] = useState<PositionProps>(POSITIONS[0]);

  const cameraRef = useRef<Camera>(null);
  const screenShotRef = useRef(null);

  const handleTakePicture = async () => {
    const photo = await cameraRef.current.takePictureAsync();
    setPhoto(photo.uri);
  }

  const shareScreenShot = () => {
    setTimeout(async () => {
      const screenShot = await captureRef(screenShotRef, {
        format: 'png',
        quality: 1,
      });
      await Sharing.shareAsync(`file://${screenShot}`);
    }, 500);
  }

  useEffect(() => {
    Camera.requestCameraPermissionsAsync()
      .then((response) => setHasCameraPermission(response.granted));
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View ref={screenShotRef} style={styles.sticker}>
          <Header position={positionSelected} />

          <View style={styles.picture}>
            {(hasCameraPermission && !photo) ? (
              <Camera 
                ref={cameraRef}
                type={CameraType.front}
                style={styles.camera}
              />
            ) : (
              <Image 
                source={{ uri: photo ? photo : CAMERA_NOT_ALLOW_IMAGE }} 
                style={[styles.camera, {
                  transform: [
                    { scaleX: photo ? -1 : 1 }
                  ],
                }]} 
                onLoad={shareScreenShot}
              />
            )}

            <View style={styles.player}>
              <TextInput
                placeholder="Digite seu nome aqui"
                style={styles.name}
              />
            </View>
          </View>
        </View>

        <PositionChoice
          onChangePosition={setPositionSelected}
          positionSelected={positionSelected}
        />

        <Button 
          title={!!photo ? 'Tirar outra foto' : 'Compartilhar'}
          onPress={() => !!photo ? setPhoto(null) : handleTakePicture()}
        />
      </ScrollView>
    </SafeAreaView>
  );
}