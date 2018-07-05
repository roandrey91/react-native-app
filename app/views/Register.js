import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    TouchableHighlight, 
    Alert, 
    AsyncStorage } from 'react-native';
import axios from 'axios';


export class Register extends React.Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = { 
            email: '',
            password: '',
            matchingPassword: '',
            firstName: '',
            lastName: ''
        };
    };

    cancelRegister = ()=>{
        Alert.alert('Registration cancelled');
        this.props.navigation.navigate('HomeRT');
    };

    registerAccount = ()=>{
        if ( !this.state.email ){
            Alert.alert('Please enter a email')
        }
        else if (this.state.password !== this.state.matchingPassword){
            Alert.alert('Passwords do not match')
        }
        else {
            axios.post("http://localhost:8080/api/user/registration", {
                
                 email: this.state.email,
                 password: this.state.password,
                 matchingPassword: this.state.matchingPassword,
                 firstName: this.state.firstName,
                 lastName: this.state.lastName
                } 
             ,)
             .then((response) => {
                AsyncStorage.setItem('jwt_token', response.data, (err, result) => {
                    Alert.alert(`${this.state.email} account created`);
                    this.props.navigation.navigate('HomeRT');
                });
             })
             .catch((error) => {
                 console.log(error);
                 this.cancelRegister();
             });  
        }

    }

    render() {
        return (
            <View style={styles.container}>
	            <Text style={styles.heading}>Register Account</Text>
                
                <TextInput 
                    style={styles.inputs} 
                    onChangeText={(text) => this.setState({email: text})}
                    value={this.state.email}
                />
                <Text style={styles.label}>Enter Email</Text>

                <TextInput 
                    style={styles.inputs} 
                    onChangeText={(text) => this.setState({password: text})}
                    value={this.state.password}
                    secureTextEntry={true}
                />
                <Text style={styles.label}>Enter Password</Text>

                <TextInput 
                    style={styles.inputs} 
                    onChangeText={(text) => this.setState({matchingPassword: text})}
                    value={this.state.matchingPassword}
                    secureTextEntry={true}
                />
                <Text style={styles.label}>Confirm Password</Text>

                 <TextInput 
                    style={styles.inputs} 
                    onChangeText={(text) => this.setState({firstName: text})}
                    value={this.state.firstName}
                />
                <Text style={styles.label}>First Name</Text>

                <TextInput 
                    style={styles.inputs} 
                    onChangeText={(text) => this.setState({lastName: text})}
                    value={this.state.lastName}
                />
                <Text style={styles.label}>Last Name</Text>

                <TouchableHighlight onPress={this.registerAccount} underlayColor='#31e981'>
                    <Text style = {styles.buttons}>
                        Register
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight onPress={this.cancelRegister} underlayColor='#31e981'>
                    <Text style = {styles.buttons}>
                        Cancel
                    </Text>
                </TouchableHighlight>

            </View>
    )}




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
    inputs:{
        flex: 1,
        width: '80%',
        padding: 10
    },
    buttons:{
        marginTop: 15,
        fontSize: 16
    },
    labels:{
        paddingBottom: 10
    }
});