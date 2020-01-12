import React from 'react';
import {Image,
  StyleSheet, Text,View,
  Button,KeyboardAvoidingView,TouchableOpacity
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import logo from '../assets/logo.png'
import { TextInput } from 'react-native-paper';
import firebaseSvc from '../services/FirebaseSvc';
import {AntDesign, FontAwesome} from '@expo/vector-icons'

export class ChangeImageProfile extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      avatar:this.props.avatar,
    };
  }
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })
    if(!result.cancelled){
    this.props.changeAvatar('https://firebasestorage.googleapis.com/v0/b/meetnow-c6097.appspot.com/o/assets%2Floading.gif?alt=media&token=45c85754-4293-4116-8508-52a5c64c14bb')
    this.setState({avatar:'https://firebasestorage.googleapis.com/v0/b/meetnow-c6097.appspot.com/o/assets%2Floading.gif?alt=media&token=45c85754-4293-4116-8508-52a5c64c14bb'})
    let uploadUrl = await firebaseSvc.uploadImage(result.uri);
    console.log(uploadUrl)
    //let uploadUrl = await firebaseSvc.uploadImageAsync(resizedUri);
    this.setState({avatar:uploadUrl})
    this.props.changeAvatar( uploadUrl );
    };}
    componentDidMount() {
      this.getPermissionAsync();
      console.log('permissão concedida');
    }

  render() {
    return (

      <View style={[styles.boxFoto, this.props.style]}>
             <Image source={{ uri: this.state.avatar }} style={styles.foto} />

        <TouchableOpacity style={styles.buttonChange}
        onPress={this._pickImage}
        >
            <FontAwesome name='camera' size={30}/>
        </TouchableOpacity>
        </View>
                    
     
    );
  }
}
const styles = StyleSheet.create(
    {   
        foto:{ 
        width: 200, 
        height: 200,
        marginTop:10, 
        borderRadius:100, 
        borderWidth:10,
        borderColor:'white'
    },
        boxFoto:{
            
        },
        buttonChange:{
            position:"absolute",
            bottom:30,
            alignItems:'center',
            justifyContent:'center',
            alignSelf:'flex-end',
            backgroundColor:'white',
            height:50,
            width:50,
            borderRadius:20,
            
        }
    });

