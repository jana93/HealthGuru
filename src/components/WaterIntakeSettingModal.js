import * as React from 'react';
import { View, Text,TouchableOpacity,StyleSheet,Image,TextInput } from 'react-native';
import Modal from "react-native-modal";
import {FONT_FAMILY,SCREEN_HEIGHT, SCREEN_WIDTH} from '../utils/Enum';

const WaterIntakeSettingsModal = ({navigation,isWaterIntakeOverlayVisible,toggleWaterIntakeModal}) =>  {

  return (
    <Modal
                isVisible={isWaterIntakeOverlayVisible}
                animationIn="slideInLeft"
                animationOut="slideOutRight"
                backdropOpacity={0.6}
                style={{alignSelf: 'stretch', marginHorizontal: 15, padding: 0}}
                onBackdropPress={() => toggleWaterIntakeModal()}
                onBackButtonPress={() => toggleWaterIntakeModal()}// Android back button only
            >
                <View style={styles.modal}>
                <Text style={[styles.fieldLabel, {marginTop: 12}]}>Medicine Dosage (in mg/ml)</Text>
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
                  keyboardType='numeric'
                  />
                  {this.state.dosageError !== '' && <Text style={styles.error}>{this.state.dosageError}</Text>}
                </View>
            </Modal>
  );
}

export default WaterIntakeSettingsModal;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    borderRadius: 5,
    margin:0,
    width: SCREEN_WIDTH - 40,
  },

  });
