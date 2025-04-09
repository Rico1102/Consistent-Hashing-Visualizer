import React, { useState } from "react";
import "./ManageNodesComponent.css";
import useNodeStore from "../store/nodesMap";
import dbStore from "../store/nodesStorage";
import findXY from "../utils/findPosition";
import getHash from "../utils/getHash";
import findNextServer from "../utils/findNextServer";

const ManageNodesComponent = () => {
    const state = useNodeStore((state) => state.nodes);
    const addNode = useNodeStore((state) => state.addNodes);
    const addDataToNode = dbStore((state) => state.addDataToNode);
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [id, setId] = useState("");
    const [newName, setNewName] = useState("");

    const handleAddNode = () => {
        if (name.trim() && position >= 0 && position <= 100) {
            const { x, y } = findXY(position, 3.6, 400); // 3.6 is the angle per part, 400 is the radius
            addNode(name, position, x, y, "blue");
            setName("");
            setPosition("");
        } else {
            alert("Please enter a valid name and position (0-100).");
        }
    };

    const handleSubmitNewForm = () => {
        if (id.trim() && newName.trim()) {
            const hashPosition = getHash(id);
            console.log(`Hash Position: ${hashPosition}`);
            const serverUUID = findNextServer(hashPosition);
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
        <div className="container">
            {/* Top Part: Existing Form and Node List */}
            <div className="top-part">
                <form
                    className="form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAddNode();
                    }}
                >
                    <div className="form-group">
                        <label className="label">Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input"
                        />
                    </div>
                    <div className="form-group">
                        <label className="label">Position (0-100):</label>
                        <input
                            type="number"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            className="input"
                        />
                    </div>
                    <button type="submit" className="button">
                        Add
                    </button>
                </form>
            </div>

            <div className="nodes-list">
                <h4>Nodes List</h4>
                <ul>
                    {state.map((node, index) => (
                        <li key={index}>
                            {node.name} - Position: {node.position}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Bottom Part: New Form */}
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
        </div>
    );
};

export default ManageNodesComponent;
