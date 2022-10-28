import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#373D98',
    paddingTop: 24
  },
  scroll: {
    paddingBottom: 50
  },
  picture: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    margin: 24,
    padding: 5
  },
  camera: {
    width: Dimensions.get("screen").width - 58,
    height: 400,
  },
  player: {
    width: '100%',
    backgroundColor: '#FFF',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    width: '100%',
    fontSize: 22,
    fontWeight: '900',
    color: '#2D3748',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  sticker: {
    backgroundColor: '#373D98',
  },
});