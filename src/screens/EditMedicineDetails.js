import React from "react";
import {
    Dimensions,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    View,
    BackHandler,
    Switch,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    ScrollView,
    TextInput
} from "react-native";

import MedicineCardView from "../components/MedicineCardView";
import CALENDAR_IMAGE from "../assets/clock.png";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {FONT_FAMILY,SCREEN_HEIGHT, SCREEN_WIDTH} from '../utils/Enum';
import {store} from '../store/index';

const PILL_IMAGE = require('../assets/capsule.png');
const BOTTLE_IMAGE = require('../assets/bottle.png');
const TABLET_IMAGE = require('../assets/pill.png');
const SYRINGE_IMAGE = require('../assets/injection.png');

class MedicineList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            medicineName:'',
            medicineNameError:'',
            medicineType:'',
            medicineTypeError:'',
            dosage:'',
            dosageError:'',
            dosageInterval:'',
            dosageIntervalError:'',
            startTime:'',
            startTimeError:'',


        };
    }

    componentDidMount(){
      console.log(this.props.route.params.medicineDetails);
      console.log(this.props.route.params.index);
      this.setState({
        medicineName: this.props.route.params.medicineDetails.medicineName,
        dosage:this.props.route.params.medicineDetails.dosage,
        medicineType:this.props.route.params.medicineDetails.medicineType,
        dosageInterval:this.props.route.params.medicineDetails.dosageInterval,
        startTime:this.props.route.params.medicineDetails.startTime,
      })
    };


    addMedicine(){

      let medicineDetails = {
        medicineName: this.state.medicineName,
        dosage:this.state.dosage,
        medicineType:this.state.medicineType,
        dosageInterval:this.state.dosageInterval,
        startTime:this.state.startTime ? this.convertTimeTo12HrFormat(this.state.startTime) : 'NA',
      }
      console.log(medicineDetails)
      store.dispatch({type: 'UPDATE_MEDICINE', medicineDetails: medicineDetails,index:this.props.route.params.index});
      console.log(store.getState());
      this.props.navigation.navigate('MedicineTab')
    };

    convertTimeTo12HrFormat(time){
      console.log(time);
      if(!(time instanceof Date)){
        return time;
      };
      let h = time.getHours() % 12 || 12;
      h = (h < 10)?("0"+h):h;  // leading 0 at the left for 1 digit hours
      let m = time.getMinutes();
      m = (m < 10)?("0"+m):m;
      let ampm = (time.getHours() < 12 || time.getHours() === 24) ? "AM" : "PM";
      let t = h + ':' + m + ' ' + ampm;
      console.log(t);
      return t;
    }

    render() {
      return(
        <View style={{backgroundColor: '#FFFFFF',flex: 1}}>
          <StatusBar
            backgroundColor="#FAFAFA"
            barStyle="dark-content"
          />

          <ScrollView style={styles.container}>

                <Text style={[styles.fieldLabel, {marginTop: 12}]}>Medicine Name</Text>
                <TextInput
                  returnKeyType='next'
                  value={this.state.medicineName}
                  onChangeText={(text) => {this.setState({medicineName:text,medicineNameError:''})}}
                  //blurOnSubmit={false}
                  //onSubmitEditing={() => {medicineTypeRef.focus()}}
                  //onBlur={() => {isSubmitted && groupName === '' && setGroupNameErr('Group name is required');}}
                  placeholder='Enter medicine name'
                  style={[styles.inputField, this.state.medicineNameError !== '' && styles.errorBorder]}
                  //ref={(input) => {medicineNameRef = input;}}
                  />
                  {this.state.medicineNameError !== '' && <Text style={styles.error}>{this.state.medicineNameError}</Text>}


                  <Text style={[styles.fieldLabel, {marginTop: 12}]}>Medicine Dosage (in mg)</Text>
                  <TextInput
                    returnKeyType='next'
                    value={this.state.dosage}
                    onChangeText={(text) => {this.setState({dosage:text,dosageError:''})}}
                    //blurOnSubmit={false}
                    //onSubmitEditing={() => {medicineTypeRef.focus()}}
                    //onBlur={() => {isSubmitted && groupName === '' && setGroupNameErr('Group name is required');}}
                    placeholder='Enter medicine dosage'
                    style={[styles.inputField, this.state.dosageError !== '' && styles.errorBorder]}
                    //ref={(input) => {medicineNameRef = input;}}
                    />
                    {this.state.dosageError !== '' && <Text style={styles.error}>{this.state.dosageError}</Text>}


                    <Text style={[styles.fieldLabel, {marginTop: 12}]}>Medicine Type</Text>
                    <View style={styles.typeContainer}>

                    <TouchableOpacity
                      style={[styles.noImageBackground,{backgroundColor:this.state.medicineType === 'BOTTLE' ?'#e4e8e3':'white'}]}
                      onPress={()=>this.setState({medicineType:'BOTTLE'})}
                    >
                      <Image source={BOTTLE_IMAGE} style={styles.noImage} />
                      <Text style={styles.medicineTypeText}>Bottle</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.noImageBackground,{backgroundColor:this.state.medicineType === 'PILL' ?'#e4e8e3':'white'}]}
                      onPress={()=>this.setState({medicineType:'PILL'})}
                    >
                      <Image source={PILL_IMAGE} style={styles.noImage} />
                      <Text style={styles.medicineTypeText}>Pill</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.noImageBackground,{backgroundColor:this.state.medicineType === 'SYRINGE' ? '#e4e8e3':'white'}]}
                      onPress={()=>this.setState({medicineType:'SYRINGE'})}
                    >
                      <Image source={SYRINGE_IMAGE} style={styles.noImage} />
                      <Text style={styles.medicineTypeText}>Syringe</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.noImageBackground,{backgroundColor:this.state.medicineType === 'TABLET' ? '#e4e8e3':'white'}]}
                      onPress={()=>this.setState({medicineType:'TABLET'})}
                    >
                      <Image source={TABLET_IMAGE} style={styles.noImage} />
                      <Text style={styles.medicineTypeText}>Tablet</Text>
                    </TouchableOpacity>

                    </View>
                      {this.state.dosageError !== '' && <Text style={styles.error}>{this.state.dosageError}</Text>}



                      <Text style={[styles.fieldLabel, {marginTop: 12}]}>Start Time</Text>
                      <TouchableOpacity
                        style={styles.timePicker}
                        onPress={() => this.setState({isDatePickerVisible:true})}
                      >
                        <Text style={styles.startTimeText}>
                          {this.state.startTime ? this.convertTimeTo12HrFormat(this.state.startTime)  : 'Select start time'}
                        </Text>
                        <Image source={CALENDAR_IMAGE} style={{height:18,width:18}} />

                      </TouchableOpacity>

                      <DateTimePickerModal
                        isVisible={this.state.isDatePickerVisible}
                        mode="time"
                        onConfirm={(date) =>this.setState({startTime:new Date(date), isDatePickerVisible:false})}
                        onCancel={() =>this.setState({isDatePickerVisible:false})}
                      />


                      <Text style={[styles.fieldLabel, {marginTop: 12}]}>Medicine Interval (in Hours)</Text>
                      <TextInput
                        returnKeyType='done'
                        value={this.state.dosageInterval}
                        onChangeText={(text) => {this.setState({dosageInterval:text,dosageIntervalError:''})}}
                        //blurOnSubmit={false}
                        //onSubmitEditing={() => {medicineTypeRef.focus()}}
                        //onBlur={() => {isSubmitted && groupName === '' && setGroupNameErr('Group name is required');}}
                        placeholder='Enter medicine interval'
                        style={[styles.inputField, this.state.dosageIntervalError !== '' && styles.errorBorder]}
                        //ref={(input) => {medicineNameRef = input;}}
                        keyboardType='numeric'
                        />
                        {this.state.dosageIntervalError !== '' && <Text style={styles.error}>{this.state.dosageIntervalError}</Text>}

          </ScrollView>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => this.addMedicine()}
            >
              <Text style={styles.nextText}>SAVE</Text>
            </TouchableOpacity>

        </View>
      );
    }

};

