import api from "../api";
const baseUrl = "api/info";
import Toast from "react-native-toast-message";

const serverHealthCheck = async () => {
    try {
        const res = await api.get(`${baseUrl}/health`);
        return res.status;
    } catch (error) {
        Toast.show({
            type: "error",
            text1: "The server is down.",
            text2: " Please try again later."
        });
    }
};

export default { serverHealthCheck };
