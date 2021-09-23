import * as React from 'react';
import { View, Text,TouchableOpacity,StyleSheet,Image } from 'react-native';

const PILL_IMAGE = require('../assets/capsule.png');
const BOTTLE_IMAGE = require('../assets/bottle.png');
const TABLET_IMAGE = require('../assets/pill.png');
const SYRINGE_IMAGE = require('../assets/injection.png');

import DELETE_IMAGE from "../assets/delete.png";
import EDIT_IMAGE from "../assets/edit.png";

const MedicineCardView = ({data,index,navigation,deleteMedicine}) =>  {

  return (
    <TouchableOpacity
      style={[styles.cardView, { justifyContent: 'center'}]}
      onPress={() =>{
        console.log(index);
        navigation.navigate('MedicineDetails', {medicineDetails:data,index:index})
      }}
      key={index}
    >
    <View style={{flexDirection: 'row',alignItems:'center'}}>
      <View style={styles.noImageBackground}>
        <Image source={data.medicineType == "PILL" ? PILL_IMAGE : data.medicineType == "BOTTLE" ? BOTTLE_IMAGE : data.medicineType == "TABLET" ?
            TABLET_IMAGE : SYRINGE_IMAGE} style={styles.noImage} />
      </View>
      <View style={{flexDirection:'column'}}>
      <Text style={styles.mainTitle}>{data.medicineName}</Text>
      <Text style={styles.subTitle}>Every {data.dosageInterval} hours</Text>
      <Text style={styles.subTitle}>Start Time : {data.startTime}</Text>
      </View>
      <View style={{position:'absolute',right:5, top:5, flexDirection:'row'}}>
        <TouchableOpacity
          hitSlop={{top: 10, right:5, bottom: 20, left: 20}}
          style={styles.addButton}
          onPress={() =>navigation.navigate('EditMedicineDetails', {medicineDetails:data,index:index})}
        >
          <Image source={EDIT_IMAGE} style={{height:18,width:18}} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>deleteMedicine(data,index)}
          hitSlop={{top: 10, right:20, bottom: 20, left: 5}}
        >
          <Image source={DELETE_IMAGE } style={{height:18,width:14/16 * 18}} />
        </TouchableOpacity>
      </View>
    </View>
    </TouchableOpacity>
  );
}

export default MedicineCardView;

const styles = StyleSheet.create({
    cardView: {
      elevation: 8,
      shadowColor: '#EDEDED',
      shadowOpacity: 1,
      shadowRadius: 8,
      shadowOffset: {width: 0, height: 2},
      marginHorizontal: 12,
      marginVertical: 5,
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
      alignSelf: 'stretch',
      borderWidth:0.5,
      borderColor:'#EDEDED'
    },
    noImageBackground: {
        alignItems:'center',
        justifyContent:'center',
        margin: 10,
        width:80,
        height:80,
        backgroundColor:'#FFFFFF',
        borderRadius:8,
        //opacity: 0.5,
        borderColor:'#707070',
        borderWidth:1,
    },
    noImage:{
        width:55,
        height:55,
        tintColor:'#3eb16e'
    },
    addButton: {
        justifyContent: 'flex-end',
        elevation: 0,
        borderRadius: 5,
        backgroundColor: 'white',
        marginRight:10,
        marginTop:3,
    },
    mainTitle:{
        fontSize: 18,
        color: 'black',
        fontFamily:'Poppins-SemiBold',
    },
    subTitle:{
        fontSize: 13,
        color: 'gray',
        marginLeft:0,
        fontFamily:'Poppins-Regular'
    },
  });
