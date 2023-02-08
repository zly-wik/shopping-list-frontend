import axios from "axios";
import { API_URL } from "../Constants";
import { useEffect, useState } from "react";
import useFetch from "../Hooks/useFetch";

function ShoppingLists() {
    const { data, setData, isPending, error } = useFetch("/checklists");
    const [requestError, setRequestError] = useState(null);
    // const [lists, setLists] = useState([
    //     { id: 1, title: "ShoppingList 1", items: ["Eggs", "Milk"] },
    //     { id: 2, title: "List 2", items: ["i1", "i2", "i3", "aaa", "bbb"] },
    //     { id: 3, title: "Test", items: [] },
    // ]);

    const handleDelete = (id) => {
        axios
            .delete(`${API_URL}checklists/${id}`)
            .then((res) => {
                setRequestError(null);
                const newData = data.filter((item) => {
                    return item.id !== id;
                });
                setData(newData);
            })
            .catch((err) => {
                setRequestError("Failed to delete data");
            });
    };

    const renderList = () => {
        return data.map((item) => (
            <div className="list-item" key={item.id}>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
                &nbsp;
                {item.title}
                <div className="small-text">Items: {item.items.length}</div>
                <br />
            </div>
        ));
    };

    return (
        <div className="shopping-lists">
            <div className="error">
                {!isPending && error}
                <br />
                {!isPending && requestError}
            </div>
            {!isPending && !error && renderList()}
        </div>
    );
}

export default ShoppingLists;
