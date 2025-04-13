import React from "react";
import "./ModalComponent.css";

const ServerModalComponent = ({
    isOpen,
    onAccept,
    onReject,
    onClose,
    migrationData,
    message,
}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="table-container">
                    <h3>{message}</h3>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {migrationData &&
                                migrationData.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                <h3>Confirm Action</h3>
                <p>Are you sure you want to add this server?</p>
                <div className="modal-buttons">
                    <button className="accept-button" onClick={onAccept}>
                        Accept
                    </button>
                    <button className="reject-button" onClick={onReject}>
                        Reject
                    </button>
                </div>
                <button className="close-button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default ServerModalComponent;
