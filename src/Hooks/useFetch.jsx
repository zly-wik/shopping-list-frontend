import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../Constants";

const useFetch = (endpoint) => {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        axios
            .get(API_URL + endpoint)
            .then((res) => {
                setStatus(res.status);
                if (res.status !== 200) {
                    throw Error("Failed to fetch data");
                }
                return res.data;
            })
            .then((data) => {
                setData(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return { data, status };
};

export default useFetch;
