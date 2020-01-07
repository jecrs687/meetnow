import { Linking } from 'expo'
import FirebaseSvc from '../../services/FirebaseSvc'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'

import { Alert } from 'react-native'

export default async function getPermissionAsync(permission) {
  const { status } = await Permissions.askAsync(permission)
  if (status !== 'granted') {
    const permissionName = permission.toLowerCase().replace('_', ' ')
    Alert.alert(
      'Cannot be done 😞',
      `If you would like to use this feature, you'll need to enable the ${permissionName} permission in your phone settings.`,
      [
        {
          text: "Let's go!",
          onPress: () => Linking.openURL('app-settings:'),
        },
        { text: 'Nevermind', onPress: () => {}, style: 'cancel' },
      ],
      { cancelable: true },
    )

    return false
  }
  return true
}

export async function getLocationAsync(onSend) {
  if (await getPermissionAsync(Permissions.LOCATION)) {
    const location = await Location.getCurrentPositionAsync({})
    if (location) {
      onSend([{ location: location.coords }])
    }
  }
}

export async function pickImageAsync(onSend) {
  if (await getPermissionAsync(Permissions.CAMERA_ROLL)) {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.All,
      quality:1
    })
    if (!result.cancelled) {
      var reference = await onSend([{image:'https://firebasestorage.googleapis.com/v0/b/meetnow-c6097.appspot.com/o/assets%2Floading.gif?alt=media&token=45c85754-4293-4116-8508-52a5c64c14bb'}]);
      const url = await FirebaseSvc.uploadPhotoMessage(result.uri);
      if(result.type=='image'){
        reference.child('image').set(url); 
        }else{
          reference.child('image').set(null);
          reference.child('video').set(url);
        }
    }
  }
}

export async function takePictureAsync(onSend) {
  if (await getPermissionAsync(Permissions.CAMERA)) {
    const result = await ImagePicker.launchCameraAsync({
    })

    if (!result.cancelled) {
      const url = await FirebaseSvc.uploadPhotoMessage(result.uri);
      onSend([{ image: url }])
      return result.uri
    }
  }
}
