import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../Constants";

const useFetch = (endpoint) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`${API_URL}${endpoint}`)
            .then((res) => {
                if (res.status !== 200) {
                    throw Error("Failed to fetch data");
                }
                return res.data;
            })
            .then((data) => {
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch((err) => {
                setIsPending(false);
                setError(`Failed to fetch the data: ${err.message}`);
            });
    }, [endpoint]);

    return { data, setData, isPending, error };
};

export default useFetch;
