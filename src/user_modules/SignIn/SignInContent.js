import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import FlatButton from "../../shared/components/FlatButton";
import SignInForm from "./SignInForm";
import { Colors } from "../../shared/Colors";


const SignInContent = ({onLogin}) => {

    const navigation=useNavigation();

    const [credentialsIsInvalid, setCredentialsIsInvalid]=useState({
        email:false,
        password:false
    })

    const handleLogin = (credentials) => {

        let {email, password}=credentials;

        email = email.trim();
        password = password.trim();

        const emailIsValid = /\S+@\S+\.\S+/.test(email);
        const passwordIsValid = password.length >= 2;

        if(!emailIsValid || !passwordIsValid){
            setCredentialsIsInvalid({
                email:!emailIsValid,
                password:!passwordIsValid          
        })
        Alert.alert('Invalid input', 'Please check your entered credentials.');

        return;
    }
    onLogin({email, password})

    }
    return (  <View style={styles.form}>
        <SignInForm OnSignIn={handleLogin} credentialsIsInvalid={credentialsIsInvalid} />
        <View style={styles.button}>
            <FlatButton onPress={()=>{navigation.replace("SignUp")}}>Sign Up</FlatButton>
        </View>
    </View>);
   
}
 
export default SignInContent;

const styles=StyleSheet.create({
    form:{
        marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    },
    button:{
        marginTop:8
    }
})