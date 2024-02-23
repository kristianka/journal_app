import { useState } from "react";
import { View, Text, Button, SafeAreaView } from "react-native";
import { FireBaseUserInterface } from "./types";
import useAuthEffect from "./hooks/useAuthEffect";

import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";

import Login from "./screens/Login";
import Notes from "./screens/Notes";
import Toast from "react-native-toast-message";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import api from "./api";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";

import Settings from "./screens/Settings";
import Profile from "./screens/Profile";

const Tab = createMaterialBottomTabNavigator();

const App = () => {
    const [firebaseAuth, setFirebaseAuth] = useState<FireBaseUserInterface | null>(null);
    // avoids flickering landing page
    const [loading, setLoading] = useState<boolean>(true);
    // auth hook
    useAuthEffect(setFirebaseAuth, setLoading);

    const checkServerConnection = async () => {
        try {
            const response = await api.get("/api/info/health");
            Toast.show({
                type: "success",
                text1: "Server is up and running",
                text2: response.data
            });
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Server is down",
                text2: "Please try again later."
            });
        }
    };

    checkServerConnection();
    const insets = useSafeAreaInsets();

    if (loading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <SafeAreaProvider>
            <Tab.Navigator>
                <Tab.Screen
                    name="Home"
                    options={{
                        tabBarLabel: "Home",
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="home" color={color} size={26} />
                        )
                    }}
                >
                    {() => (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "space-between",
                                alignItems: "center",

                                // Paddings to handle safe area
                                paddingTop: insets.top,
                                paddingBottom: insets.bottom,
                                paddingLeft: insets.left,
                                paddingRight: insets.right
                            }}
                        >
                            {firebaseAuth ? (
                                <Notes firebaseAuth={firebaseAuth} />
                            ) : (
                                <Login
                                    firebaseAuth={firebaseAuth}
                                    setFirebaseAuth={setFirebaseAuth}
                                />
                            )}
                        </View>
                    )}
                </Tab.Screen>
                <Tab.Screen
                    name="Create"
                    options={{
                        tabBarLabel: "Create",
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="book-plus" color={color} size={26} />
                        )
                    }}
                >
                    {() => (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "space-between",
                                alignItems: "center",

                                // Paddings to handle safe area
                                paddingTop: insets.top,
                                paddingBottom: insets.bottom,
                                paddingLeft: insets.left,
                                paddingRight: insets.right
                            }}
                        >
                            <Button title="Show toast" />
                        </View>
                    )}
                </Tab.Screen>
                <Tab.Screen
                    name="Profile"
                    options={{
                        tabBarLabel: "Profile",
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="account" color={color} size={26} />
                        )
                    }}
                >
                    {() => (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "space-between",
                                alignItems: "center",

                                // Paddings to handle safe area
                                paddingTop: insets.top,
                                paddingBottom: insets.bottom,
                                paddingLeft: insets.left,
                                paddingRight: insets.right
                            }}
                        >
                            <Profile firebaseAuth={firebaseAuth} />
                        </View>
                    )}
                </Tab.Screen>

                <Tab.Screen
                    name="Settings"
                    options={{
                        tabBarLabel: "Settings",
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="cog" color={color} size={26} />
                        )
                    }}
                >
                    {() => (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "space-between",
                                alignItems: "center",

                                // Paddings to handle safe area
                                paddingTop: insets.top,
                                paddingBottom: insets.bottom,
                                paddingLeft: insets.left,
                                paddingRight: insets.right
                            }}
                        >
                            <Settings setFirebaseAuth={setFirebaseAuth} />
                        </View>
                    )}
                </Tab.Screen>
            </Tab.Navigator>
        </SafeAreaProvider>
    );
};

export default App;
