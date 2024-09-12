import { useContext, useState } from "react";
import { Alert } from "react-native";
import { AuthContext } from "../authentication/AuthContext";
import useApiService from "../../shared/HttpServices";
import LoadingOverlay from "../../shared/components/LoadingOverlay";
import SignInContent from "./SignInContent";


const SignInScreen = () => {
  const { postAsync } = useApiService();
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleLogin = async ({ email, password }) => {
    setIsLoading(true);
    const { isSuccess, message, payload } = await postAsync("Users/login", { email, password });
    
    setIsLoading(false);

    if (isSuccess) {
      const tokenTTL = (Date.now() / (1000 * 60)) + 59;
      login(
        {
          accessToken: payload.accessToken,
          refreshToken: payload.refreshToken,
          tokenTTL,
        },
        {
          id: payload.id,
          name: payload.name,
          email: payload.email,
        }
      );
    } else {
      Alert.alert("Failed to login", message);
    }
  };

  if (isLoading) return <LoadingOverlay message="Signing in..." />;

  return <SignInContent onLogin={handleLogin} />;
};

export default SignInScreen;
