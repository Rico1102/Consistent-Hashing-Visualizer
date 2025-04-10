import React, { useState } from "react";
import "./ManageNodesComponent.css";
import useNodeStore from "../store/nodesMap";
import dbStore from "../store/nodesStorage";
import findXY from "../utils/findPosition";
import { v4 as uuidv4 } from "uuid";
import getHash from "../utils/getHash";
import findNextServer from "../utils/findNextServer";
import { migrationStatsOnServerAddition } from "../utils/dataMigrationStats";
import ModalComponent from "./ModalComponent";

const ManageNodesComponent = () => {
    const state = useNodeStore((state) => state.nodes);
    const addNode = useNodeStore((state) => state.addNodes);
    const removeNode = useNodeStore((state) => state.removeNode);
    const addDataToNode = dbStore((state) => state.addDataToNode);
    const migrateDataToNewNode = dbStore((state) => state.moveDataToNewNode);
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [id, setId] = useState("");
    const [newName, setNewName] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [migrationData, setMigrationData] = useState([]);

    const handleAddNode = () => {
        if (name.trim() && position >= 0 && position <= 100) {
            const migrationResult = migrationStatsOnServerAddition(position);
            setMigrationData(migrationResult);
            console.log(
                "Migrating data from ",
                migrationResult.oldServerDetails.name,
                "to ",
                name
            );
            setIsModalOpen(true);
        } else {
            alert("Please enter a valid name and position (0-100).");
        }
    };

    const handleAccept = () => {
        setIsModalOpen(false);
        const { x, y } = findXY(position, 3.6, 400); // 3.6 is the angle per part, 400 is the radius
        const id = uuidv4();
        addNode(id, name, position, x, y, "blue");
        migrateDataToNewNode(
            migrationData.oldServerDetails.id,
            id,
            migrationData.data
        );
        setName("");
        setPosition("");
        console.log("Server added!");
    };

    const handleReject = () => {
        setIsModalOpen(false);
        console.log("Server addition rejected.");
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    const handleRemoveNode = (nodeId) => {
        removeNode(nodeId);
    };

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
                        Add Server
                    </button>
                    <ModalComponent
                        isOpen={isModalOpen}
                        onAccept={handleAccept}
                        onReject={handleReject}
                        onClose={handleClose}
                        migrationData={migrationData.data}
                    />
                </form>
            </div>

            <div className="nodes-list">
                <h4>Nodes List</h4>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.map((node, index) => (
                            <tr key={index}>
                                <td>{node.name}</td>
                                <td>{node.position}</td>
                                <td>
                                    <button
                                        className="remove-button"
                                        onClick={() =>
                                            handleRemoveNode(node.id)
                                        }
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
