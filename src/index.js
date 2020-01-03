import React,{useEffect, useState} from 'react'
import {AsyncStorage,KeyboardAvoidingView,StyleSheet, Text,View, Image,TouchableOpacity } from 'react-native';
import logo from './assets/logo.png';
import { TextInput } from 'react-native-paper';
import {Zocial} from '@expo/vector-icons';
import firebaseSvc from './services/FirebaseSvc';

export default function Login({navigation}) {
    const [logar, setLogar] = useState('');
    const [user, setUser] = useState('emanuel@gmail.com');
    const [senha, setSenha] = useState('123123');

    useEffect(()=>{
      firebaseSvc.uid?
      navigation.navigate('Principal'):null

    }, [])
   async function handleSocialButtonGoogle() {
    }
    async function handleSocialButtonGithub(){
}
  async function handleLogin(){
    const userlogin = {email: user,password: senha }
    firebaseSvc.login(userlogin,
      ()=>{ 
      navigation.navigate('Principal')},
       ()=>{
      console.log('login incorreto')}
    )

  }
  async function handleCriar(){
    navigation.navigate('CriarConta');
}
    return (
      <KeyboardAvoidingView
      behavior="padding"
      enabled={true}
      style={styles.container}
      >
    <Image source={logo} style={styles.logo}/>
    
    {logar? <Text style={{color:'#ff3399',fontWeight:'bold' }}>{logar}</Text>:null}
    <TextInput 
    label='usuario'
    autoCapitalize="none"
    autoCorrect={false}
    value={user}
    onChangeText={setUser}
    style={styles.input} />
    <TextInput 
    autoCapitalize="none"
    secureTextEntry={true}
    label='senha'
    autoCorrect={false}
    value={senha}
    onChangeText={setSenha}
    style={styles.input} />
    <View style={styles.buttons}>
    <TouchableOpacity onPress={handleCriar} style={styles.buttonCriar}>
      <Text style={styles.textButton}>
        criar conta
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={handleLogin} style={styles.button}>
      <Text style={styles.textButton}>
          ENTRAR
      </Text>
      </TouchableOpacity>
    </View>
    <Text style={{marginTop:10, fontStyle:'normal', fontWeight:'100', alignSelf:'center'}}>ou entrar com:</Text>
    <View style={styles.buttons}>

    <TouchableOpacity onPress={handleSocialButtonGoogle} style={styles.buttonSocial}>
      <Zocial name="google" size={30}/>
    </TouchableOpacity>


    <TouchableOpacity onPress={handleSocialButtonGithub} style={styles.buttonSocial}>
      <Zocial name="twitter" size={30} color='#abdefd'/>
    </TouchableOpacity>


    <TouchableOpacity onPress={handleSocialButtonGithub} style={styles.buttonSocial}>
      <Zocial name="facebook" size={30} color='blue'/>
    </TouchableOpacity>


    <TouchableOpacity onPress={handleSocialButtonGithub} style={styles.buttonSocial}>
      <Zocial name="github" size={30} color='black'/>
    </TouchableOpacity>

    </View>
  </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding:30,
  },
  input:{
    height:46,
    alignSelf:'stretch',
    backgroundColor: '#FFF',
    borderWidth:0.5,
    borderRadius:4,
    borderColor:'#f0f0f5',
    marginTop:20,
    paddingHorizontal:15,
  },
  buttons:{
    flexDirection:'row',
    alignSelf:'stretch',
    alignItems:'center',
    justifyContent:'space-between',
},
  button:{
      width:'60%',
      marginTop:10,
      backgroundColor:'#ff3399',
      borderColor:'#fff',
      borderWidth:3,
      borderRadius:7,
      height:50,
      alignSelf:'stretch',
      alignItems:'center',
      justifyContent:'center',
  },
  buttonCriar:{
    width:'38%',
    marginTop:10,
    backgroundColor:'#0000ca',
    borderColor:'#fff',
    borderWidth:3,
    borderRadius:7,
    height:50,
    alignSelf:'stretch',
    alignItems:'center',
    justifyContent:'center',
  },
  textButton:{
      fontStyle:'normal',
      fontWeight:'bold',
      fontSize:14,
      color:'white',
  },
  buttonSocial:{
    flex:1,
    marginRight:3,
    marginTop:30,
    height:40,
    backgroundColor:'white',
    alignContent:'center',
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'stretch',
    borderRadius:1000,
    borderColor:'pink',
    borderWidth:0,
  }
});
