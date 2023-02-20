import { useState } from "react";
import { Button, Input } from "reactstrap";
import axios from "axios";
import { API_URL } from "../Constants";
import useFetch from "../Hooks/useFetch";
import CreateListForm from "./CreateListForm";
import { Link } from "react-router-dom";

function ShoppingLists() {
    const { data, setData, isPending, error } = useFetch("/checklists");
    const {
        data: userProfileData,
        isPending: userProfilePending,
        error: userProfileError,
    } = useFetch("/me");
    const [requestError, setRequestError] = useState(null);
    const [creating, setCreating] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editedValue, setEditedValue] = useState("");
    // const [lists, setLists] = useState([
    //     { id: 1, title: "ShoppingList 1", items: ["Eggs", "Milk"] },
    //     { id: 2, title: "List 2", items: ["i1", "i2", "i3", "aaa", "bbb"] },
    //     { id: 3, title: "Test", items: [] },
    // ]);

    const maxLists = (profile_level) => {
        return profile_level === "VIP" ? 5 : 3;
    };

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

    const startEditing = (id) => {
        setEditingId(id);
    };

    const updateRequest = () => {
        axios
            .put(`${API_URL}checklists/${editingId}/`, { title: editedValue })
            .then((res) => {
                if (res.status === 200) {
                    const newData = data.map((item) => {
                        if (item.id === editingId) {
                            const updatedItem = {
                                ...item,
                                title: editedValue,
                            };
                            return updatedItem;
                        }
                        return item;
                    });

                    setData(newData);
                }

                setEditingId(null);
                setEditedValue("");
            })
            .catch((error) => {
                setEditingId(null);
                setEditedValue("");
            });
    };

    const handleChange = (event) => {
        setEditedValue(event.target.value);
    };

    const updateAfterCreate = (new_item) => {
        setCreating(false);

        const newData = [...data, new_item];
        setData(newData);
    };

    const renderList = () => {
        return data.map((item) => (
            <div className="list-item" key={item.id}>
                {editingId === item.id ? (
                    <>
                        <Input
                            className="input-field"
                            bsSize="sm"
                            type="text"
                            defaultValue={item.title}
                            onChange={handleChange}
                        />
                        <Button
                            size="sm"
                            color="primary"
                            onClick={updateRequest}
                        >
                            Update
                        </Button>
                    </>
                ) : (
                    <>
                        <Link className="details-link" to={item.id + "/"}>
                            {item.title}
                        </Link>
                        &nbsp;
                        <Button
                            color="primary"
                            className="btn-edit"
                            size="sm"
                            onClick={() => startEditing(item.id)}
                        >
                            Edit
                        </Button>
                        &nbsp;
                        <Button
                            color="danger"
                            size="sm"
                            onClick={() => handleDelete(item.id)}
                        >
                            Delete
                        </Button>
                    </>
                )}
                &nbsp; &nbsp;
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
            {!creating && !isPending && !error && (
                <>
                    <h3>Your shopping lists:</h3>

                    {!userProfilePending &&
                        !userProfileError &&
                        !isPending &&
                        !error &&
                        "Shopping lists: " +
                            data.length +
                            " / " +
                            (userProfileData.profile_level === "VIP"
                                ? "5"
                                : "3")}
                    <br />
                    {!userProfilePending &&
                        !userProfileError &&
                        !isPending &&
                        !error &&
                        data.length <
                            maxLists(userProfileData.profile_level) && (
                            <>
                                <Button
                                    className="btn-create"
                                    onClick={() => setCreating(true)}
                                >
                                    Create New
                                </Button>
                                <br />
                            </>
                        )}
                    <br />
                    {renderList()}
                </>
            )}
            {creating && (
                <>
                    <CreateListForm
                        onComplete={(new_item) => updateAfterCreate(new_item)}
                    />
                </>
            )}
        </div>
    );
}

export default ShoppingLists;
