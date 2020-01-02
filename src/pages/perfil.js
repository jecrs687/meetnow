import React,{useState, useEffect} from 'react';
import {AsyncStorage,View,Text,SafeAreaView, Image, StyleSheet, TouchableOpacity} from 'react-native';
import api from '../services/api';
import {Ionicons} from '@expo/vector-icons';
import  FirebaseSvc from    '../services/FirebaseSvc';

import { ScrollView } from 'react-native-gesture-handler';
export default function Curtir({navigation}){
    const [perfil, setPerfil] = useState({});
    const [avatar, setAvatar] = useState('https://d1bvpoagx8hqbg.cloudfront.net/259/eb0a9acaa2c314784949cc8772ca01b3.jpg');
    useEffect(()=>{
        FirebaseSvc.getPerfil((user)=>{setPerfil(user)})
    }, [])



    async function handleReturn(){
        navigation.navigate('Config')
    }

    function printPerfil({avatar, nome,bio,user, gosto, desgosto}){
        return(
            <React.Fragment>
                <Image source={{uri : avatar, cache:'default' }} style={styles.fundo}    blurRadius={3}/> 
                <TouchableOpacity onPress={handleReturn} style={styles.buttonReturn}>
                    <Ionicons name="ios-arrow-back" size={25} color="#AAA" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleReturn} style={styles.iconConfig}>
                    <Ionicons name="ios-settings" size={30} color="#AAA"/>
                </TouchableOpacity>
                <SafeAreaView style={styles.containerPerfil}>               
                    <Image source={{uri : avatar,cache:"default" }} style={styles.avatar}/>
                    <Text style={styles.nome}>{nome}</Text>
                    <Text style={styles.user}>{user}</Text>
                    <ScrollView>

                    <View style={styles.footBox}>
                    <Ionicons name="ios-bookmarks" size={25} color="#687" styles={styles.icon} />
                    <Text style={styles.bio}>{bio}</Text></View>
                    <View style={styles.footBox}>
                    <Ionicons name="ios-heart" size={25} color="#e33" styles={styles.icon} />
                    <Text style={styles.gostos}>{gosto}</Text>
                    </View>
                    <View style={styles.footBox}>
                    <Ionicons name="ios-heart-dislike" size={25} color="#1eee" styles={styles.icon} />
                    <Text style={styles.gostos}>{desgosto}</Text>
                    </View>
                    </ScrollView>

                </SafeAreaView>
            </React.Fragment>
        )
    }

    return(
    <View style={styles.container}>
        {printPerfil({avatar: perfil.avatar!=null? perfil.avatar:avatar, nome:perfil.name, bio:perfil.bio, user:perfil.email, gosto: perfil.gostos, desgosto: perfil.desgostos})}
    </View>
    );
}
const styles = StyleSheet.create(
    {   
        container:{

        },
        iconConfig:{
            justifyContent:'center',
            zIndex:3,
            position:'absolute',
            alignSelf:'flex-end',
            alignItems:'center',
            alignContent:'center',
            width:50,
            height:80,
            marginRight:40,
            marginTop:25,
        },
        fundo:{
            position:'absolute',
            zIndex:1,
            borderColor:'#EEE',
            borderWidth:2,
            height:200,
            width:'100%',
        },
        buttonReturn:{
            justifyContent:'center',
            zIndex:3,
            position:'absolute',
            alignSelf:'flex-start',
            alignItems:'center',
            alignContent:'center',
            width:50,
            height:80,
            marginRight:40,
            marginTop:25,
        },
        containerPerfil:{
            zIndex:2,
            position:'absolute',
            marginTop:150,
            marginLeft:10,
            width:'90%',
            },
        avatar:{     
            backgroundColor:'#eee',
            borderColor:'#FFF',
            borderWidth:3,
            height:100,
            width:100,
            borderRadius:50,
        },
        nome:{
            fontSize:16,
            fontWeight:'bold',
            fontStyle:'italic',
            color:'#444',
        },
        user:{
            fontSize:12,
            marginBottom:12,
        },
        icon:{
        alignSelf:'center',
        },
        footBox:{
            alignItems:'center',
            marginBottom:12, 
            flexDirection:'row',
        },
        bio:{
            margin:20,
            elevation:2,
            shadowColor:'#000',
            shadowOpacity: 0.05,
            shadowRadius:2,
            shadowOffset:{
                width:0,
                height:2,
            },
            
        },

        gostos:{
            margin:20,
        },


    }
)