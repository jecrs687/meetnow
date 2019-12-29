import React, {useEffect, useState} from 'react';
import api from '../services/api';
import {TextInput,Text, View, Image,StyleSheet,KeyboardAvoidingView,ScrollView,TouchableOpacity, AsyncStorage} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function Conversa({navigation}){  
    const [user,setUser]=useState({})
    const [text,setText]=useState('')

    const list = [
        
      {
          name: 'null',
          mensagem: 'oi',
        },
        {
          name: 'Node-23',
          mensagem: 'oi',
        },
        {
          name: 'null',
          mensagem: 'tudo bem?',
        },
        {
          name: 'Node-23',
          mensagem: 'tudo e contingo?',
        },
        {
          name: 'null',
          mensagem: 'tudo bem, tá quente esses dias, né?',
        },        {
          name: 'Node-23',
          mensagem: 'sim, normal em teresina',
        },
        {
          name: 'null',
          mensagem: 'verdade',
        },{
          name: 'null',
          mensagem: 'oi',
        },
        {
          name: 'Node-23',
          mensagem: 'oi',
        },
        {
          name: 'null',
          mensagem: 'tudo bem?',
        },
        {
          name: 'Node-23',
          mensagem: 'tudo e contingo?',
        },
        {
          name: 'null',
          mensagem: 'tudo bem, tá quente esses dias, né?',
        },        {
          name: 'Node-23',
          mensagem: 'sim, normal em teresina',
        },
        {
          name: 'null',
          mensagem: 'verdade',
        },{
          name: 'null',
          mensagem: 'oi',
        },
        {
          name: 'Node-23',
          mensagem: 'oi',
        },
        {
          name: 'null',
          mensagem: 'tudo bem?',
        },
        {
          name: 'Node-23',
          mensagem: 'tudo e contingo?',
        },
        {
          name: 'null',
          mensagem: 'tudo bem, tá quente esses dias, né?',
        },        {
          name: 'Node-23',
          mensagem: 'sim, normal em teresina',
        },
        {
          name: 'null',
          mensagem: 'verdade',
        },
      ]
    function abrirConversa(nome){
        AsyncStorage.setItem('conversaName', nome);
    }
    useEffect(()=>{
      AsyncStorage.getItem('conversaName').then(conversaName=>{
        if(conversaName!=null){
          loadUser(conversaName)
        }else{
          navigation.navigate('Conversas')
        }     
  }
  )},[])
  function loadMensagens({mensagem, name}, index){
    if(name == user.user){
              return(
              <View key={index} style={styles.mensagem}>
              <Text style={styles.textMensagem}>{mensagem}</Text>
              <Text style={styles.horaMensagem}>11:20</Text>

            </View>
            )
          }else{
            return(
              <View key={index} style={styles.mensagemContra}>
              <Text style={styles.textMensagem}>{mensagem}</Text>
              <Text style={styles.horaMensagem}>11:20</Text>

            </View>
            )}
  }
  async function loadUser(nome){

    const response  =await api.post('/devs', {username: nome});
       setUser(response.data)
       
    }
    async function handleReturn(){
      await AsyncStorage.removeItem('conversaName');
      navigation.navigate('listConversas');
    }
    return(

      <View style={styles.container}>
              <View style={styles.topBar}>

              <View style={styles.topBarItens}>
        <TouchableOpacity onPress={handleReturn} style={styles.buttonReturn}>
            <Ionicons name="ios-arrow-back" size={25} color="#AAA" />
        </TouchableOpacity>
      { user.name!=null?     (<React.Fragment>

        <Image source={{uri: user.avatar}} style={styles.avatar}/>
      <View>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.user}>{user.user}</Text>
      </View>
      </React.Fragment>):null}
      </View>
      </View>
      <KeyboardAvoidingView
      behavior="padding"
      enabled={true}
      style={styles.containerSobe}
      >
      <ScrollView style={styles.mensagens} invertStickyHeaders={true} 
          ref={ref => this.scrollView = ref}
          onContentSizeChange={(contentWidth, contentHeight)=>{        
              this.scrollView.scrollToEnd({animated: false});
          }}
      >
          {user.name!=null? 
          list.map(({mensagem, name}, index)=>loadMensagens({mensagem,  name}, index)):null}
      </ScrollView>
    <View style={styles.entrada}>
    <TextInput
    placeholder='menssagem'
    autoCapitalize="none"
    autoCorrect={false}
    value={text}
    onChangeText={setText}
    style={styles.input} />
        <TouchableOpacity style={styles.button}>
        <Ionicons name="ios-send" size={40} color="#AAA" styles={styles.icon} />
    </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
    </View>
    
    );
}
const styles = StyleSheet.create(
    { container:{
      flex: 1,
      backgroundColor:'#f5f5f5',

  },
    containerSobe:{
      alignItems:'stretch',
      justifyContent:'space-between'
    },

      mensagens:{
      },
      mensagem:{
        minWidth:75,
        marginTop:5,
        marginBottom:5,
        marginHorizontal:10,
        backgroundColor:'#00ff00',
        marginLeft:50,
        borderTopLeftRadius:5,
        borderBottomEndRadius:10,
        alignItems:'flex-start',
        borderBottomStartRadius:10,
        alignSelf:'flex-end',
        padding:6,
      },
      mensagemContra:{
        marginTop:5,
        minWidth:75,
        alignItems:'flex-end',
        marginBottom:5,
        alignSelf:'flex-start',
        marginHorizontal:10,
        borderTopRightRadius:5,
        borderBottomEndRadius:10,
        borderBottomStartRadius:10,
        padding:6,
        marginRight:50,
        backgroundColor:'#00e600',
      },
      textMensagem:{
        marginHorizontal:8,
        fontSize:15,
        color:'#333',
      },
      horaMensagem:{
        marginHorizontal:8,
        fontSize:8,
        color:'#555',
      },
      topBar:{
        backgroundColor:'white',
        elevation:10,
        flexDirection:'row',
        alignItems:'center',
        height:100,
        shadowColor:'#000',
        shadowOpacity: 0.05,
        shadowRadius:2,
        shadowOffset:{
            width:0,
            height:2,
        },
    },
    topBarItens:{        
      flexDirection:'row',
      alignItems:'center',
      marginTop:25,
    },
    buttonReturn:{
      height:40,
      width:25,
      marginHorizontal:10,
    },
    entrada:{
      alignItems:'stretch',
      alignContent:'stretch',
      justifyContent:'space-between',
      padding:6,
      backgroundColor:'#DDD',
      flexDirection:'row',
    },
    input:{
      flex:5,
      height:46,
      backgroundColor: '#FFF',
      borderWidth:0.5,
      borderRadius:4,
      borderColor:'#f0f0f5',
      paddingHorizontal:15,
    },
    button:{    
      flex:1, 
      alignItems:'center',
      alignContent:'center',
      backgroundColor:'#DDd',
      },
        avatar:{
            marginRight:20,
            height:60,
            width:60,
            borderRadius:30,
        },
        foot:{
            flex:1,
            alignSelf:'center',
            flexDirection:'column'
        },
        name:{
            fontWeight:'bold',
            fontSize:16,

        },
        user:{

        },
    });

