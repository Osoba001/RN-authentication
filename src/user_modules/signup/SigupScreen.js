import { useContext, useState } from "react";
import { AuthContext } from "../authentication/AuthContext";
import useApiService from "../../shared/HttpServices";
import { Alert } from "react-native";
import LoadingOverlay from "../../shared/components/LoadingOverlay";
import SignupContent from "./SignupContent";
 
const SignupScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
 
    const {login} =useContext(AuthContext)
 
    async function SignupHandler({email, password, name, phoneNo}){
        setIsLoading(true)
        const {payload, message, isSuccess} =  await useApiService.post("users", {
            email: email,
            password: password,
            name: name,
            phoneNo: phoneNo,
        });
        setIsLoading(false)
        if (isSuccess) {
            const tokenTTL = (Date.now() / (1000 * 60)) + 59;
            login({accessToken: payload.accessToken, refreshToken: payload.refreshToken, tokenTTL: tokenTTL}, {id: payload.id, name: payload.name, email: payload.email})
        }else{
            Alert.alert("Error", message)
        }
    }
 
    if (isLoading) return <LoadingOverlay message={"Signing up..."}/>
 
    return<SignupContent OnSingUp={SignupHandler} />
 
}
  
export default SignupScreen;