import React, {Component} from 'react';
import { View, Text,ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';

class InitialScreen extends Component {

  constructor(props) {
      super(props);
  };

  componentDidMount() {
    let user = auth().currentUser && auth().currentUser.uid || null;
    console.log(user);
    if(user){
      this.props.navigation.navigate('Bottom Tab Component')
    }else{
      this.props.navigation.navigate('Login');
    }
  }

  render() {
      return (
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <ActivityIndicator size={21} color={'#FFFFFF'} />
        </View>
      )
  };

}

export default InitialScreen;
