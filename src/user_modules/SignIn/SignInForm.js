import { useState } from "react";
import { View, StyleSheet } from "react-native";
import Input from "../../shared/components/Input";
import Button from "../../shared/components/Button";

const SignInForm = ({ OnSignIn, credentialsInvalid = { email: false, password: false } }) => {
    const [enteredEmail, setEmail] = useState("");
    const [enteredPassword, setPassword] = useState("");

    // Provide default values to avoid destructuring issues
    const { email: emailIsInvalid = false, password: passwordIsInvalid = false } = credentialsInvalid;

    const updateInputValueHandler = (inputType, enteredValue) => {
        switch (inputType) {
            case "email":
                setEmail(enteredValue);
                break;
            case "password":
                setPassword(enteredValue);
                break;
            default:
                break;
        }
    };

    const handleLogin = () => {
        OnSignIn({ email: enteredEmail, password: enteredPassword });
    };

    return (
        <View>
            <View>
                <Input 
                    label="Email" 
                    placeholder="Enter your email" 
                    value={enteredEmail} 
                    keyboardType="email-address"
                    onUpdateValue={updateInputValueHandler.bind(this, "email")}
                    isValid={emailIsInvalid} 
                />
                <Input 
                    label="Password" 
                    placeholder="Enter your password" 
                    value={enteredPassword} 
                    secure={true}
                    onUpdateValue={updateInputValueHandler.bind(this, "password")}
                    isValid={passwordIsInvalid} 
                />
            </View>
            <View style={styles.buttons}>    
                <Button onPress={handleLogin}>Login</Button>
            </View>
        </View>
    );
};

export default SignInForm;

const styles = StyleSheet.create({
    buttons: {
        marginTop: 12,
      },
});
