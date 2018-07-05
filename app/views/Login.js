import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Alert,
    AsyncStorage
} from 'react-native';
import axios from 'axios';

export const LoginContext = React.createContext();

export class Login extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loggedIn: false
        };
    };

    cancelLogin = () => {
        Alert.alert('Login cancelled');
        this.props.navigation.navigate('HomeRT');
    };

    loginUser = () => {

        if (!this.state.username) {
            Alert.alert('Please enter a username')
        }
        else if (!this.state.password) {
            Alert.alert('Please enter a password')
        }
        else {

            AsyncStorage.getItem('jwt_token', (err, result) => {

                if (result !== 'none') {
                    AsyncStorage.setItem('jwt_token', '', (err, result) => {
                       
                    });
                }

                    axios.post("http://localhost:8080/api/login", {
                        username: this.state.username,
                        password: this.state.password
                    })
                        .then((response) => {
                                AsyncStorage.setItem('jwt_token', response.data.token, (err, result) => {
                                    Alert.alert(`${this.state.username} Logged in`);
                                    this.props.navigation.navigate('HomeRT');
                                });
                                this.state.loggedIn = true;
                        })
                        .catch((error) => {
                            console.log(error);
                            this.cancelLogin();
                        });
                

            })

        }

    }

    render() {
        return (
            <LoginContext.Provider value={this.state}>
            <View style={styles.container}>
                <Text style={styles.heading}>Login</Text>

                <TextInput
                    style={styles.inputs}
                    onChangeText={(text) => this.setState({ username: text })}
                    value={this.state.username}
                />
                <Text style={styles.label}>Enter Username</Text>

                <TextInput
                    style={styles.inputs}
                    onChangeText={(text) => this.setState({ password: text })}
                    value={this.state.password}
                    secureTextEntry={true}
                />
                <Text style={styles.label}>Enter Password</Text>

                <TouchableHighlight onPress={this.loginUser} underlayColor='#31e981'>
                    <Text style={styles.buttons}>
                        Login
                            </Text>
                </TouchableHighlight>

                <TouchableHighlight onPress={this.cancelLogin} underlayColor='#31e981'>
                    <Text style={styles.buttons}>
                        Cancel
                            </Text>
                </TouchableHighlight>

            </View>
            </LoginContext.Provider>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: '45%',
        paddingTop: '10%'
    },
    heading: {
        fontSize: 16,
        flex: 1
    },
    inputs: {
        flex: 1,
        width: '80%',
        padding: 10
    },
    buttons: {
        marginTop: 15,
        fontSize: 16
    },
    labels: {
        paddingBottom: 10
    }
});
