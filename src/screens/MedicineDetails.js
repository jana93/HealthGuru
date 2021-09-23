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
    ActivityIndicator
} from "react-native";
import MedicineCardView from "../components/MedicineCardView";
import * as Actions from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

class MedicineDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          medicineDetails:null,
        };
    }

    componentDidMount(){
      console.log(this.props.route.params.medicineDetails);
      this.setState({medicineDetails:this.props.route.params.medicineDetails})
    }


    render() {
      return(
        <View style={{flex: 1,backgroundColor:'#FAFAFA'}}>
          <StatusBar
            backgroundColor="#FAFAFA"
            barStyle="dark-content"
          />

          <Text style={styles.textLabel}>Medicine Name</Text>
          <Text style={styles.textInput}>{this.state.medicineDetails ? this.state.medicineDetails.medicineName : 'NA'}</Text>

          <Text style={styles.textLabel}>Dosage</Text>
          <Text style={styles.textInput}>{this.state.medicineDetails ? this.state.medicineDetails.dosage : 'NA'}</Text>

          <Text style={styles.textLabel}>Medicine Type</Text>
          <Text style={styles.textInput}>{this.state.medicineDetails ? this.state.medicineDetails.medicineType : 'NA'}</Text>

          <Text style={styles.textLabel}>Dosage Interval</Text>
          <Text style={styles.textInput}>{this.state.medicineDetails ? this.state.medicineDetails.dosageInterval : 'NA'}</Text>

          <Text style={styles.textLabel}>Start Time</Text>
          <Text style={styles.textInput}>{this.state.medicineDetails ? this.state.medicineDetails.startTime : 'NA'}</Text>

        </View>
      );
    }

};

export default MedicineDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        bottom: 0, top: 0, right: 0, left: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    activityIndicator: {
        position: 'absolute',
        left: 0, right: 0, top: 0, bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    textLabel: {
        marginTop: 12,
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        marginLeft: 20,
        color: '#707070',
    },
    textInput: {
        alignSelf: 'stretch',
        backgroundColor: '#FAFAFA',
        marginTop: 10,
        color: '#707070',
        borderRadius: 5,
        borderWidth: 0,
        paddingTop: 10,
        paddingBottom:10,
        fontSize: 16,
        paddingHorizontal: 16,
        marginHorizontal: 16,
        paddingLeft:33,
        fontFamily: 'Poppins-Regular',
    },
});
