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
              <Text>{this.state.day}</Text>
              <Text>{this.state.hours}</Text>
              <Text>{this.state.minute}</Text>
              <Text>{this.state.second}</Text>
        </View>
    );
  }
}
const styles = StyleSheet.create(
    {   
        container:{
            flexDirection:'column',
        }
      });

