import { Button, Form, Input } from "reactstrap";
import axios from "axios";

import { API_URL, csrfToken } from "../Constants";
import { useState } from "react";

const CreateListForm = ({ onComplete }) => {
    const [title, setTitle] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post(`${API_URL}checklists/`, {
                title: title,
            })
            .then((res) => {
                if (res.status === 201) {
                    onComplete(res.data);
                }
            });
    };

    const handleChange = (event) => {
        setTitle(event.target.value);
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <input type="hidden" name="_token" value={csrfToken} />
                <Input
                    type="text"
                    className="input-field"
                    onChange={handleChange}
                    placeholder="title"
                />
                <Button class-name="btn-create" type="submit">
                    Create
                </Button>
            </Form>
        </>
    );
};

export default CreateListForm;
