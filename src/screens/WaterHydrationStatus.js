import React from 'react';
import {View, StyleSheet, Dimensions,StatusBar,Text,Image,TouchableOpacity,TextInput} from "react-native";
import {AnimatedCircularProgress} from "react-native-circular-progress";
import {FONT_FAMILY,SCREEN_HEIGHT, SCREEN_WIDTH} from '../utils/Enum';
import Modal from "react-native-modal";

import * as Actions from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import store from '../store/index';

const CUP_IMAGE = require('../assets/coffee-cup.png');
const BOTTLE_IMAGE = require('../assets/water-bottle.png');
const CUSTOM_IMAGE = require('../assets/graduated-cylinder.png');
const GLASS_IMAGE = require('../assets/water-glass.png');

class WaterHydrationStatus extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          waterLevel:0,
          percentage:0,
          totalWaterTarget:2000,
          tempTotalWaterTarget:0,
          isWaterIntakeOverlayVisible:false,
      };
  }

  drinkWater(waterAmount){
    let newWaterLevel = this.state.waterLevel + waterAmount;
    let newPercentage = Math.round ((newWaterLevel / this.state.totalWaterTarget )* 100)
    this.setState({waterLevel : newWaterLevel,percentage:newPercentage});
  }

  setDailyWaterIntakeAmount(){
    let newPercentage = Math.round ((this.state.waterLevel / this.state.tempTotalWaterTarget )* 100)
    this.setState({totalWaterTarget:this.state.tempTotalWaterTarget, percentage:newPercentage,isWaterIntakeOverlayVisible:false});
  }


  toggleWaterIntakeModal = () => {
    this.setState({isWaterIntakeOverlayVisible:!this.state.isWaterIntakeOverlayVisible})
  }

  renderWaterIntakeSettingsModal(){
    return(
      <Modal
        isVisible={this.state.isWaterIntakeOverlayVisible}
        animationIn="slideInLeft"
        animationOut="slideOutRight"
        backdropOpacity={0.6}
        style={{alignSelf: 'stretch', marginHorizontal: 15, padding: 0}}
        onBackdropPress={() => this.toggleWaterIntakeModal()}
        onBackButtonPress={() => this.toggleWaterIntakeModal()}// Android back button only
      >
        <View style={styles.modal}>
          <Text style={styles.modalText}>Daily Water Intake Amount(in ml)</Text>
          <TextInput
            returnKeyType='done'
            value={this.state.tempTotalWaterTarget.toString()}
            onChangeText={(text) => {this.setState({tempTotalWaterTarget:text,totalWaterTargetError:''})}}
            placeholder='Enter Daily Water Intake'
            style={[styles.inputField, this.state.totalWaterTargetError !== '' && styles.errorBorder]}
            keyboardType='numeric'
          />
          {this.state.totalWaterTargetError !== '' && <Text style={styles.error}>{this.state.totalWaterTargetError}</Text>}

          <View style={{flexDirection:'row'}}>

            <TouchableOpacity
              style={styles.disableButton}
              onPress={() =>  this.toggleWaterIntakeModal()}
            >
              <Text style={{fontSize: 12,  fontFamily: 'Poppins-Regular', color: '#FF4343'}}> CANCEL</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() =>  this.setDailyWaterIntakeAmount()}
            >
              <Text style={{fontSize: 12, fontFamily: 'Poppins-Regular' , color: '#FFFFFF'}}>SET</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    )
  }

  render() {
    return(
      <View style={{flex: 1,backgroundColor:'FAFAFA',alignItems:'center'}}>
        <StatusBar
          backgroundColor="#FAFAFA"
          barStyle="dark-content"
        />

        <View style={{marginTop:10}}>
          <Text style={[styles.waterTargetText,{fontSize:18}]}> Current Hydration</Text>
        </View>


        <View style={styles.content}>
              <AnimatedCircularProgress
                    style={styles.progress}
                    size={245}
                    width={32}
                    rotation={0.25}
                    arcSweepAngle={360}
                    fill={this.state.percentage}
                    tintColor="#2176FF"
                    backgroundColor="#3eb16e"
                    onAnimationComplete={() => console.log('onAnimationComplete')}
                    childrenContainerStyle={styles.circle}
                    children={
                        () => (
                            <View style={{alignItems: 'center', }}>
                                <Text style={styles.waterLevelText}>{ this.state.waterLevel } ml</Text>
                                <Text style={styles.percentageText}>{this.state.percentage} %</Text>
                            </View>
                        )
                    }
                />
        </View>

        <View style={{marginBottom:10}}>
          <Text style={styles.waterTargetText}> Drink Water </Text>
        </View>

        <View style={styles.typeContainer}>

        <TouchableOpacity
          style={[styles.noImageBackground]}
          onPress={()=>this.drinkWater(180)}
        >
          <Image source={CUP_IMAGE} style={styles.noImage} />
          <Text style={styles.medicineTypeText}>180 ml</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.noImageBackground]}
          onPress={()=>this.drinkWater(250)}
        >
          <Image source={GLASS_IMAGE} style={styles.noImage} />
          <Text style={styles.medicineTypeText}>250 ml</Text>
        </TouchableOpacity>

        </View>

        <View style={styles.typeContainer}>

        <TouchableOpacity
          style={[styles.noImageBackground]}
          onPress={()=>this.drinkWater(500)}
        >
          <Image source={BOTTLE_IMAGE} style={styles.noImage} />
          <Text style={styles.medicineTypeText}>500 ml</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.noImageBackground]}
          onPress={()=>this.drinkWater(100)}
        >
          <Image source={CUSTOM_IMAGE} style={styles.noImage} />
          <Text style={styles.medicineTypeText}>custom</Text>
        </TouchableOpacity>

        </View>

        <TouchableOpacity
          style={styles.waterTargetTextContainer}
          onPress={()=>this.toggleWaterIntakeModal()}
        >
          <Text style={styles.waterTargetText}> Water Target : {this.state.totalWaterTarget} ml</Text>
        </TouchableOpacity>

        {this.renderWaterIntakeSettingsModal()}


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

