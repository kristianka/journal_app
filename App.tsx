import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainApp from "./src/App";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { PaperProvider } from "react-native-paper";

const queryClient = new QueryClient();

// this is for just opening App.tsx in src
export default function App() {
    return (
        <NavigationContainer>
            <QueryClientProvider client={queryClient}>
                <PaperProvider>
                    <MainApp />
                </PaperProvider>
                <Toast />
            </QueryClientProvider>
        </NavigationContainer>
    );
}
