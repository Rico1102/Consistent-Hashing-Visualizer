import React, { useState } from "react";
import findXY from "../utils/findPosition";
import { v4 as uuidv4 } from "uuid";
import { migrationStatsOnServerAddition } from "../utils/dataMigrationStats";
import dbStore from "../store/nodesStorage";
import useNodeStore from "../store/nodesMap";
import ServerModalComponent from "./ModalComponent";

const AddServerComponent = () => {
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [migrationData, setMigrationData] = useState([]);
    const addNode = useNodeStore((state) => state.addNodes);
    const migrateDataToNewNode = dbStore((state) => state.moveDataToNewNode);

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

    return (
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
                <ServerModalComponent
                    isOpen={isModalOpen}
                    onAccept={handleAccept}
                    onReject={handleReject}
                    onClose={handleClose}
                    migrationData={migrationData.data}
                />
            </form>
        </div>
    );
};

export default AddServerComponent;