export default connect(mapStateToProps, mapDispatchToProps)(WaterHydrationStatus);

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
      padding:8,
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
        flex:1,
        height:75,
        alignItems:'center',
        justifyContent:'center',
        //opacity:0.5,
        borderRadius:8,
        backgroundColor:'#98ff98',
        marginHorizontal:10
    },
    noImage:{
        width:40,
        height:40,
        tintColor:'black'
    },
    medicineTypeText:{
      color:'#3eb16e'
    },
    percentageText:{
      fontSize: 20,
      color: 'black',
      fontFamily:'Poppins-Regular',
    },
    waterLevelText:{
      fontSize: 22,
      color: 'black',
      fontFamily:'Poppins-Regular',
    },
    modal: {
      backgroundColor: "#FFFFFF",
      justifyContent: "center",
      borderRadius: 5,
      margin:0,
      width: SCREEN_WIDTH - 40,
      paddingHorizontal:10,
      paddingVertical:15,
    },
    modalText:{
      color: '#707070',
      fontSize: 16,
      fontFamily:'Poppins-Regular',
    },
    inputField: {
        paddingLeft: 16,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#3F44511F',
        borderRadius: 4,
        height: 50,
        color: '#707070',
        opacity: 0.75,
    },
    disableButton: {
        flex:1,
        borderColor: '#FF4343',
        borderWidth:2,
        backgroundColor:'white',
        borderRadius: 4,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        marginHorizontal: 16,
        marginVertical: 8,
        marginBottom: 10,
    },
    confirmButton: {
        flex:1,
        backgroundColor: '#3eb16e',
        opacity: 1,
        borderRadius: 4,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        marginHorizontal: 16,
        marginVertical: 8,
        marginBottom: 10,
    },
});
