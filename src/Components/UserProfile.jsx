import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Button,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
    Input,
    UncontrolledDropdown,
} from "reactstrap";
import { API_URL, csrfToken, logout } from "../Constants";
import useFetch from "../Hooks/useFetch";

const UserProfile = ({ logoutCallback }) => {
    const { data, setData, isPending, error } = useFetch("/me");
    const [editing, setEditing] = useState(false);
    const [editedName, setEditedName] = useState("");
    const [editedProfileLevel, setEditedProfileLevel] = useState("STD");

    const handleUpdate = (event) => {
        const patch_data = {
            display_name: editedName || data.display_name,
            profile_level: editedProfileLevel,
        };

        axios
            .patch(`${API_URL}me`, patch_data)
            .then((res) => {
                if (res.status === 200) {
                    const newData = {
                        ...data,
                        display_name: res.data.display_name,
                        profile_level: res.data.profile_level,
                    };
                    setData(newData);
                    setEditedName("");
                    // setEditedProfileLevel(");
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
                            className="input-field"
                            bsSize="sm"
                            type="text"
                            defaultValue={data.display_name}
                            onChange={(event) =>
                                setEditedName(event.target.value)
                            }
                        />
                        <UncontrolledDropdown>
                            <DropdownToggle caret>
                                {editedProfileLevel}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem
                                    onClick={() => setEditedProfileLevel("STD")}
                                >
                                    STD
                                </DropdownItem>
                                <DropdownItem
                                    onClick={() => setEditedProfileLevel("VIP")}
                                >
                                    VIP
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
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
                            onClick={() => {
                                setEditedProfileLevel(data.profile_level);
                                setEditing(true);
                            }}
                        >
                            Edit
                        </Button>
                        <br />
                        Username:&nbsp;
                        <b>{data.display_name || "No name"}</b>
                        <br />
                        Profile Level:&nbsp;<b>{data.profile_level}</b>
                        <br />
                    </div>
                )}
            </>
        );
    };

    return (
        <div>
            <div className="error">{!isPending && error}</div>
            {!isPending && !error && profileData()}
            <br />
            {!isPending && !error && (
                <Link
                    to="/"
                    className="btn-logout"
                    onClick={() => {
                        logoutCallback();
                        logout();
                    }}
                >
                    Logout
                </Link>
            )}
        </div>
    );
};

export default UserProfile;
