import axios from "axios";

export const API_URL = "http://localhost:8000/";

export function meFromToken(tokenFromStorage) {
    const request = axios({
        url: `${API_URL}/me`,
        header: {
            Authorization: `JWT ${tokenFromStorage}`,
        },
    });

    return {
        // type: "ME_FROM_TOKEN",
        payload: request,
    };
}

export function meFromTokenSuccess(currentUser) {
    return {
        payload: currentUser,
    };
}

export function meFromTokenFailure(error) {
    return {
        payload: error,
    };
}
