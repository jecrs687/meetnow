import React from 'react';
import { StyleSheet, Text, View, YellowBox} from 'react-native';
import Routes from './src/routes';
import * as firebase from  'firebase';

YellowBox.ignoreWarnings(['Setting a timer'])
console.ignoredYellowBox = ['Setting a timer'];
console.ignoredYellowBox = ['Setting a timer'];
console.ignoredYellowBox = ['Setting a timer'];

export default function App() {

  return (
    <Routes/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
