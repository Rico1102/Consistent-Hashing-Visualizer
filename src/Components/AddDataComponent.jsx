import React, { useState } from "react";
import dbStore from "../store/nodesStorage";
import getHash from "../utils/getHash";
import findNextServer from "../utils/findNextServer";

const AddDataComponent = () => {
    const addDataToNode = dbStore((state) => state.addDataToNode);
    const [id, setId] = useState("");
    const [newName, setNewName] = useState("");

    const handleSubmitNewForm = () => {
        if (id.trim() && newName.trim()) {
            const hashPosition = getHash(id);
            console.log(`Hash Position: ${hashPosition}`);
            const serverUUID = findNextServer(hashPosition).uuid;
            console.log(`Server UUID: ${serverUUID}`);
            console.log(`ID: ${id}, Name: ${newName}`);
            addDataToNode(serverUUID, {
                id: id,
                name: newName,
            });
            setId("");
            setNewName("");
        } else {
            alert("Please enter valid ID and Name.");
        }
    };

    return (
        <div className="bottom-part">
            <form
                className="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmitNewForm();
                }}
            >
                <div className="form-group">
                    <label className="label">ID:</label>
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        className="input"
                    />
                </div>
                <div className="form-group">
                    <label className="label">Name:</label>
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="input"
                    />
                </div>
                <button type="submit" className="button">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddDataComponent;
