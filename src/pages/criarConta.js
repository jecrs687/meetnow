import React from 'react';
import {Image,
  StyleSheet, Text,View,
  Button, ImageEditor,KeyboardAvoidingView,TouchableOpacity
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import logo from '../assets/logo.png'
import { TextInput } from 'react-native-paper';
import { createStackNavigator } from 'react-navigation';
import firebaseSvc from '../services/FirebaseSvc';
import {AntDesign} from '@expo/vector-icons'




class CreateAccount extends React.Component {
  static navigationOptions = {
    title: 'Create account',
  };
constructor(props){
super(props);
  this.state = {
    index:0,
    name: '',
    apelido:'',
    email: '',
    password: '',
    avatar: 'https://d1bvpoagx8hqbg.cloudfront.net/259/eb0a9acaa2c314784949cc8772ca01b3.jpg',
    gostos:'',
    bio:'',
    desgostos:'',

  };
}

  onPressCreate = async () => {
    console.log('create account... email:' + this.state.email);
    try {
      const user = {
        apelido:this.state.apelido,
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        avatar: this.state.avatar,
        gostos:this.state.gostos,
        bio:this.state.bio,
        desgostos:this.state.desgostos,
      };
      await firebaseSvc.createAccount(user);
    } catch ({ message }) {
      console.log('create account failed. catch error:' + message);
    }
    this.props.navigation.navigate('Login')
  };

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
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })
    console.log(result);
    if(!result.cancelled){
    this.setState({avatar:  'https://firebasestorage.googleapis.com/v0/b/meetnow-c6097.appspot.com/o/assets%2Floading.gif?alt=media&token=45c85754-4293-4116-8508-52a5c64c14bb'})
    let uploadUrl = await firebaseSvc.uploadImage(result.uri);
    //let uploadUrl = await firebaseSvc.uploadImageAsync(resizedUri);
    await this.setState({ avatar: uploadUrl });
    await firebaseSvc.updateAvatar(uploadUrl); //might failed
    };}
    componentDidMount() {
      this.getPermissionAsync();
      console.log('permissão concedida');
    }


  handleNext(){
    this.state.index==0? 
    this.setState({index: 1})
      : 
      this.state.index==1? 
      this.setState({index: 2})
        :
        this.state.index==2? 
         this.setState({index: 3})
          :
          this.state.index==3? 
          this.setState({index: 4})
                      :
            this.state.index==4? 
            this.setState({index: 5})
                          :
              this.state.index==5? 
              this.setState({index: 6})
                              :              
                      null
  }
    handleReturn(){
      this.state.index==0? 
      this.props.navigation.navigate('Login')
      :
      this.state.index==1? 
      this.setState({index: 0})
            :
      this.state.index==2? 
      this.setState({index: 1})
              :
        this.state.index==3? 
        this.setState({index: 2})
                  :
          this.state.index==4? 
          this.setState({index: 3})
                        :
              this.state.index==5? 
              this.setState({index: 4})
                            :
              null
  }
  
  onChangeTextName = name => this.setState({ name });
  onChangeTextApelido = apelido => this.setState({ apelido });
  onChangeTextPassword = password => this.setState({ password });
  onChangeTextEmail = email => this.setState({ email });
  onChangeTextGostos = gostos => this.setState({gostos})
  onChangeTextBio =  bio => this.setState({bio})
  onChangeTextDesgostos = desgostos => this.setState({desgostos})
  
  textemail(){
  return (
  <React.Fragment>
    <TextInput 
    underlineColor='pink'
    autoCorrect={false}
    placeholder="nome" 
    value={this.state.name}
    onChangeText={this.onChangeTextName}
    style={styles.input}/>
    <TextInput 
    underlineColor='pink'
    autoCapitalize="none"
    autoCorrect={false}
    placeholder="apelido" 
    value={this.state.apelido}
    onChangeText={this.onChangeTextApelido}
    style={styles.input}/>
  <TextInput 
    underlineColor='pink'
    autoCapitalize="none"
    autoCorrect={false}
    placeholder="email" 
    value={this.state.email}
    onChangeText={this.onChangeTextEmail}
    style={styles.input}/>
    </React.Fragment>
    )}
textpassword(){
  return (
    <React.Fragment>
      
    <TextInput 
    underlineColor='pink'
    autoCapitalize="none"
    autoCorrect={false}
    placeholder="usuário" 
    value={this.state.name}
    onChangeText={this.onChangeTextName}
    style={styles.input}/>
        <TextInput 
    underlineColor='pink'
    autoCapitalize="none"
    autoCorrect={false}
    placeholder="apelido" 
    value={this.state.apelido}
    onChangeText={this.onChangeTextApelido}
    style={styles.input}/>
      <TextInput 
    underlineColor='pink'
    autoCapitalize="none"
    autoCorrect={false}
    placeholder="email" 
    value={this.state.email}
    onChangeText={this.onChangeTextEmail}
    style={styles.input}/>
    <TextInput 
      underlineColor='pink'
      autoCapitalize="none"
      autoCorrect={false}
      placeholder="password"
      textContentType='password'
      value={this.state.password}
      onChangeText={this.onChangeTextPassword}
      style={styles.input}/>

      </React.Fragment>
    )}
