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
import auth from '@react-native-firebase/auth';

import * as Actions from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {store} from '../store/index';

import SHOW_PASSWORD_IMAGE from "../assets/visibility.png";
import HIDE_PASSWORD_IMAGE from "../assets/visibility_off.png";

import {FONT_FAMILY,SCREEN_HEIGHT, SCREEN_WIDTH} from '../utils/Enum';

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.initialState = {
            loading: false,
            errorUserName: '',
            errorPassword: '',
            errorEmail:'',
            username: '',
            password: '',
            email:'',
        };
        this.state = this.initialState;
        this.signUp = this.signUp.bind(this);
    }

    async signUp() {
        Keyboard.dismiss();
        let userName = this.state.username.trim();
        let password = this.state.password.trim();
        let email = this.state.email.trim();
        if (userName.length === 0) {
            this.setState({errorUserName: 'Full name is required'});
        }
        if (email.length === 0) {
            this.setState({errorEmail: 'Email is required'});
        }
        if (password.length === 0) {
            this.setState({errorPassword: 'Password is required'});
        }
        if (userName.length > 0 && password.length > 0 && email.length > 0) {
            this.setState({loading: true});

            const response = await auth().createUserWithEmailAndPassword(email, password);
            console.log(response);

            const user = {uid: response.user.uid,email: email}

                // db.collection('users')
                //     .doc(response.user.uid)
                //     .set(user)

            store.dispatch({ type: 'SIGNUP', user: user });

            setTimeout(()=>{
              this.setState({loading:false,username:'',password:'',email:''});
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

                    <View style={styles.avatarContainer}>
                        <Text style={styles.textHeading}>Create Account</Text>
                    </View>

                    <Text style={styles.textLabel}>Full Name</Text>
                    <View style={[styles.textInputContainer, this.state.errorUserName !== '' && {borderColor: '#FF7A7A'}]}>
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
                            onSubmitEditing={() => this.emailInputRef.focus()}
                            value={this.state.username}
                            returnKeyType='next'
                        />
                    </View>
                    <Text style={styles.errorMsg}>{this.state.errorUserName}</Text>

                    <Text style={styles.textLabel}>Email</Text>
                    <View style={[styles.textInputContainer, this.state.errorEmail !== '' && {borderColor: '#FF7A7A'}]}>
                        <TextInput
                            style={styles.textInputStyle}
                            placeholder='Enter email'
                            placeholderTextColor='gray'
                            underlineColorAndroid='transparent'
                            ref={(el) => {this.emailInputRef = el}}
                            onChangeText={(email) => {
                                this.setState({email:email, errorEmail: ''})
                            }}
                            onSubmitEditing={() => this.passwordInputRef.focus()}
                            value={this.state.email}
                            returnKeyType='next'
                        />
                    </View>
                    <Text style={styles.errorMsg}>{this.state.errorEmail}</Text>

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
                            onSubmitEditing={() => this.signUp()}
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

                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={this.signUp}
                    >
                        {
                            this.state.loading ?
                                <ActivityIndicator size={21} color={'#FFFFFF'} animating={this.state.loading}/>
                                :
                                <Text style={{fontSize: 14, fontFamily: 'Poppins-Medium', color: '#FFFFFF'}}>
                                    SIGNUP
                                </Text>
                        }

                    </TouchableOpacity>

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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F6F8',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        paddingHorizontal: SCREEN_WIDTH * 0.05,
    },
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    textHeading: {
        fontFamily: 'Poppins-Medium',
        fontSize: 28,
        color:'#336666'
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
        backgroundColor: '#336666',//'#22C674',
        borderRadius: 4,
        opacity: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        marginTop:5,
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

});
