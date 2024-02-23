import { useEffect } from "react";
import { auth } from "../firebase";
import notesService from "../services/notes";
import userService from "../services/user";
import { FireBaseUserInterface } from "../types";
import Toast from "react-native-toast-message";
import { useQueryClient } from "@tanstack/react-query";

const useAuthEffect = (
    setFirebaseAuth: React.Dispatch<React.SetStateAction<FireBaseUserInterface | null>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const queryClient = useQueryClient();
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
            if (authUser) {
                const firebaseObject: FireBaseUserInterface = {
                    email: authUser.email,
                    uid: authUser.uid,
                    emailVerified: authUser.emailVerified,
                    metadata: authUser.metadata
                };
                authUser
                    .getIdToken()
                    .then((token) => {
                        userService.setToken(token);
                        notesService.setToken(token);
                        setFirebaseAuth(firebaseObject);
                        console.log("Firebase user", firebaseObject);
                    })
                    .catch((error: Error) => {
                        if (error.message.includes("auth/id-token-expired")) {
                            Toast.show({
                                type: "error",
                                text1: "Your session has expired. Please log in again."
                            });
                        } else if (error.message.includes("auth/too-many-requests")) {
                            Toast.show({
                                type: "error",
                                text1: "Too many requests. Please try again later."
                            });
                        } else {
                            Toast.show({
                                type: "error",
                                text1: "An error occurred. Please try again."
                            });
                        }
                        setFirebaseAuth(null);
                    });
            } else {
                // User is signed out
                setFirebaseAuth(null);
            }
            setLoading(false);
        });

        // Cleanup the observer when the component unmounts
        return () => unsubscribe();
    }, [setFirebaseAuth, setLoading]);
};

export default useAuthEffect;
