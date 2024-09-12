import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, StyleSheet,View } from "react-native";
import SignupForm from "./SignupForm";
import { Colors } from "../../shared/Colors";
import FlatButton from "../../shared/components/FlatButton";

const SignupContent = ({OnSingUp}) => {
    const navigation= useNavigation();

    const [credentialsInvalid, setCredentialsInvalid]=useState({
        email: false,
        password: false,
        confirmPassword: false,
        name: false,
        phoneNo: false,
    })

    const handleSubmit=(credentials)=>{
      let {email, password, confirmPassword, name, phoneNo}=credentials

      email=email.trim();
      password=password.trim();
      confirmPassword=confirmPassword.trim();
      name=name.trim();
      phoneNo=phoneNo.trim();

      const emailIsValid=email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      const passwordIsValid=password.length>=3;
      const confirmPasswordIsValid=password===confirmPassword;
      const nameIsValid=name.length>=2;
      const phoneIsValid=phoneNo.match(/^[0-9]{10}$/);

    if(!emailIsValid || !passwordIsValid || !confirmPasswordIsValid || !nameIsValid || !phoneIsValid || !countryIsValid){
       
        setCredentialsInvalid({
          email:!emailIsValid,
          password:!passwordIsValid,
          confirmPassword:!confirmPasswordIsValid,
          name:!nameIsValid,
          phoneNo:!phoneIsValid,
      })
      Alert.alert('Invalid input', 'Please check your entered credentials.');
      return;
      }

      OnSingUp({email,password, name, phoneNo})
    }
    

    return ( <View style={styles.authContent}>
      <SignupForm OnSignup={handleSubmit} credentialsInvalid={credentialsInvalid} />
      <View style={styles.buttons}>
        <FlatButton onPress={() => navigation.replace("Login")}> Login </FlatButton>
      </View>
    </View> );
}
 
export default SignupContent;

const styles = StyleSheet.create({
    authContent: {
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
    buttons: {
      marginTop: 8,
    },
  });