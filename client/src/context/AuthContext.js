import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [token, setToken] = useState(
        localStorage.getItem("contractiq_token") || sessionStorage.getItem("contractiq_token") || null
    );

    useEffect(() => {

        const storedUser = localStorage.getItem("contractiq_user") || sessionStorage.getItem("contractiq_user");

        if (storedUser) {

            setUser(JSON.parse(storedUser));

        }

    }, []);

    const login = (userData, accessToken) => {

        setUser(userData);

        setToken(accessToken);

        localStorage.setItem("contractiq_token", accessToken);

        localStorage.setItem(
            "contractiq_user",
            JSON.stringify(userData)
        );

    };

    const logout = () => {

        setUser(null);

        setToken(null);

        localStorage.removeItem("contractiq_token");

        localStorage.removeItem("contractiq_user");

        sessionStorage.removeItem("contractiq_token");

        sessionStorage.removeItem("contractiq_user");

    };

    return (

        <AuthContext.Provider

            value={{

                user,

                token,

                login,

                logout

            }}

        >

            {children}

        </AuthContext.Provider>

    );

};

export const useAuth = () => useContext(AuthContext);
