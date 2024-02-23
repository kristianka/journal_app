import { useQuery } from "@tanstack/react-query";
import notesService from "../services/notes";
import { BackendUserInterface } from "../types";

const useNotes = (user: BackendUserInterface | null) => {
    return useQuery({
        queryKey: ["notes"],
        enabled: !!user,
        queryFn: async () => {
            console.log("Fetching notes from server...", user?.fireBaseUid);
            const notes = await notesService.getAll();
            return notes;
        },
        retry: 10,
        retryDelay: 1000
    });
};

export default useNotes;
