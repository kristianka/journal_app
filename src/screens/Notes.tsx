import { FlatList, RefreshControl, ScrollView, View } from "react-native";
import { FireBaseUserInterface, NoteInterface } from "../types";
import useUser from "../hooks/useUser";
import useNotes from "../hooks/useNotes";
import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, Paragraph, Button, Text, IconButton, Avatar, Tooltip } from "react-native-paper";

import { showLocation } from "react-native-map-link";

interface props {
    firebaseAuth: FireBaseUserInterface;
}

const Notes = ({ firebaseAuth }: props) => {
    // get user from backend after firebaseAuth is fetched from firebase
    const { data: user, status: userStatus, refetch } = useUser(firebaseAuth);
    // pass user to useNotes. If user is null, useNotes will return null
    const { data: notes, status: notesStatus } = useNotes(user || null);

    const queryClient = useQueryClient();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        queryClient.invalidateQueries({ queryKey: ["user"] });
        queryClient.invalidateQueries({ queryKey: ["notes"] });
        setRefreshing(false);
    }, []);

    const openLocation = (item: NoteInterface) => {
        const coordinates = item.location.coordinates;
        showLocation({
            latitude: coordinates[1],
            longitude: coordinates[0]
        });
    };

    // really bad and hacky way to refetch notes, sometimes user
    // data isn't load from server
    useEffect(() => {
        if (firebaseAuth) {
            refetch();
        }
    }, [firebaseAuth, refetch]);

    console.log("USER", user, "USER STATUS", userStatus);
    console.log("NOTES", notes, "NOTES STATUS", notesStatus);

    if (notesStatus === "success" && notes?.length === 0) {
        return <Text>Click the icon below to create your first note! ✏️</Text>;
    }

    if (userStatus === "error" || notesStatus === "error") {
        return <Text>Something went wrong. Please try again later.</Text>;
    }

    if (notesStatus === "success" && notes && notes.length > 0) {
        return (
            <>
                {/* <Text variant="headlineLarge">Notes</Text> */}
                <FlatList
                    style={{ width: "100%" }}
                    data={notes}
                    renderItem={({ item }) => (
                        <Card style={{ margin: 10, padding: 10 }}>
                            <Card.Title
                                title={item.title}
                                titleVariant="titleLarge"
                                subtitle={item.content}
                                subtitleNumberOfLines={3}
                                left={(props) => <Avatar.Icon {...props} icon="book" />}
                                right={() => (
                                    <Tooltip title="Navigate">
                                        <IconButton
                                            icon="map-outline"
                                            onPress={() => openLocation(item)}
                                        />
                                    </Tooltip>
                                )}
                            />
                        </Card>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                />
            </>
        );
    }
};

export default Notes;