export default MedicineList;

const styles = StyleSheet.create({
  container: {
      paddingHorizontal: 20,
  },
  activityIndicator: {
        position: 'absolute',
        left: 0, right: 0, top: 0, bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
  },
  fieldLabel: {
        color: '#707070',
        //fontFamily: FONT_FAMILY.REGULAR,
        fontSize: 16 / 810 * SCREEN_HEIGHT,
        marginBottom: 4 / 810 * SCREEN_HEIGHT,
        marginTop: 12 / 810 * SCREEN_HEIGHT,
    },
    inputField: {
        paddingLeft: 16,
        fontSize: 16 / 810 * SCREEN_HEIGHT,
        borderWidth: 0.75,
        borderColor: '#3F44511F',
        borderRadius: 4,
        height: 50 / 810 * SCREEN_HEIGHT,
        //fontFamily: FONT_FAMILY.REGULAR,
        color: '#707070',
        opacity: 0.75,
    },
    inputFieldMulti: {
        marginBottom: 0,
        paddingLeft: 16,
        // fontSize: 16 / 810 * SCREEN_HEIGHT,
        borderWidth: 0.75,
        borderRadius: 4,
        height: 49 / 810 * SCREEN_HEIGHT,
        // fontFamily: FONT_FAMILY.REGULAR,
        // color: '#707070',
        opacity: 0.75,
    },
    nextText: {
        //fontFamily: FONT_FAMILY.SEMI_BOLD,
        fontSize: 14 / 640 * SCREEN_HEIGHT,
        color: '#FFFFFF',
    },
    nextButton: {
        backgroundColor: '#22C674',
        alignItems: 'center',
        height: 40 / 640 * SCREEN_HEIGHT,
        justifyContent: 'center',
        marginVertical: 12 / 810 * SCREEN_HEIGHT,
        borderRadius: 4,
        marginHorizontal: 20,
    },
    activityIndicator: {
        position: 'absolute',
        left: 0, right: 0, top: 0, bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    error: {
        color: '#FF7A7A',
        marginLeft: 16,
        fontSize: 11 / 640 * SCREEN_HEIGHT,
        //fontFamily: FONT_FAMILY.REGULAR,
    },
    errorBorder: {
        borderColor: '#FF7A7A',
    },
    dropdown: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        height: 50 / 810 * SCREEN_HEIGHT,
        borderRadius: 4,
        borderWidth: 0.75,
        borderColor: '#3F44511F',
        justifyContent: 'center',
    },
    dropdown_dropdown: {
        width: SCREEN_WIDTH - 40,
        height: 75,
        borderColor: '#F0F0F1',
        borderWidth: 1,
        borderRadius: 5,
        elevation: 3,
    },
    dropdown_row: {
        height: 35,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    dropdown_row_text: {
        //fontFamily: FONT_FAMILY.REGULAR,
        paddingHorizontal: 16,
        fontSize: 16 / 810 * SCREEN_HEIGHT,
        color: '#707070',
        textAlignVertical: 'center',
        opacity: 0.75,
    },
    dropdownImage: {
        marginLeft: -20 / 810 * SCREEN_HEIGHT - 12,
        height: 20 / 810 * SCREEN_HEIGHT,
        width: 20 / 810 * SCREEN_HEIGHT,
        borderRadius: 10,
        backgroundColor: '#EDEDED',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dropdown_separator: {
        height: 1,
        backgroundColor: '#F0F0F1',
    },
    dropdown_text: {
        //fontFamily: FONT_FAMILY.REGULAR,
        textAlign: 'left',
        textAlignVertical: 'center',
        fontSize: 16 / 810 * SCREEN_HEIGHT,
        paddingHorizontal: 16,
        color: '#707070',
        opacity: 0.75,
    },
    timePicker:{
      alignItems: 'center',
      borderRadius: 4,
      borderWidth: 0.75,
      borderColor: '#3F44511F',
      height: 50 / 810 * SCREEN_HEIGHT,
      flexDirection: 'row',
      paddingLeft: 16,
      paddingRight: 12,
    },
    startTimeText:{
      fontFamily: FONT_FAMILY.REGULAR,
      color: '#707070',
      opacity: 0.75,
      flex: 1,
      fontSize: 16 / 810 * SCREEN_HEIGHT,
    },
    typeContainer:{
      //backgroundColor:'red',
      alignSelf:'stretch',
      flexDirection:'row'
    },
    noImageBackground: {
        width: (SCREEN_WIDTH - 40)/4,
        height:(SCREEN_WIDTH - 40)/4,
        alignItems:'center',
        justifyContent:'center',
        //opacity:0.5,
        borderRadius:8
    },
    noImage:{
        width:45,
        height:45,
        tintColor:'#3eb16e'
    },
    medicineTypeText:{
      color:'#3eb16e'
    }
});
