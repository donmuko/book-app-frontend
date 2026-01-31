import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useContext, useState } from "react";
import { createContext } from "react";
import { auth } from "../firebase/firebase.config";


const AuthContext = createContext();
export const useAuth = () => {
    return useContext(AuthContext);
}

const googleProvider = new GoogleAuthProvider(); 

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // register user
    const registerUser = async(email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password);
    }

    // login user
    const loginUser = async(email, password) => {
        return await signInWithEmailAndPassword(auth, email, password);
    }

    // sign up with google
    const signInWithGoogle = async() => {
        return await signInWithPopup(auth, googleProvider);

    }

    // logout user
    const logout = async() => {
        return signOut(auth);
    }

    // manage user state changes
    useState(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);

            if (user) {
                const { email, displayName, photoURL } = user;
                const userData = {
                    email,
                    username: displayName,
                    photo: photoURL
                };
                console.log("User logged in:", user.email);
            }
        })
        return () => unsubscribe();
    }, []);

    const value = {
        currentUser,
        loading,
        registerUser,
        loginUser,
        logout,
        signInWithGoogle
    };
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}