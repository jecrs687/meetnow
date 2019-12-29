import React,{useEffect, useState} from 'react'
import io from 'socket.io-client';
import {AsyncStorage,KeyboardAvoidingView,Platform,StyleSheet, Text, View, Image,TextInput,TouchableOpacity } from 'react-native';
import logo from '../assets/logo.png'
import api from '../services/api'

export default function CriarConta({navigation}) {
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const [senha, setSenha] = useState('');
    const [bio, setBio] = useState('');
    const [avatar, setAvatar] = useState('');
    const [gostos, setGostos] = useState('');
    useEffect(()=>{
      AsyncStorage.getItem('name').then(name=>{
        if(name){  setName(name) }

  }
  )
  AsyncStorage.getItem('bio').then(bio=>{
    if(bio){  setBio(bio) }
  }
)
AsyncStorage.getItem('avatar').then(avatar=>{
  if(avatar){  setAvatar(avatar) }
}
)
AsyncStorage.getItem('senha').then(senha=>{
  if(senha){  setSenha(senha) }
}
)
AsyncStorage.getItem('gostos').then(gostos=>{
  if(gostos){  setGostos(gostos) }
}
)

  }, [])
function handleNext(){
  name.length==0? 
    setName(text)
    : 
    senha.length==0? 
      setSenha(text)
      :
      bio.length==0? 
        setBio(text)
        :
        avatar.length==0? 
          setAvatar(text)
          :
          gostos.length==0? 
            setGostos(text)
            :
            navigation.navigate('Login')

AsyncStorage.setItem('senha', senha);
AsyncStorage.setItem('name', name);
AsyncStorage.setItem('bio', bio);
AsyncStorage.setItem('avatar', avatar);
AsyncStorage.setItem('gostos', gostos);
setText('');
}
 function handleReturn(){
     senha.length==0? 
      setName('')
      :
      bio.length==0? 
        setSenha('')
        :
        avatar.length==0? 
          setBio('')
          :
          gostos.length==0? 
            setAvatar('')
            :
            null
console.log(name, senha, gostos);
setText('');
}

function textname(){
  return (
  <React.Fragment>
  <TextInput 
    autoCapitalize="none"
    autoCorrect={false}
    placeholder="usuário do instagram" 
    value={text}
    onChangeText={setText}
    style={styles.input}/>
    <View style={styles.buttons}>
      <TouchableOpacity onPress={handleNext} style={styles.button}><Text style={styles.textButton}>confirmar</Text></TouchableOpacity>
    </View>
    </React.Fragment>
    )}
function textSenha(){
  return (
    <React.Fragment>
    <TextInput 
    autoCapitalize="none"
    autoCorrect={false}
    placeholder="usuário do instagram" 
    value={name}
    onChangeText={setName}
    style={styles.input}/>
    <TextInput 
      autoCapitalize="none"
      autoCorrect={false}
      placeholder="senha"
      textContentType='password'
      value={text}
      onChangeText={setText}
      style={styles.input}/>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={handleReturn} style={styles.button2}><Text style={styles.textButton}>voltar</Text></TouchableOpacity>
        <TouchableOpacity onPress={handleNext} style={styles.button}><Text style={styles.textButton}>confirmar</Text></TouchableOpacity>
      </View>
      </React.Fragment>
    )}
function textBio(){
  return (
    <React.Fragment>
    <TextInput 
      autoCapitalize="none"
      autoCorrect={false}
      placeholder="Me fale um pouco sobre você" 
      value={text}
      onChangeText={setText}
      style={styles.inputGrande}/>
      <View style={styles.buttons}>      
      <TouchableOpacity onPress={handleReturn} style={styles.button2}><Text style={styles.textButton}>voltar</Text></TouchableOpacity>
        <TouchableOpacity onPress={handleNext} style={styles.button}><Text style={styles.textButton}>confirmar</Text></TouchableOpacity>
      </View>
      </React.Fragment>
    )}
function textAvatar(){
return (
  <React.Fragment>
  <TextInput 
    autoCapitalize="none"
    autoCorrect={false}
    placeholder="Link de fotinha" 
    value={text}
    onChangeText={setText}
    style={styles.input}/>
    <View style={styles.buttons}>
    <TouchableOpacity onPress={handleReturn} style={styles.button2}><Text style={styles.textButton}>voltar</Text></TouchableOpacity>

      <TouchableOpacity onPress={handleNext} style={styles.button}><Text style={styles.textButton}>confirmar</Text></TouchableOpacity>
    </View>
    </React.Fragment>
)}
function textGostos(){
  return (
    <React.Fragment>
    <TextInput 
      autoCapitalize="none"
      autoCorrect={false}
      placeholder="Quais são as coisas que você gosta e lhe atraem?" 
      value={text}
      onChangeText={setText}
      style={styles.inputGrande}/>
      <View style={styles.buttons}>
      <TouchableOpacity onPress={handleReturn} style={styles.button2}><Text style={styles.textButton}>voltar</Text></TouchableOpacity>

        <TouchableOpacity onPress={handleNext} style={styles.button}><Text style={styles.textButton}>confirmar</Text></TouchableOpacity>
      </View>
      </React.Fragment>
    )}
    function navegar(){
  setTimeout(function(){ navigation.navigate('Login'); },100)
}
    return (
      <KeyboardAvoidingView
      behavior="padding"
      enabled={true}
      style={styles.container}
      >
    <Image source={logo} style={styles.logo}/>
          {name.length==0? textname():
           senha.length==0? textSenha():
           bio.length==0? textBio():
           avatar.length==0? textAvatar():
           gostos.length==0? textGostos():
           navegar()
           }
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding:30,
  },
  input:{
    height:46,
    alignSelf:'stretch',
    backgroundColor: '#FFF',
    borderWidth:0.1,
    borderRadius:4,
    borderColor:'#f0f0f5',
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
  button2:{
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
  }
});
