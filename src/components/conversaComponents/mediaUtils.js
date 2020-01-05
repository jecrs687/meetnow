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
      const url = await FirebaseSvc.uploadPhotoMessage(result.uri);
      if(result.type=='image'){
      onSend([{ image: url }])}
      else{onSend([{ video: url }])}
      return result.uri
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
