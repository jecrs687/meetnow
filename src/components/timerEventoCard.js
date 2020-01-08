import React,{ Component } from 'react';
import { Text, StyleSheet, View} from 'react-native';
export class TimerEventocard extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      modalVisible:false,
      currentTime:this.props.date.getTime()-(new Date().getTime()),
      day:this.currentTime/(1000*60*60*24),
      hours:(this.day-(Math.round(this.day)))*60,
      minute:(this.hours-(Math.round(this.hours)))*60,
      second:(this.minute - (Math.round(this.minute)))*1000
    };
  }

  componentDidMount() {
  var dataEvento =  this.props.date.getTime();
   var currentTime = dataEvento-(new Date().getTime());
   var day=currentTime/(1000*60*60*24);
   var hours=(day-(Math.trunc(day)))*24;
   var minute=(hours-(Math.trunc(hours)))*60;
   var second=(minute - (Math.trunc(minute)))*60;
    this.setState({     
        day:Math.trunc(day),
        hours:Math.trunc(hours),
        minute:Math.trunc(minute),
        second:Math.trunc(second), });

    this.timer = setInterval(() => {
      currentTime =dataEvento - (new Date().getTime());
      day=currentTime/(1000*60*60*24);
      hours=(day-(Math.trunc(day)))*24;
      minute=(hours-(Math.trunc(hours)))*60;
      second=(minute - (Math.trunc(minute)))*60;
      this.setState({currentTime:currentTime,
        day:Math.trunc(day),
        hours:Math.trunc(hours),
        minute:Math.trunc(minute),
        second:Math.trunc(second), })
    }, 1000);
  }
  render() {
    return (
        <View style={styles.container}>
              <Text style={[styles.title, styles.text]}>Faltam</Text>
              <Text style={[styles.Days, styles.text]}>{this.state.day}</Text>
              <Text style={[styles.Hours, styles.text]}>{this.state.hours<10? '0'+this.state.hours:this.state.hours}</Text>
              <Text style={[styles.Minute, styles.text]}>{this.state.minute<10? '0'+this.state.minute:this.state.minute}</Text>
              <Text style={[styles.Second, styles.text]}>{this.state.second<10? '0'+this.state.second:this.state.second}</Text>
        </View>
    );
  }
}
const styles = StyleSheet.create(
    {   
      container:{
        borderColor:'white',
        borderWidth:10,
      },
      Days:{
      fontWeight:'bold',
      fontSize:20,
      
    },
    Hours:{
      fontWeight:'bold',
      fontSize:16,
      bottom:3,
    },
    Minute:{
      fontWeight:'bold',
      fontSize:14,
      bottom:6,
    },
    Second:{
      fontWeight:'bold',
      fontSize:7,
      bottom:8,
    },
    text:{
      alignSelf:'flex-start',
      justifyContent:'center',
      alignItems:'center',
      alignContent:'center',
      

      color:'#fff'
    },
        container:{
            flexDirection:'column',
        }
      });

