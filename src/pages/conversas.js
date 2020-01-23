import React,{useEffect,useState} from 'react';
import {SafeAreaView, Text, View, Image,StyleSheet,ScrollView,TouchableOpacity, AsyncStorage} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import firebaseSvc from '../services/FirebaseSvc';



export default function Conversas({navigation}){  
  const [list, setList] = useState(false);

  useEffect(()=>{
     
    firebaseSvc.getConversas((retorno)=>{setList(retorno);})}     
    ,[])
     async function abrirConversa({id, name, avatar, nick,conversationId}){

        
      navigation.navigate('Conversa',{id: id, name:name, avatar:avatar, nick:nick, conversationId:conversationId});
    }
    
    
    return(

    <SafeAreaView style={{paddingTop:30}}>
                <ScrollView>

        {list && list.map(({name, avatar, nick, id,conversationId}, index)=>(
            <TouchableOpacity key={index} style={styles.button} onPress={()=>{abrirConversa({id, name, avatar, nick,conversationId})}}>
            <View style={styles.containerConversa}>
                <Image style={styles.avatar}  source={{uri: avatar, cache:'force-cache'}}/>
                <View style={styles.foot}>
                <Text style={styles.nome}>{name}</Text>
                <Text style={styles.mensagem}>{nick}</Text>
                </View>
                <Ionicons name="ios-arrow-forward" size={25} color="#AAA" />
            </View>
            </TouchableOpacity>
        ))}
                </ScrollView>

    </SafeAreaView>
    );
}
const styles = StyleSheet.create(
    {   containerConversa:{
        marginHorizontal:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        height:80,
    },
    button:{     
    borderTopColor:'#BBB',
    borderTopWidth:0.4,  
},
        avatar:{

            marginHorizontal:10,
            
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
        mensagem:{
            color:'#AAA',
            fontSize:12,
        },
    });

