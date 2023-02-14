import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Input } from "reactstrap";
import axios from "axios";

import useFetch from "../Hooks/useFetch";
import { API_URL, csrfToken } from "../Constants";

const ListDetails = () => {
    let { id } = useParams();
    const { data, setData, isPending, error } = useFetch(
        `/checklists/${id}/items`
    );
    const [newItem, setNewItem] = useState("");
    const [requestError, setRequestError] = useState(null);

    const handleDelete = (item_id) => {
        axios
            .delete(`${API_URL}checklists/${id}/items/${item_id}`)
            .then((res) => {
                setRequestError(null);
                const newData = data.filter((item) => {
                    return item.id !== item_id;
                });
                setData(newData);
            })
            .catch((err) => {
                setRequestError("Failed to delete data");
            });
    };

    const handleComplete = (item_id) => {
        axios
            .patch(`${API_URL}checklists/${id}/items/${item_id}`, {
                done: true,
            })
            .then(() => {
                setRequestError(null);
                const updatedData = data.map((item) => {
                    if (item.id === item_id) {
                        const updatedItem = {
                            ...item,
                            done: true,
                        };
                        return updatedItem;
                    }
                    return item;
                });

                setData(updatedData);
            })
            .catch((err) => {
                setRequestError("Failed to delete data");
            });
    };

    const handlePostItem = (event) => {
        event.preventDefault();

        axios
            .post(`${API_URL}checklists/${id}/items/`, {
                text: event.target.item.value,
            })
            .then((res) => {
                setNewItem("");
                if (res.status === 201) {
                    const newData = [...data, res.data];
                    setData(newData);
                }
            });
    };

    const itemsCRUD = () => {
        return (
            <div>
                <Form onSubmit={handlePostItem}>
                    <input type="hidden" name="_token" value={csrfToken} />
                    <Input
                        type="text"
                        name="item"
                        placeholder="item name"
                        value={newItem}
                        onChange={(event) => {
                            setNewItem(event.target.value);
                        }}
                    />
                    <Button type="submit" color="primary">
                        New Item
                    </Button>
                </Form>
            </div>
        );
    };

    return (
        <>
            {!isPending && error}
            {!isPending && !error && (
                <>
                    {itemsCRUD()}
                    <br />
                    {data.map((item) => (
                        <div className="list-item" key={item.id}>
                            <Button
                                disabled={item.done}
                                outline
                                color="info"
                                size="sm"
                                onClick={() => handleComplete(item.id)}
                            >
                                Done
                            </Button>
                            &nbsp;
                            {item.done && <s>{item.text}</s>}
                            {!item.done && <b>{item.text}</b>}
                            &nbsp;
                            <Button
                                color="danger"
                                size="sm"
                                onClick={() => handleDelete(item.id)}
                            >
                                Delete
                            </Button>
                        </div>
                    ))}
                </>
            )}
        </>
    );
};

export default ListDetails;