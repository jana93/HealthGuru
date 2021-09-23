import * as React from 'react';
import { View, Text,TouchableOpacity,StyleSheet,Image } from 'react-native';
import {FONT_FAMILY,SCREEN_HEIGHT, SCREEN_WIDTH} from '../utils/Enum';

const ExerciseCardView = ({data,index,navigation}) =>  {

  return (
    <TouchableOpacity
      style={[styles.cardView]}
      //onPress={() =>navigation.navigate('MedicineDetails', {medicineDetails:data})}
      //key={index}
    >

      <View style={styles.noImageBackground}>
        <Image source={{uri:data.gifUrl}} style={styles.noImage} />
      </View>

      <View style={{width:SCREEN_WIDTH-24-80-20}}>
        <View style={{paddingRight:5}}>
          <Text style={styles.mainTitle}>{data.name}</Text>
        </View>
        <Text style={styles.subTitle}>Equipment : {data.equipment}</Text>
        <Text style={styles.subTitle}>Body Part : {data.bodyPart}</Text>
      </View>

    </TouchableOpacity>
  );
}

export default ExerciseCardView;

const styles = StyleSheet.create({
    cardView: {
      elevation: 2,
      shadowColor: '#EDEDED',
      shadowOpacity: 1,
      shadowRadius: 8,
      shadowOffset: {width: 0, height: 2},
      marginHorizontal: 12,
      marginVertical: 5,
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
      alignSelf: 'stretch',
      flexDirection: 'row',
      alignItems:'center',
      paddingRight:5,
    },
    noImageBackground: {
        margin: 10,
        width:80,
        height:80,
        backgroundColor:'#FFFFFF',
        borderRadius:8,
        opacity: 0.5,
        borderColor:'#707070',
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center'
    },
    noImage:{
        //left:11.5,
        //top:16,
        width:75,
        height:75,
        //tintColor:'#3eb16e',
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
        fontSize: 15,
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
