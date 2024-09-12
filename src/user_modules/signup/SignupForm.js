import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Input from "../../shared/components/Input";
import Button from "../../shared/components/Button";

const SignupForm = ({OnSignup, credentialsInvalid}) => {

    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [confirmPassword, setConfirmPassword]=useState("");
    const [name, setName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");


    const{emailIsInvalid, passwordIsInvalid, confirmPasswordsDoNotMatch, nameIsInvalid, phoneNoIsInvalid}=credentialsInvalid

    const updateInputValueHandler=(inputType, enteredValue)=>{
        switch(inputType){
            case "email":
                setEmail(enteredValue);
                break;
            case "password":
                setPassword(enteredValue);
                break;
            case "confirmPassword":
                setConfirmPassword(enteredValue);
                break;
            case "name":
                setName(enteredValue);
                break;
            case "phoneNo":
                setPhoneNo(enteredValue);
                break;

        }   
    }

    const handleSubmit = ()=>{
        OnSignup({email:email, password:password, confirmPassword:confirmPassword, name:name, phoneNo:phoneNo});
    }
    return ( <View>
        <View>
            <Input
                label="Email-address"
                placeholder="Enter your email"
                value={email}
                keyboardType={"email-address"}
                onUpdateValue={updateInputValueHandler.bind(this, "email")}
                isInvalid={emailIsInvalid}
            />
            <Input
                label="Password"
                placeholder="Enter your password"
                value={password}
                secure={true}
                onUpdateValue={updateInputValueHandler.bind(this, "password")}
                isInvalid={passwordIsInvalid}
            />
            <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                value={confirmPassword}
                secure={true}
                onUpdateValue={updateInputValueHandler.bind(this, "confirmPassword")}
                isInvalid={confirmPasswordsDoNotMatch}
            />
            <Input
                label="Name"
                placeholder="Enter your name"
                value={name}
                onUpdateValue={updateInputValueHandler.bind(this, "name")}
                isInvalid={nameIsInvalid}
            />
            <Input
                label="Phone Number"
                placeholder="Enter your phone number"
                value={phoneNo}
                keyboardType={"phone-pad"}
                onUpdateValue={updateInputValueHandler.bind(this, "phoneNo")}
                isInvalid={phoneNoIsInvalid}
            />
            <View style={styles.buttons}>
                <Button onPress={handleSubmit}>Sign Up</Button>
            </View>
        </View>
    </View> );
}
 
export default SignupForm;

const styles = StyleSheet.create({
    buttons: {
        marginTop: 12,
      },
});