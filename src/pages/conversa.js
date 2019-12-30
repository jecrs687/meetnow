import React, {useEffect, useState} from 'react';
import api from '../services/api';
import {TextInput,Text, View, Image,StyleSheet,KeyboardAvoidingView,ScrollView,TouchableOpacity, AsyncStorage} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as firebase from  'firebase';
import { GiftedChat } from 'react-native-gifted-chat';


export default function Conversa({navigation}){  
    const [user,setUser]=useState({})
    const [text,setText]=useState('')
    const [messages, setMessager] = useState([])
    const [id, setId] = useState(firebase.auth().currentUser.uid);
   
    navigationOptions = ({ navigation }) => ({
      title: navigation.state.params.id});
    

  function ref() {
    return firebase.database().ref('messages/testando');
  }

  parse = snapshot => {
    console.log(snapshot.val());
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  on = callback =>
    ref()
      .limitToLast(20)
      .on('child_added', snapshot => snapshot? callback(parse(snapshot)): null);

  function timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  useEffect(on(),[])
  // send the message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp:timestamp(),
      };
      setMessager(previousState => (GiftedChat.append(previousState, messages)))
    }
  };

  append = message => ref().push(message);

  // close the connection to the Backend

  
    useEffect(()=>{
      firebase.database().ref('/users/'+id).on('value', function (snapshot){
        var {name, bio,  user,gosto, desgosto, avatar, fotos} = snapshot.toJSON(); 
        setUser({
            avatar:avatar ,
            name: name,
            bio: bio,
            user: user,
            gosto: gosto,
            desgosto: desgosto,

        });
        })
    },[])
  


      /*function abrirConversa(nome){
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
    if(id == name){
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
       
    }*/
    
    async function handleReturn(){
      await AsyncStorage.removeItem('conversaName');
      navigation.navigate('listConversas');
    };





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
      <GiftedChat
        messages={messages}
        onSend={send}
        user={this.user}
      />
      
      {/*    <ScrollView style={styles.mensagens} invertStickyHeaders={true} 
          ref={ref => this.scrollView = ref}
          onContentSizeChange={(contentWidth, contentHeight)=>{        
              this.scrollView.scrollToEnd({animated: false});
          }}
      >
          {user.name!=null? 
          list.map(({mensagem, id}, index)=>loadMensagens({mensagem,  name:id}, index)):null}
      </ScrollView>*/}

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
      flex:1,
      justifyContent:'space-between'
    },

      mensagens:{
        backgroundColor:'white',
        top:0,
        bottom:0,
        left:0,
        flex:1,
        right:0,
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
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