textBio(){
  return (
    <React.Fragment>
    <TextInput 
      autoCapitalize="none"
      autoCorrect={false}
      placeholder="Me fale um pouco sobre você" 
      value={this.state.bio}
      onChangeText={this.onChangeTextBio}
      style={styles.inputGrande}/>

      </React.Fragment>
    )}
textAvatar(){
return (
  <React.Fragment>

   <Image source={{ uri: this.state.avatar }} style={{ width: 200, height: 200,marginTop:10, borderRadius:100}} />

  <Button
          title="foto de perfil"
          style={styles.buttonText}
          onPress={this._pickImage}
/>


    </React.Fragment>
)};
textGostos(){
  return (
    <React.Fragment>
    <TextInput 
      autoCapitalize="none"
      autoCorrect={false}
      placeholder="Quais são as coisas que você gosta e lhe atraem?" 
      value={this.state.gostos}
      onChangeText={this.onChangeTextGostos}
      style={styles.inputGrande}/>

      </React.Fragment>
    )}
textDesgostos(){
  return (
    <React.Fragment>
    <TextInput 
      autoCapitalize="none"
      
      autoCorrect={false}
      placeholder="Quais são as coisas que lhe desagradam?" 
      value={this.state.desgostos}
      onChangeText={this.onChangeTextDesgostos}
      style={styles.inputGrande}/>
 
      </React.Fragment>
    )}
  tela(index){
    switch(index){
      case 0:
       return this.textemail();
      case 1:
        return this.textpassword()
      case 2:
        return this.textAvatar()
      case 3:
        return this.textBio()
      case 4:
        return  this.textGostos()
      case 5:
        return  this.textDesgostos()
      case 6:
       this.onPressCreate()
       break;
        }
  }
  
  render() {
    return (
      <KeyboardAvoidingView
      behavior="padding"
      enabled={true}
      style={styles.container}
      >
    <Image source={logo} resizeMode='contain' style={styles.logo}/>
    
    <View style={styles.containerInfo}>
          {this.tela(this.state.index)}
      </View>
        <View style={styles.buttons}>
        <TouchableOpacity onPress={()=>{this.handleReturn()}} style={styles.button2}><AntDesign name='leftcircle' size={50} color='pink'/></TouchableOpacity>
        <TouchableOpacity onPress={()=>{this.handleNext()}} style={styles.button}><AntDesign name='rightcircle' size={50} color='pink'/></TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
    );
  }
}

const offset = 16;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding:30,
  },
  logo:{
    height:80,
    width:150,
  },
  containerInfo:{
    backgroundColor:'white',
    height:300,
    width:300,
    margin:10,
    alignItems:'center',
    justifyContent:'space-around',
    borderRadius:30,
    borderTopLeftRadius:0,
    padding:20,
    shadowColor: "#000",
    shadowOffset: {
        width: 4,
        height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,    
    elevation: 9, 
  },
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
  input:{
    height:46,
    alignSelf:'stretch',
    backgroundColor: '#f9f9f9',
    borderWidth:0.1,
    borderRadius:4,
    borderColor:'#aaaaaa',
    marginTop:20,
    paddingHorizontal:15,
    
  },  
  inputGrande:{
    height:300,
    padding:10,
    textAlignVertical:'top',
    textAlign:'left',
    alignSelf:'stretch',
    borderWidth:0.1,
    borderRadius:4,
    borderColor:'#f0f0f5',
    elevation:2,
    shadowColor:'#000',
    shadowOpacity: 0.05,
    shadowRadius:2,
    shadowOffset:{
        width:0,
        height:2,
    },
    marginTop:5,
    paddingHorizontal:15,
  },
  buttons:{
    marginTop:5,
    flexDirection:'row',
    alignSelf:'stretch',
    alignContent:'flex-end',
    alignItems:'flex-end',
    justifyContent:'space-between',
    elevation:3,
    shadowColor:'#000',
    shadowOpacity: 0.15,
    shadowRadius:5,
    shadowOffset:{
        width:0,
        height:3,
    }, 
},
  button:{
    alignItems:'flex-end',
    backgroundColor: 'white',
    height:50,
    width:50,
    borderRadius:25
  },
  button2:{
    alignItems:'flex-end',
    backgroundColor: 'white',
    height:50,
    width:50,
    borderRadius:25
    

  },
  textButton:{
      fontStyle:'normal',
      fontWeight:'bold',
      fontSize:14,
      color:'white',
  },
  nameInput: {
    height: offset * 2,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: '#111111',
    borderWidth: 1,
    fontSize: offset,
  },
  buttonText: {
    margin:50,
    fontSize: 42,
  },
});

export default CreateAccount;
