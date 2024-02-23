import { Button, Text, View } from "react-native";

const LoggedOut = () => {
    const login = () => {
        console.log("login");
    };

    return (
        <View>
            <Text>LoggedOut</Text>
            <Button title="Login" onPress={login} />
        </View>
    );
};

export default LoggedOut;
