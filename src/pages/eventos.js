import React,{useEffect} from 'react';
import {SafeAreaView, Text, View, Image,StyleSheet,ScrollView,TouchableOpacity, AsyncStorage, Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function eventos({navigation}){  

    const list = [
        
        {
            name: 'Carcachopaça',
            avatar_url: 'https://www.olharconceito.com.br/imgsite/noticias/selfie1.png',
            subtitle: 'rola ou enrola?'
          },
          {
            name: 'festa',
            avatar_url: 'https://blog.emania.com.br/content/uploads/2019/07/fotografo-capta-imagem-incrivel-do-eclipse-solar-no-chile-Blog-eMania-03-07.jpg',
            subtitle: 'bicho, nem te conto'
          },
          {
            name: 'Note45',
            avatar_url: 'http://obviousmag.org/metamorfose_jovial/assets_c/2016/04/tumblr_m2w5kjIRgX1qg2xooo1_500_large-thumb-800x532-146142.png',
            subtitle: 'sendo sincero, gosto muito de ******!'
          },
          {
            name: 'IsaacRamos1',
            avatar_url: 'http://www.fotoswiki.org/Uploads/fotoswiki.org/ImagensGrandes/festas.jpg',
            subtitle: 'bora comer coxinha?'
          },
          {
            name: 'Node-23',
            avatar_url: 'https://www.girai.com.br/wp-content/uploads/2019/07/gop-tun-festa_930x560_acf_cropped.jpg',
            subtitle: 'rola ou enrola?'
          },
          {
            name: 'TiagoTR',
            avatar_url: 'https://www.diariodoiguacu.com.br/static/img/colunas/banner-baladas,-shows-e-festas.jpg',
            subtitle: 'bicho, nem te conto'
          },
          {
            name: 'Note45',
            avatar_url: 'http://obviousmag.org/metamorfose_jovial/assets_c/2016/04/tumblr_m2w5kjIRgX1qg2xooo1_500_large-thumb-800x532-146142.png',
            subtitle: 'sendo sincero, gosto muito de ******!'
          },
          {
            name: 'IsaacRamos1',
            avatar_url: 'http://www.fotoswiki.org/Uploads/fotoswiki.org/ImagensGrandes/festas.jpg',
            subtitle: 'bora comer coxinha?'
          },
          {
            name: 'Node-23',
            avatar_url: 'https://www.girai.com.br/wp-content/uploads/2019/07/gop-tun-festa_930x560_acf_cropped.jpg',
            subtitle: 'rola ou enrola?'
          },
          {
            name: 'TiagoTR',
            avatar_url: 'https://www.diariodoiguacu.com.br/static/img/colunas/banner-baladas,-shows-e-festas.jpg',
            subtitle: 'bicho, nem te conto'
          },
          {
            name: 'Note45',
            avatar_url: 'http://obviousmag.org/metamorfose_jovial/assets_c/2016/04/tumblr_m2w5kjIRgX1qg2xooo1_500_large-thumb-800x532-146142.png',
            subtitle: 'sendo sincero, gosto muito de ******!'
          },
          {
            name: 'IsaacRamos1',
            avatar_url: 'http://www.fotoswiki.org/Uploads/fotoswiki.org/ImagensGrandes/festas.jpg',
            subtitle: 'bora comer coxinha?'
          },

          
      ]
     async function abrirConversa({nome}){
        AsyncStorage.setItem('conversaName', nome);
        navigation.navigate('Conversa');
    }
    useEffect(()=>{
        AsyncStorage.getItem('conversaName').then(conversaName=>{
          if(conversaName!=null){navigation.navigate('Conversa');}
    }
    )
      }, [])
    return(

    <SafeAreaView style={{paddingTop:30, backgroundColor:"#FFFFFF"}}>
        <ScrollView >

        {list.map(({name, avatar_url, subtitle}, index)=>(
            <View style={styles.containerConversa} key={index}>
                <Image style={styles.avatar}  source={{uri: avatar_url}}></Image>
                <Text style={styles.name}>{name}</Text>
                <View style={styles.foot}>
                <Text style={styles.mensagem}>{subtitle}</Text>
                <TouchableOpacity  style={styles.button} onPress={()=>{abrirConversa({nome:name})}}/>

                </View>
                <Ionicons name="ios-arrow-forward" size={25} color="#AAA" />
            </View>
        ))}
      </ScrollView>

    </SafeAreaView>
    );
}
const styles = StyleSheet.create(
    {   containerConversa:{
        borderColor:'#ffcce0',
        borderWidth:0,
        marginVertical:50,
        flex:1,
        alignSelf:'stretch',
        overflow:'hidden',
        height:250,
        right:0,
        width:Dimensions.get('window').width,
        left:0,
        

    },
    button:{     
    borderTopColor:'#BBB',
    borderTopWidth:0.4,  
},
        avatar:{
          alignSelf:'center',
          height:Dimensions.get('window').width,
          width:Dimensions.get('window').width,
          marginHorizontal:50,
        },
        foot:{
            flex:1,
            alignSelf:'center',
            flexDirection:'column'
        },
        name:{
          zIndex:1,
          position:'absolute',
          height:Dimensions.get('window').width,
          width:Dimensions.get('window').width,
          alignContent:'flex-end',
          top:-100,
          color:'white',
          fontWeight:'bold',
          fontSize:30,
          elevation:4,
          textShadowColor:'#444',
          textShadowRadius:3,
          textShadowOffset:{
              width:0,
              height:4,
          },
          transform:[{ rotate: '-90deg'}, {perspective:1000}],
        },
        mensagem:{
            color:'#AAA',
            fontSize:12,
        },
    });

