import React from 'react';
import {View,Text,SafeAreaView, Image, StyleSheet, TouchableOpacity,Dimensions} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import { ScrollView } from 'react-native-gesture-handler';
var height=Dimensions.get('window').height;

export class Perfil extends React.Component {
    constructor(props){
        super(props);
        this.state={
            avatar:'https://d1bvpoagx8hqbg.cloudfront.net/259/eb0a9acaa2c314784949cc8772ca01b3.jpg',
        }
    }
 

    printPerfil({avatar, nome,bio,user, gosto, desgosto}){
        return(
            <React.Fragment>
                <Image source={{uri : avatar, cache:'default' }} style={styles.fundo}    blurRadius={3}/> 
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
     user=()=>{
        return this.props.user;
    }
    render(){
    return(
    <View style={styles.container}>
        <TouchableOpacity onPress={this.props.fliper}>
        {this.printPerfil({avatar: this.user().avatar!=null? this.user().avatar:avatar, nome:this.user().name, bio:this.user().bio, user:this.user().email, gosto: this.user().gostos, desgosto: this.user().desgostos})}
        </TouchableOpacity>
    </View>)
    };
}
const styles = StyleSheet.create(
    {   
        container:{
            height:height-140,
            overflow:'hidden',
            borderTopLeftRadius:2,
            borderTopRightRadius:40,
            borderBottomLeftRadius:40,
            borderBottomRightRadius:40,

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
            height:150,
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
            marginTop:100,
            marginLeft:10,
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
            marginBottom:5, 
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