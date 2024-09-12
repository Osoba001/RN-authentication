import { createContext, useState } from "react";
import TokenManager from "./TokenManager";

export const AuthContext = createContext({
    accessToken: "",
    refreshToken: "",
    tokenTTL: 0,
    user: {id: "", name: "", email: ""},
    login: (token, user, isFreshLogin=true) => {},
    updateToken: (token) => {},
    logout: () => {}
});

const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
    const [tokenTTL, setTokenTTL] = useState(0);
    const [user, setUser] = useState({id: "", name: "", email: ""});

    const login = (token, user, isFreshLogin=true) => {
        updateToken(token, isFreshLogin);
        setUser(user);
        if (isFreshLogin){
            TokenManager.SaveTokenAsync(token)
        }
            
    };

    const updateToken = (token, isFreshLogin=true) => {
        setAccessToken(token.accessToken);
        setRefreshToken(token.refreshToken);
        setTokenTTL(token.tokenTTL);
        if (isFreshLogin)
            TokenManager.SaveTokenAsync(token)
    };

    const logout = () => {
        setAccessToken("");
        setRefreshToken("");
        setTokenTTL(0);
        setUser({id: "", name: "", email: ""});
        TokenManager.ClearStorageAsync();
    };

    return (
        <AuthContext.Provider value={{
            accessToken,
            refreshToken,
            tokenTTL,
            user,
            login,
            updateToken,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;