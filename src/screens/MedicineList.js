import React from "react";
import {
    Image,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Alert,
} from "react-native";

import MedicineCardView from "../components/MedicineCardView";
import PLUS_IMAGE from "../assets/plus.png";
import firestore from '@react-native-firebase/firestore';

import * as Actions from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {store} from '../store/index';

class MedicineList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading:false,
        };
    }

    componentDidMount(){
      this.getMedicine();
    };

    getMedicine(){
      firestore().collection("MedicineReminders").get().then(function(snapshot) {
        let medicineList = [];
        snapshot.forEach(function(childSnapshot) {
          let id = childSnapshot.id;
          let data = childSnapshot.data();
          medicineList.push({
            id: id,
            medicineName:data.medicineName,
            medicineType:data.medicineType,
            dosage:data.dosage,
            dosageInterval:data.dosageInterval,
            startTime:data.startTime,
          });
        });
        console.log(medicineList);
        store.dispatch({type: 'GET_MEDICINE_LIST', medicineDetails: medicineList});
      });
    };

    deleteMedicine = (data,index) => {
      console.log(index)
      Alert.alert(
      "Delete Medicine",
      "Do you want to delete this medicine?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => {
          store.dispatch({type: 'DELETE_MEDICINE', deleteIndex:index });
        } }
      ]
    );
    }

    renderMedicineCard(data, index) {
        return (
            <MedicineCardView
                data={data}
                index={index}
                navigation={this.props.navigation}
                deleteMedicine={this.deleteMedicine}
            />
        );
    }

    render() {
      return(
        <View style={{flex: 1,backgroundColor:'FAFAFA'}}>
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
              {this.props.medicineList.length === 0 ?
                <View style={styles.container}>
                  <Text style={{fontSize: 16, color: '#000000', fontFamily: 'Poppins-Medium'}}>There are no medicines, please add</Text>
                </View>
                :
                <View style={{flex: 1}}>
                  <FlatList
                    data={this.props.medicineList}
                    renderItem={({item, index}) => this.renderMedicineCard(item, index)}
                    keyExtractor={(item,index) => index}
                  />
                </View>
              }

            </View>
          }

          <TouchableOpacity
            style={styles.addButton}
            onPress = {()=> this.props.navigation.navigate('AddMedicine')}
          >
            <Image source={PLUS_IMAGE} style={{height:21,width:21,tintColor:'white'}} />
          </TouchableOpacity>
        </View>
      );
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicineList);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        bottom: 0, top: 0, right: 0, left: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addButton:{
      position:'absolute',
      bottom:10,
      right:10,
      height:60,
      width:60,
      borderRadius:30,
      backgroundColor:'#3eb16e',
      elevation:5,
      alignItems:'center',
      justifyContent:'center'

    },
    activityIndicator: {
        position: 'absolute',
        left: 0, right: 0, top: 0, bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    }
});
