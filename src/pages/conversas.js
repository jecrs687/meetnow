import React,{useEffect} from 'react';
import {SafeAreaView, Text, View, Image,StyleSheet,ScrollView,TouchableOpacity, AsyncStorage} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function Conversas({navigation}){  

    const list = [
        
        {
          id:'18DcxytjOZOepNotEUccEo9sjV72',

            name: 'Node-23',
            avatar_url: 'https://avatars0.githubusercontent.com/u/54945311?v=4',
            subtitle: 'rola ou enrola?'
          },
          {
            id:'18DcxytjOZOepNotEUccEo9sjV72',

            name: 'TiagoTR',
            avatar_url: 'https://avatars2.githubusercontent.com/u/48908903?v=4',
            subtitle: 'bicho, nem te conto'
          },
          {
            id:'18DcxytjOZOepNotEUccEo9sjV72',

            name: 'Note45',
            avatar_url: 'https://avatars0.githubusercontent.com/u/41867280?v=4',
            subtitle: 'sendo sincero, gosto muito de ******!'
          },
          {
            name: 'IsaacRamos1',
            avatar_url: 'https://avatars3.githubusercontent.com/u/46172558?v=4',
            subtitle: 'bora comer coxinha?'
          },
          {
            name: 'Node-23',
            avatar_url: 'https://avatars0.githubusercontent.com/u/54945311?v=4',
            subtitle: 'rola ou enrola?'
          },
          {
            name: 'TiagoTR',
            avatar_url: 'https://avatars2.githubusercontent.com/u/48908903?v=4',
            subtitle: 'bicho, nem te conto'
          },
          {
            name: 'Note45',
            avatar_url: 'https://avatars0.githubusercontent.com/u/41867280?v=4',
            subtitle: 'sendo sincero, gosto muito de ******!'
          },
          {
            name: 'IsaacRamos1',
            avatar_url: 'https://avatars3.githubusercontent.com/u/46172558?v=4',
            subtitle: 'bora comer coxinha?'
          },
          {
            name: 'Node-23',
            avatar_url: 'https://avatars0.githubusercontent.com/u/54945311?v=4',
            subtitle: 'rola ou enrola?'
          },
          {
            name: 'TiagoTR',
            avatar_url: 'https://avatars2.githubusercontent.com/u/48908903?v=4',
            subtitle: 'bicho, nem te conto'
          },
          {
            name: 'Note45',
            avatar_url: 'https://avatars0.githubusercontent.com/u/41867280?v=4',
            subtitle: 'sendo sincero, gosto muito de ******!'
          },
          {
            id:'18DcxytjOZOepNotEUccEo9sjV72',
            name: 'IsaacRamos1',
            avatar_url: 'https://avatars3.githubusercontent.com/u/46172558?v=4',
            subtitle: 'bora comer coxinha?'
          },

          
      ]
     async function abrirConversa({id}){
      navigation.setParams({id: this.id})
      navigation.navigate('Conversa');
    }
    useEffect(()=>{
        AsyncStorage.getItem('conversaName').then(conversaName=>{
          if(conversaName!=null){navigation.navigate('Conversa');}
    }
    )
      }, [])
    return(

    <SafeAreaView style={{paddingTop:30}}>
                <ScrollView>

        {list.map(({name, avatar_url, subtitle, id}, index)=>(
            <TouchableOpacity key={index} style={styles.button} onPress={()=>{abrirConversa({id:id})}}>
            <View style={styles.containerConversa}>
                <Image style={styles.avatar}  source={{uri: avatar_url}}/>
                <View style={styles.foot}>
                <Text style={styles.nome}>{name}</Text>
                <Text style={styles.mensagem}>{subtitle}</Text>
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

