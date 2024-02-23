import { View } from "react-native";
import { Appbar, Button, Dialog, Portal, Text } from "react-native-paper";
import { auth } from "../firebase";
import { useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { FireBaseUserInterface } from "../types";
import { useState } from "react";

interface props {
    setFirebaseAuth: (firebaseAuth: FireBaseUserInterface | null) => void;
}

const Settings = ({ setFirebaseAuth }: props) => {
    const queryClient = useQueryClient();

    const [visible, setVisible] = useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    const handleSignOut = async () => {
        console.log("Sign out");
        await auth.signOut();
        setFirebaseAuth(null);
        queryClient.clear();
        Toast.show({
            type: "success",
            text1: "Signed out",
            text2: "See you soon! 👋"
        });
        hideDialog();
    };

    return (
        <View>
            <Text variant="headlineLarge">Settings</Text>
            <Button icon="logout" onPress={showDialog}>
                Sign out
            </Button>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Confirm action</Dialog.Title>
                    <Dialog.Content>
                        <Text>Are you sure you want to sign out?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Cancel</Button>
                        <Button onPress={handleSignOut}>Sign out</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

export default Settings;
