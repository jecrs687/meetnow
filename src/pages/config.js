import React,{useState, useEffect} from 'react';
import {AsyncStorage,View,Text,SafeAreaView, Image, StyleSheet, TouchableOpacity} from 'react-native';
import api from '../services/api';
import {Ionicons} from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler';
import * as firebase from  'firebase';

export default function Curtir({navigation}){
    const [perfil, setPerfil] = useState({});
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [bio, setBio] = useState('');
    const [avatar, setAvatar] = useState('https://d1bvpoagx8hqbg.cloudfront.net/259/eb0a9acaa2c314784949cc8772ca01b3.jpg');
    const [gosto, setGosto] = useState('');
    const [desgosto, setDesgosto] = useState('');

    useEffect(()=>{

        /*async function loadUser(user){
            const response  =await api.post('/devs', {username: user});
                setPerfil(response.data)
            }
     AsyncStorage.getItem('name').then(name=>{
        loadUser(name)     
        });*/
    var cb;
    AsyncStorage.multiGet(['avatar', 'name','bio','user', 'gosto','desgosto']).then(function (item){            
        setPerfil({
        avatar:item[0][1] ,
        name: item[1][1],
        bio: item[2][1],
        user: item[3][1],
        gosto: item[4][1],
        desgosto: item[5][1],

    });});
    AsyncStorage.getItem('id').then(id=>{
        firebase.storage().ref('/users/profile').child(id+'.jpg').getDownloadURL().then(
            url=>{
                setAvatar(url);
                AsyncStorage.setItem('avatar',avatar);
            }
        )
        firebase.database().ref('/users/'+id).on('value', function (snapshot){
            var {name, bio,  user,gosto, desgosto} = snapshot.toJSON();
            
            AsyncStorage.multiSet([['avatar',avatar], ['name', name], ['bio', bio],['user', user],['gosto', gosto],['desgosto', desgosto]]);
            setPerfil({
                avatar:avatar ,
                name: name,
                bio: bio,
                user: user,
                gosto: gosto,
                desgosto: desgosto,
    
            });
            })
        });

        

    }, [avatar])


    async function handleReturn(){
        //await AsyncStorage.clear();
        navigation.navigate('perfilUser')
    }

    async function handleUpdate(){

    }

    /*async function abrirPerfil(){
       navigation.push('Perfil', users[0]._id);
    }*/
    
    function textname(){
        return (
        <React.Fragment>
        <TextInput 
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="usuário do instagram" 
        value={name}
        onChangeText={setName}
        style={styles.input}/>
        </React.Fragment>
        )}
    function textSenha(){
        return (
        <React.Fragment>
        <TextInput 
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="senha"
            textContentType='password'
            value={senha}
            onChangeText={setSenha}
            style={styles.input}/>
            </React.Fragment>
        )}
    function textBio(){
    return (
        <React.Fragment>
        <TextInput 
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Me fale um pouco sobre você" 
        value={bio}
        onChangeText={setBio}
        style={styles.inputGrande}/>

        </React.Fragment>
        )}
    function textAvatar(){
    return (
    <React.Fragment>
    <TextInput 
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Link de fotinha" 
        value={avatar}
        onChangeText={setAvatar}
        style={styles.input}/>
        </React.Fragment>
    )}
    function textGostos(){
    return (
        <React.Fragment>
        <TextInput 
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Quais são as coisas que você gosta e lhe atraem?" 
        value={gosto}
        onChangeText={setGosto}
        style={styles.inputGrande}/>
        </React.Fragment>
        )}
    function textGostos(){
        return (
        <React.Fragment>
        <TextInput 
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Quais são as coisas que você gosta e lhe atraem?" 
            value={gosto}
            onChangeText={setGosto}
            style={styles.inputGrande}/>
            </React.Fragment>
        )}
    function printPerfil({avatar, nome,bio,user, gosto, desgosto}){
        
        return(
            <React.Fragment>
                <TouchableOpacity onPress={handleReturn} style={styles.buttonReturn}>
                    <Ionicons name="ios-arrow-back" size={25} color="#AAA" />
                </TouchableOpacity>
                <SafeAreaView style={styles.containerPerfil}>               
                    <Image source={{uri : avatar}} style={styles.avatar}/>
                    <Text style={styles.nome}>{nome}</Text>
                    <Text style={styles.user}>{user}</Text>
                    <ScrollView>
                        <View style={styles.footBio}>
                            <Ionicons name="ios-bookmarks" size={25} color="#AAA" styles={styles.icon} />
                            <Text style={styles.bio}>{bio}</Text>
                        </View>
                        <View style={styles.footGostos}>
                            <Ionicons name="ios-heart" size={25} color="#AAA" styles={styles.icon} />
        <Text style={styles.gostos}>{gosto}</Text>
                        </View>
                        <View style={styles.footDesgostos}>
                            <Ionicons name="ios-heart-dislike" size={25} color="#AAA" styles={styles.icon} />
        <Text style={styles.gostos}>{desgosto}</Text>
                        </View>
                    </ScrollView>
                    
                    <TouchableOpacity onPress={handleUpdate} style={styles.button}>
                        <Text style={styles.textButton}>alterar</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </React.Fragment>
        )
    }
    return(
    <View style={styles.container}>
        {printPerfil({avatar: perfil.avatar, nome:perfil.name, bio:perfil.bio, user:perfil.user, gosto:perfil.gosto, desgosto:perfil.desgosto})}
        
    </View>
    );
}
const styles = StyleSheet.create(
    {   
        container:{

        },
          textButton:{
            fontStyle:'normal',
            fontWeight:'bold',
            fontSize:14,
            color:'white',
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
            alignSelf:'center',
            alignItems:'center',
            marginTop:80,
            width:'90%',
            },
        avatar:{     
            backgroundColor:'#eee',
            borderColor:'#FFF',
            borderWidth:3,
            borderWidth:3,
            height:150,
            width:150,
            borderRadius:75,
            shadowColor:'#000',
            shadowOpacity: 0.05,
            shadowRadius:2,
            shadowOffset:{
                width:0,
                height:2,
            },
            
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
        footBio:{
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
        footGostos:{
            marginBottom:12, 
            alignItems:'center',

            flexDirection:'row',
            justifyContent:'space-between',

        },
        footDesgostos:{
            marginBottom:12, 
            alignItems:'center',
            flexDirection:'row',
            justifyContent:'space-between',
        },
        gostos:{
            margin:20,
        },


    }
)