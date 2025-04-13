import React, { useState } from "react";
import useNodeStore from "../store/nodesMap";
import { migrationStatsOnServerDeletion } from "../utils/dataMigrationStats";
import dbStore from "../store/nodesStorage";
import ServerModalComponent from "./ServerModalComponent";

const ServerListComponent = () => {
    const state = useNodeStore((state) => state.nodes);
    const removeNode = useNodeStore((state) => state.removeNode);
    const migrateDataToNewNode = dbStore((state) => state.moveDataToNewNode);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [migrationData, setMigrationData] = useState([]);

    const handleRemoveNode = (nodeId) => {
        const dataToMigrate = migrationStatsOnServerDeletion(nodeId);
        console.log(dataToMigrate);
        setMigrationData(dataToMigrate);
        setIsModalOpen(true);
    };

    const handleAccept = () => {
        setIsModalOpen(false);
        migrateDataToNewNode(
            migrationData.currentServerDetails.id,
            migrationData.nextServerDetails.id,
            migrationData.data
        );
        removeNode(migrationData.currentServerDetails.id);
        console.log("Server Deleted!");
    };

    const handleReject = () => {
        setIsModalOpen(false);
        console.log("Server addition rejected.");
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
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
                                        handleRemoveNode(node.position)
                                    }
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ServerModalComponent
                isOpen={isModalOpen}
                onAccept={handleAccept}
                onReject={handleReject}
                onClose={handleClose}
                migrationData={migrationData.data}
                message={
                    isModalOpen
                        ? `Data that will be migrated from ${migrationData.currentServerDetails.name}(Deleted Server) to ${migrationData.nextServerDetails.name}(Next Server)`
                        : ""
                }
            />
        </div>
    );
};

export default ServerListComponent;
