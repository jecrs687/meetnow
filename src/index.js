import React,{useEffect, useState} from 'react'
import {AsyncStorage,KeyboardAvoidingView,StyleSheet, Text,View, Image,TouchableOpacity } from 'react-native';
import logo from './assets/logo.png';
import { TextInput } from 'react-native-paper';
import {FontAwesome} from '@expo/vector-icons';
import firebaseSvc from './services/FirebaseSvc';
import { LinearGradient } from 'expo-linear-gradient';



export default function Login({navigation}) {
    const [logar, setLogar] = useState('');
    const [user, setUser] = useState('emanuel@gmail.com');
    const [senha, setSenha] = useState('123123');
    const [erro, setErro] = useState(null );

    useEffect(()=>{
 
      firebaseSvc.uid?
      navigation.navigate('Principal'):null

    }, [])
  async function handleLogin(){
    const userlogin = {email: user,password: senha }
    firebaseSvc.login(userlogin,
      ()=>{ 
      navigation.navigate('Principal')},
       ()=>{
      setErro('login incorreto')}
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
                <LinearGradient
        // colors={['#4c669f', '#3b5998', '#192f6a']}
        colors={['#ffccf0','#ffcce0']}
        style={{ padding: 15, alignItems:'center',justifyContent:'center', width:'100%',height:'60%' ,minHeight:200,borderRadius: 5 ,position:"absolute", top:0}}
        >
              <Image source={logo} resizeMode='contain' style={styles.logo}/>
      </LinearGradient>
    <View style={styles.containerBox}>
    {erro? <Text style={{color:'#ffcce0',fontWeight:'bold', alignSelf:'center' }}>{erro}</Text>:null}
    <View style={styles.inputBox}>
    <FontAwesome name='user-o' size={30} style={styles.icon}/>
    <TextInput 
    label='usuario'
    autoCapitalize="none"
    autoCorrect={false}
    underlineColor='#ffcce0'
    value={user}
    onChangeText={setUser}
    style={styles.input} />
    </View>
    <View style={styles.inputBox}>
    <FontAwesome name='lock' size={30} style={styles.icon}/>
    <TextInput 
    autoCapitalize="none"
    secureTextEntry={true}
    underlineColor='#ffcce0'
    label='senha'
    autoCorrect={false}
    value={senha}
    onChangeText={setSenha}
    style={styles.input} />
    </View >
    <View style={styles.buttons}>
    <TouchableOpacity onPress={handleCriar} style={styles.buttonCriar}>
      <Text style={styles.textButton}>
        Criar conta
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={handleLogin} style={styles.button}>
      <Text style={styles.textButton}>
          Entrar
      </Text>
      </TouchableOpacity>
    </View>
    </View>
  </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  containerBox:{
    backgroundColor:'white',
    height:'50%',
    minHeight:250,
    width:'90%',
    margin:10,
    alignItems:'center',
    borderRadius:10,
    padding:20,
  },
  inputBox:{
    marginHorizontal:25,
    flexDirection:'row',
    alignItems:'center',
    alignContent:'center',
    justifyContent:'center',
    marginBottom:20,
  },
  icon:{
    alignSelf: 'center'

    },
  input:{
    height:46,
    width:'100%',
    alignSelf:'center',
    marginLeft:15,
    backgroundColor: '#FFF',
    
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
  },
  logo:{
    height:'100%',
    width:'100%',
    alignSelf:'center'
  },
});
