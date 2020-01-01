import React,{useState, useEffect} from 'react';
import {PanResponder,AsyncStorage,View,Text,SafeAreaView, Image, StyleSheet, TouchableOpacity, Dimensions,StatusBar, ScrollView} from 'react-native';
import logo from '../assets/logo.png';
import { Ionicons,FontAwesome} from '@expo/vector-icons';
import * as firebase from  'firebase';
import {UserCard} from '../components/UserCard'

var width=Dimensions.get('window').width;
var height=Dimensions.get('window').height;


export default function Curtir({navigation}){
    const [uid, setUId] = useState('');
    const [users, setUsers] = useState([]);
    const [matchDev, setMatchDev] = useState(false);
    const [refresh, setRefresh] = useState(false);

    async function handleLogout(){
        await AsyncStorage.clear();
        navigation.navigate('Login')

    }

/*useEffect(() => {
    const socket = io('https://3333-dd6b7fb5-abc4-4ba7-b023-707e208dfee8.ws-us02.gitpod.io/', { 
        query: {
            user: id
        }
    })
    socket.on('match', dev => {
        setMatchDev(dev)
    })
}, [id])*/
    useEffect(()=>{
        AsyncStorage.getItem('id').then(id=>{
            setUId(id);
        })
        /*AsyncStorage.getItem('user').then(user=>{
            loadUsers(user);
      }
      )
                AsyncStorage.getItem('user').then(user=>{
                    if(user){setId(user);}
            }
            )
        const response = await api.get('/devs', {
            headers:{
                user:id,
            }
            
        })*/
        firebase.database().ref('/users').on('value', function (snapshot){
            var users=[];            
            snapshot.forEach(function(childSnapshot){
                const retorno = childSnapshot.toJSON();
                /*firebase.storage().ref('/users/profile').child(retorno['_id']+'.jpg').getDownloadURL().then(
                    url=>{
                        firebase.database().ref('/users/'+retorno['_id']).child('avatar').push(url)
                    }
                );*/
                
                users.push(retorno);

            });

            setUsers(users)
        });
        
        //setUsers(response.data);
        
    
    }, []);

    
    function match(){
        return(
                matchDev && (
                <View style={styles.matchContainer}>
                    <View style={styles.matchImage}>
                        <Text style={{fontSize:20, color:'#ddd', fontWeight:'bold'}}>Deu match!!!</Text>
                    </View>
                    <Image style={styles.matchAvatar} source={{ uri: matchDev.avatar}} />
                    <Text style={styles.matchName}>{matchDev.name}</Text>
                    <Text style={styles.matchBio}>{matchDev.bio}</Text>
                    
                    <TouchableOpacity onPress={() => setMatchDev(false)}>
                        <Text style={styles.closeMatch}>Fechar</Text>
                    </TouchableOpacity>
                </View> ) 
        )
    }



    function listUsers(){
       return( 
        users.map((user,index)=>(
            <UserCard key={index} user={user} handle={()=>{setRefresh(!refresh);}} handledeslike={(id)=>{handledeslike(id)}} isFlipped={true} />
        )))
    }

    /*async function abrirPerfil(){
       navigation.push('Perfil', users[0]._id); 
    }*/

    async function handledeslike(id){
    
        console.log(id)
        
        console.log(users.findIndex(this._id=id))
        const[user, ... rest] = users;
        
        setUsers(rest)
        /*await api.post(`/devs/${user._id}/deslike`,null,{
            headers:{user:id}
        })*/
        }
    
    async function handlelike(){
        
    const[user, ... rest] = users;
    setUsers(rest)
    /*await api.post(`/devs/${user._id}/like`,null,{
        headers:{user:id}
    })*/
    }
    
    return(
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="blue" barStyle="light-content" />
        <View style={styles.topContainer}>
            <TouchableOpacity onPress={handleLogout} style={styles.icon}>
                    <Ionicons name="ios-log-out" size={30} color="#AAA" />
            </TouchableOpacity>
            <Image source={logo} style={styles.logo}/>
        </View>
        <View style={styles.cardsContainer}>
        <ScrollView>
        {users.length>0?
        listUsers()
        :<Text style={styles.empty}>acabou :(</Text>}
        </ScrollView>
            {match()}
            </View>
    </SafeAreaView>
    );
}
const styles = StyleSheet.create(
    {   
    topContainer:{
        backgroundColor:'#FFFFFF',
        flexDirection:'row-reverse',
        justifyContent:'space-between',
        alignItems:'center',
        alignContent:'center',
        width: width,
        marginBottom:5,
        height:60,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    logo:{
        alignSelf:'stretch',
        marginTop:5,
        height:45,
        marginHorizontal:20,
        width:105,
    },
    icon:{
        marginHorizontal:20,
        marginTop:5,
        height:45,
        width:50,
        alignItems:'flex-end',
        justifyContent:'flex-end',
        
    },
        container:{
            flex: 1,
            backgroundColor:'#fdfdfd',
            alignItems:'center',
            justifyContent:'space-between'
        },

        empty:{
            alignSelf: 'center',
            color:'#999',
            fontSize:24,
            fontWeight:'bold',
        },
        cardsContainer:{
            flex:1,
            alignSelf:'stretch',
            justifyContent:'center',
        },
        card:{
            
            borderWidth:0,
            borderColor:'#DDD',
            borderTopLeftRadius:2,
            borderTopRightRadius:40,
            borderBottomLeftRadius:40,
            borderBottomRightRadius:40,
            marginBottom:40,
            backgroundColor:'#FFFFFF',
            marginHorizontal:20,
            top:0,
            bottom:0,
            left:0,
            right:0,
            shadowColor: "#000",
            shadowOffset: {
                width: 4,
                height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,
            
            elevation: 9,

        },
        avatar:{
            height:40,
            width:40,
            borderRadius:20,
            marginRight:10,

        },
        fotosContainer:{
            alignSelf:'center',
            alignItems:'center',
            alignContent:'center',
            shadowColor: "#000",
            shadowOpacity: 0.32,
            shadowRadius: 5.46,
            elevation: 9,
            shadowOffset: {
                width: 4,
                height: 4,
            },
        },
        fotoContainer:{
            backgroundColor:'white',
            shadowColor: "#000",
            shadowOpacity: 0.32,
            position:'absolute',
            shadowRadius: 5.46,
            elevation: 9,
            shadowOffset: {
                width: 4,
                height: 4,
            },
        },
        foto:{
            alignSelf: 'center',
            height: height/2.4,
            width: width/1.5,
        },
        footer:{
            paddingHorizontal:20,
            paddingVertical:15, 
            marginBottom:10,
        },
        name:{
            fontSize:16,
            fontWeight:'bold',
            color:'#333',
        },
        bio:{

            fontSize:14,
            color:'#999',
            padding:10,
            lineHeight:18
        },
        buttonsContainer:{
            flexDirection:'row',
            marginBottom:5
        },
        button:{
            maxHeight:50,
            maxWidth:50,
            padding:10,
            borderRadius:200,
            justifyContent:'center',
            alignItems:'center',
            marginHorizontal:20,
        },
        matchContainer: {
            zIndex:100,
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0,0,0,0.8)',
            justifyContent: 'center',
            alignItems: 'center'
        },
    
        matchImage: {
            height: 60,
            resizeMode: 'contain'
        },
    
        matchAvatar: {
            width: 160,
            height: 160,
            borderRadius: 80,
            borderWidth: 5,
            borderColor: '#FFF',
            marginVertical: 30
        },
    
        matchName: {
            fontSize: 26,
            fontWeight: 'bold',
            color: '#FFF'
        },
    
        matchBio: {
            marginTop: 10,
            fontSize: 16,
            color: 'rgba(255,255,255,0.8)',
            lineHeight: 24,
            textAlign: 'center',
            paddingHorizontal: 30
        },
    
        closeMatch: {
            backgroundColor:'red',
            fontSize: 16,
            color: 'rgba(255,255,255,0.8)',
            textAlign: 'center',
            marginTop: 30,
            fontWeight: 'bold'
        }
    }
)