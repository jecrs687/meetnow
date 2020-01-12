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
import { LinearGradient } from 'expo-linear-gradient';
import {ChangeImageProfile} from '../components/ChangeImageProfile'




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
      this.setState({index: 3})
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
  
textpassword(){
  return (
    <React.Fragment> 
      <View>
      <ChangeImageProfile avatar={this.state.avatar} style={{position:'absolute',bottom:225, alignSelf:'center'}} changeAvatar={(avatar)=>{this.setState({avatar:avatar})}}/>
   
    <View style={styles.inputBox}>
    <FontAwesome name='user-o' size={30} style={styles.icon}/>
    <TextInput 
    underlineColor='pink'
    autoCapitalize="none"
    autoCorrect={false}
    placeholder="usuário" 
    value={this.state.name}
    onChangeText={this.onChangeTextName}
    style={styles.input}/>
    </View>
    <View style={styles.inputBox}>
    <FontAwesome name='github-alt' size={30} style={styles.icon}/>
        <TextInput 
    underlineColor='pink'
    autoCapitalize="none"
    autoCorrect={false}
    placeholder="apelido" 
    value={this.state.apelido}
    onChangeText={this.onChangeTextApelido}
    style={styles.input}/>
       </View>
    <View style={styles.inputBox}>
    <FontAwesome name='envelope' size={30} style={styles.icon}/>
      <TextInput 
    underlineColor='pink'
    autoCapitalize="none"
    autoCorrect={false}
    placeholder="email" 
    value={this.state.email}
    onChangeText={this.onChangeTextEmail}
    style={styles.input}/>
       </View>
    <View style={styles.inputBox}>
    <FontAwesome name='lock' size={30} style={styles.icon}/>
    <TextInput 
      underlineColor='pink'
      autoCapitalize="none"
      autoCorrect={false}
      placeholder="password"
      secureTextEntry={true}
      textContentType='password'
      value={this.state.password}
      onChangeText={this.onChangeTextPassword}
      style={styles.input}/>
      </View>
      </View>
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
        return this.textpassword()
      case 1:
        return this.textBio()
      case 2:
        return  this.textGostos()
      case 3:
        return  this.textDesgostos()
      case 4:
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
                <LinearGradient
        // colors={['#4c669f', '#3b5998', '#192f6a']}
        colors={['#ffccf0','#ffcce0']}
        style={{ padding: 15, alignItems:'center',justifyContent:'center', width:'100%',height:'40%' ,minHeight:200,borderRadius: 5 ,position:"absolute", top:0}}
        >
              <Image source={logo} resizeMode='contain' style={styles.logo}/>
      </LinearGradient>    
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
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'flex-end',

  },
  inputBox:{
    marginHorizontal:25,
    flexDirection:'row',
    alignItems:'center',
    alignContent:'center',
    justifyContent:'center',
    marginBottom:10
  },
  icon:{
    alignSelf: 'center'
  },
  logo:{
    height:'100%',
    width:'100%',
    alignSelf:'center'
  },
  containerInfo:{
    backgroundColor:'white',
    height:'50%',
    minHeight:250,
    width:'90%',
    margin:10,
    alignItems:'center',
    borderRadius:10,
    padding:30,

  },
  input:{
    height:46,
    width:'100%',
    alignSelf:'center',
    marginLeft:15,
    backgroundColor: '#FFF',
    
  },  
  inputGrande:{
    height:240,
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
    marginHorizontal:25,
    marginBottom:25,
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
