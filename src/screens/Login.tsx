import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { auth } from "../firebase";
import { FireBaseUserInterface } from "../types";
import { FirebaseError } from "firebase/app";
import Toast from "react-native-toast-message";

interface props {
    firebaseAuth: FireBaseUserInterface | null;
    setFirebaseAuth: (firebaseAuth: FireBaseUserInterface | null) => void;
}

const Login = ({ firebaseAuth, setFirebaseAuth }: props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            const { uid, emailVerified, metadata } = res.user;
            const neededUserData: FireBaseUserInterface = {
                email: res.user.email,
                uid,
                emailVerified,
                metadata
            };

            setFirebaseAuth(neededUserData);
            Toast.show({
                type: "success",
                text1: "Logged in successfully! 😃",
                text2: "Welcome back 👋"
            });
        } catch (error) {
            // Handle form errors. First, Firebase errors
            if (error instanceof FirebaseError) {
                if (error.code === "auth/invalid-email") {
                    Toast.show({
                        type: "error",
                        text1: "Invalid email.",
                        text2: ""
                    });

                    return;
                }
                if (error.message.includes("auth/too-many-requests")) {
                    Toast.show({
                        type: "error",
                        text1: "Access to this account has been temporarily disabled due to many failed login attempts.",
                        text2: "You can immediately restore it by resetting your password or you can try again later."
                    });
                }
                if (error.code === "auth/missing-email" || error.code === "auth/missing-password") {
                    Toast.show({
                        type: "error",
                        text1: "Please fill in all the fields.",
                        text2: ""
                    });
                    return;
                }
                if (error.code === "auth/invalid-credential") {
                    Toast.show({
                        type: "error",
                        text1: "Invalid credentials.",
                        text2: "Please try again."
                    });

                    return;
                }
            }

            console.log(error);
        }
    };

    return (
        <View>
            <TextInput value={email} onChangeText={setEmail} placeholder="Email" />
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
            />
            <Button onPress={handleLogin} title="Login" />
        </View>
    );
};

export default Login;
