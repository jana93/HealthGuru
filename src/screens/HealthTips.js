import React from 'react';
import {View, StyleSheet, Dimensions,StatusBar,Text,Image,TouchableOpacity,FlatList,ActivityIndicator} from "react-native";
import {AnimatedCircularProgress} from "react-native-circular-progress";
import {FONT_FAMILY,SCREEN_HEIGHT, SCREEN_WIDTH} from '../utils/Enum';
import ExerciseCardView from "../components/ExerciseCard";

import * as Actions from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import store from '../store/index';

const CUP_IMAGE = require('../assets/coffee-cup.png');
const BOTTLE_IMAGE = require('../assets/water-bottle.png');
const CUSTOM_IMAGE = require('../assets/graduated-cylinder.png');
const GLASS_IMAGE = require('../assets/water-glass.png');

class HealthTips extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        loading:true,
        exerciseList:[],
      };
  }

  componentDidMount(){
    this.fetchExercise();
  }

  fetchExercise(){

    fetch("https://exercisedb.p.rapidapi.com/exercises/bodyPart/chest", {
	     "method": "GET",
	     "headers": {
		       "x-rapidapi-host": "exercisedb.p.rapidapi.com",
		       "x-rapidapi-key": "54c0302086mshd59370a7412d151p129ad1jsn741d25c75339"
	        }
    })
    .then( response => {
      response.json().then ((responseJson) => {
	       console.log(responseJson);
         this.setState({exerciseList:responseJson,loading:false})

// bodyPart: "chest"
// equipment: "body weight"
// gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/3294.gif"
// id: "3294"
// name: "archer push up"
// target: "pectorals"
       })
    })
    .catch(err => {
	     console.error(err);
     });

  };

  renderExerciseCard(data, index) {
      return (
          <ExerciseCardView
              data={data}
              index={index}
              navigation={this.props.navigation}
          />
      );
  }

  render() {
    return(
      <View style={{flex: 1,backgroundColor:'FAFAFA',alignItems:'center'}}>
        <StatusBar
          backgroundColor="#FAFAFA"
          barStyle="dark-content"
        />

        {this.state.loading ?
          <View style={styles.activityIndicator}>
             <ActivityIndicator size="large" />
          </View>
          :
          <View style={{flex: 1, backgroundColor: 'FAFAFA'}}>
            {this.state.exerciseList.length === 0 ?
              <View style={styles.container}>
                <Text style={{fontSize: 18, color: '#000000', fontFamily: 'Poppins-Medium'}}>No Data Available</Text>
              </View>
              :
              <View style={{flex: 1}}>

                  <FlatList
                    data={this.state.exerciseList}
                    renderItem={({item, index}) => this.renderExerciseCard(item, index)}
                    keyExtractor={(item,index) => index}
                  />

              </View>
            }

          </View>
        }

      </View>
    )
  }

};

function mapStateToProps(state, props) {
    return {
        medicineList: state.medicineReducer.medicineList,
        loading: state.medicineReducer.loading,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HealthTips);

const styles = StyleSheet.create({
    content: {
        //flex: 1,
        margin: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        //backgroundColor:'red'
    },
    circle: {
        width: 181,
        height: 181,
        borderRadius: 120,
        borderWidth: 5,
        backgroundColor: '#90ee90',
        borderColor: "#90ee90",
        // borderTopLeftRadius: 10,
        // borderBottomWidth: 10,
        // borderRightWidth: 10,
        //transform: [{ rotate: "45deg"}],
        shadowColor: "#000000",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.9,
        shadowRadius: 10.00,
        elevation: 10,
    },
    progress: {
        width: 264,
        height: 264,
        marginBottom: 10,
        borderRadius: 300,
        borderWidth: 10,
        borderColor: "transparent",
        overflow: 'hidden',
    },
    waterTargetText:{
          fontSize: 13,
          color: 'gray',
          marginLeft:0,
          fontFamily:'Poppins-Regular'
    },
    waterTargetTextContainer:{
      justifyContent:'center',
      backgroundColor:'#cfffcf',
      padding:5,
      borderRadius:10,
      //borderWidth:1,
      borderColor:'gray',
      elevation:5,
      marginTop:10
    },
    typeContainer:{
      //backgroundColor:'red',
      alignSelf:'stretch',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      marginBottom:10,
      marginHorizontal:10,

    },
    noImageBackground: {
        //width: (SCREEN_WIDTH - 40)/2-,
        //flex:1,
        height:75,
        alignItems:'center',
        justifyContent:'center',
        //opacity:0.5,
        borderRadius:8,
        backgroundColor:'#98ff98',
        marginHorizontal:10
    },
    noImage:{
        width:100,
        height:100,
        //tintColor:'gray'
    },
    medicineTypeText:{
      color:'#3eb16e'
    },
    activityIndicator: {
        position: 'absolute',
        left: 0, right: 0, top: 0, bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    }
});
