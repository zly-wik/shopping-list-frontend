import axios from "axios";
import { useState } from "react";
import { Button, Form, Input } from "reactstrap";
import { API_URL, csrfToken } from "../Constants";
import useFetch from "../Hooks/useFetch";

const UserProfile = () => {
    const { data, setData, isPending, error } = useFetch("/me");
    const [editing, setEditing] = useState(false);
    const [editedName, setEditedName] = useState("");

    const handleUpdate = (event) => {
        axios
            .patch(`${API_URL}me`, {
                display_name: editedName,
            })
            .then((res) => {
                if (res.status === 200) {
                    const newData = {
                        ...data,
                        display_name: editedName,
                    };
                    setData(newData);
                    setEditedName("");
                    setEditing(false);
                }
            })
            .catch((error) => {
                setEditedName("");
                setEditing(false);
            });
    };

    const profileData = () => {
        return (
            <>
                {editing && (
                    <Form>
                        <input type="hidden" name="_token" value={csrfToken} />
                        <Input
                            bsSize="sm"
                            type="text"
                            defaultValue={data.display_name}
                            onChange={(event) =>
                                setEditedName(event.target.value)
                            }
                        />
                        <Button
                            size="sm"
                            color="primary"
                            onClick={handleUpdate}
                        >
                            Update
                        </Button>
                    </Form>
                )}
                {!editing && (
                    <div>
                        <Button
                            color="info"
                            size="sm"
                            onClick={() => setEditing(true)}
                        >
                            Edit
                        </Button>
                        <br />
                        Username:&nbsp;
                        <b>{data.display_name || "No name"}</b>
                        <br />
                        Email:&nbsp;
                        <b>{data.user}</b>
                    </div>
                )}
            </>
        );
    };

    return (
        <div>
            <div className="error">{!isPending && error}</div>
            {!isPending && !error && profileData()}
        </div>
    );
};

export default UserProfile;
