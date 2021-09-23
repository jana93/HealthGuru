import React, {Component} from 'react';
import {
    ActivityIndicator,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {NavigationActions, StackActions} from "react-navigation";
import CheckBox from '@react-native-community/checkbox';
import auth from '@react-native-firebase/auth';

import * as Actions from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import LOGO_IMAGE from "../assets/logo1.png";
import SHOW_PASSWORD_IMAGE from "../assets/visibility.png";
import HIDE_PASSWORD_IMAGE from "../assets/visibility_off.png";

import {FONT_FAMILY,SCREEN_HEIGHT, SCREEN_WIDTH} from '../utils/Enum';

class Login extends Component {

    constructor(props) {
        super(props);
        this.initialState = {
            loading: false,
            errorUserName: '',
            errorPassword: '',
            username: '',
            password: '',
            checked: true,
        };
        this.state = this.initialState;
        this.login = this.login.bind(this);
    }

    async login() {
        Keyboard.dismiss();
        let userName = this.state.username.trim();
        let password = this.state.password.trim();
        if (userName.length === 0) {
            this.setState({errorUserName: 'Username is required'});
        }
        if (password.length === 0) {
            this.setState({errorPassword: 'Password is required'});
        }
        if (userName.length > 0 && password.length > 0) {
            this.setState({loading: true});

            const response = await auth().signInWithEmailAndPassword(userName, password);
            console.log(response);

            setTimeout(()=>{
              this.setState({loading:false,username:'',password:'',});
              this.props.navigation.navigate('Bottom Tab Component')
            },2000)
        }
    };

    render() {
        return (
            <KeyboardAvoidingView style={{height: '100%'}}>
                <ScrollView contentContainerStyle={styles.container}>
                    <StatusBar
                        backgroundColor="#E0E0E0"
                        barStyle="dark-content"/>
                    <View style={styles.logoContainer}>
                        <Image
                            source={LOGO_IMAGE}
                            style={{height:(SCREEN_WIDTH-60)*447/1201 ,width:SCREEN_WIDTH-60,}}
                        />
                    </View>
                    <Text style={styles.textLabel}>Username</Text>
                    <View
                        style={[styles.textInputContainer, this.state.errorUserName !== '' && {borderColor: '#FF7A7A'}]}>
                        <TextInput
                            style={styles.textInputStyle}
                            placeholder='Enter username'
                            placeholderTextColor='gray'
                            underlineColorAndroid='transparent'
                            ref={(el) => {
                                this.usernameInputRef = el;
                            }}
                            onChangeText={(username) => {
                                this.setState({username: username, errorUserName: '', responseError: ''})
                            }}
                            onSubmitEditing={() => this.passwordInputRef.focus()}
                            value={this.state.username}
                            returnKeyType='next'
                        />
                    </View>
                    <Text style={styles.errorMsg}>{this.state.errorUserName}</Text>

                    <Text style={[styles.textLabel]}>Password</Text>
                    <View
                        style={[styles.textInputContainer, this.state.errorPassword !== '' && {borderColor: '#FF7A7A'}]}>
                        <TextInput
                            style={styles.textInputStyle}
                            placeholder='Enter password'
                            placeholderTextColor='gray'
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.setState({
                                password: text,
                                errorPassword: '',
                                responseError: ''
                            })}
                            onSubmitEditing={() => this.login()}
                            ref={(el) => {
                                this.passwordInputRef = el
                            }}
                            returnKeyType='done'
                            value={this.state.password}
                            secureTextEntry={!this.state.isPasswordVisible}
                            onFocus={() => this.setState({showPasswordVisibilityIcon: true})}
                        />

                        <TouchableOpacity
                            style={{justifyContent: 'center', paddingVertical: 5}}
                            onPress={() => this.setState({isPasswordVisible: !this.state.isPasswordVisible})}>
                            <Image
                                source={this.state.showPasswordVisibilityIcon ? this.state.isPasswordVisible ? SHOW_PASSWORD_IMAGE : HIDE_PASSWORD_IMAGE : null}
                                style={{width: 20, height: 20, tintColor: 'gray', marginHorizontal: 5}}/>
                        </TouchableOpacity>

                    </View>
                    <Text style={styles.errorMsg}>{this.state.errorPassword}</Text>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: SCREEN_WIDTH * 0.9,
                        marginBottom: 15,
                        paddingRight: 10,
                        paddingLeft: 5
                    }}>

                        <View style={{flexDirection: 'row'}}>
                            {
                                Platform.OS === 'ios' ?
                                    <CheckBox style={styles.checkboxLogin}
                                              value={this.state.checked}
                                              tintColors={{ true: 'blue' }}
                                              onValueChange={() => this.setState({checked: !this.state.checked})}
                                              onFillColor={'#FFFFFF'}
                                              onCheckColor={'#336666'}
                                              boxType={'square'}
                                              onTintColor={'#FFFFFF'}
                                              tintColor={'#F5F6F8'}
                                              animationDuration={0.3}
                                    />
                                    :
                                    <CheckBox
                                      style={{elevation: 2,borderRadius: 6}}
                                      value={this.state.checked}
                                      onValueChange={() => this.setState({checked: !this.state.checked})}
                                    />
                            }

                            <Text
                                style={{
                                    color: 'gray',
                                    fontSize: 14,
                                    marginTop: 6,
                                    fontFamily: 'Poppins-Regular',
                                    marginLeft: 5
                                }}
                                onPress={() => this.setState({checked: !this.state.checked})}
                            >
                                Remember me
                            </Text>

                        </View>
                        <Text
                            style={{color: '#037FF2', fontSize: 14, marginTop: 6, fontFamily: 'Poppins-Regular'}}
                            onPress={() => {
                                this.props.navigation.navigate('ForgotPassword');
                                this.setState(this.initialState);
                            }}
                        >
                            Forgot Password
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={this.login}
                    >
                        {this.state.loading ?
                          <ActivityIndicator size={21} color={'#FFFFFF'} animating={this.state.loading}/>
                          :
                          <Text style={{fontSize: 14, fontFamily: 'Poppins-Medium', color: '#FFFFFF'}}>LOGIN</Text>
                        }
                    </TouchableOpacity>

                    <Text
                        style={{color: 'gray',position:'absolute', bottom:5, alignSelf:'center' ,fontSize: 14, marginTop: 6, fontFamily: 'Poppins-Regular'}}
                        onPress={() => {
                            this.props.navigation.navigate('SignUp');
                            this.setState(this.initialState);
                        }}
                    >
                        Don't have an account? Create one
                    </Text>

                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        //
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F6F8',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        paddingHorizontal: SCREEN_WIDTH * 0.05,
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    errorMsg: {
        color: '#FF7A7A',
        fontSize: 12,
        lineHeight: 18,
        fontFamily: 'Poppins-Regular',
        alignSelf: 'flex-start',
        marginTop: 5,
        marginLeft: 16,
        flexDirection: 'row'
    },
    loginButton: {
        width: SCREEN_WIDTH * 0.9,
        backgroundColor: '#336666',
        borderRadius: 4,
        opacity: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    textLabel: {
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        alignSelf: 'flex-start',
        margin: 5,
    },
    textInputStyle: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 16,
    },
    textInputContainer: {
        height: 44,
        width: SCREEN_WIDTH * 0.9,
        borderRadius: 4,
        borderWidth: 0.75,
        borderColor: '#3F44511F',
        backgroundColor: 'white',
        flexDirection: 'row'
    },
    checkboxLogin: {
        width: 22,
        height: 22,
        marginTop: 5,
        elevation: 2,
        shadowColor: '#EDEDED',
        shadowOpacity: 1,
        shadowRadius: 8,
        shadowOffset: {width: 0, height: 2},
        borderRadius: 6
    },
});
