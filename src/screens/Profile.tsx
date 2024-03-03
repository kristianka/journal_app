import { Avatar, Text } from "react-native-paper";
import { FireBaseUserInterface } from "../types";
import useUser from "../hooks/useUser";
import { View } from "react-native";

interface props {
    firebaseAuth: FireBaseUserInterface | null;
}

const Profile = ({ firebaseAuth }: props) => {
    const { data: user, status: userStatus, refetch } = useUser(firebaseAuth);

    if (userStatus === "pending" || !user) {
        return <Avatar.Icon size={128} icon="account" />;
    }

    return (
        <View>
            <Text variant="headlineLarge">Profile</Text>
            <Avatar.Image
                size={128}
                source={{
                    uri: `https://ui-avatars.com/api/?background=ed58a0&color=fff&name=${user.name}`
                }}
                onLoadStart={() => console.log("Image loading started")}
                onLoadEnd={() => console.log("Image loading ended")}
            />
            <Text>{user.name}</Text>
            <Text>{firebaseAuth?.email}</Text>
            <Text>Last signed in at: {firebaseAuth?.metadata?.lastSignInTime}</Text>
            <Text>Account created at: {firebaseAuth?.metadata?.creationTime}</Text>
        </View>
    );
};

export default Profile;
