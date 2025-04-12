import React, { useEffect, useState } from "react";
import "./ModalComponent.css";

const DataModalComponent = ({ isOpen, onClose, serverName }) => {
    const [remainingTime, setRemainingTime] = useState(5); // Timer starts at 5 seconds

    useEffect(() => {
        if (isOpen) {
            setRemainingTime(5); // Reset the timer when the modal opens
            const timer = setInterval(() => {
                setRemainingTime((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        onClose(); // Automatically close the modal when the timer reaches 0
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);

            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>New Data is added to Server : {serverName}</h2>
                <button className="close-button" onClick={onClose}>
                    Close ({remainingTime}s)
                </button>
            </div>
        </div>
    );
};

export default DataModalComponent;
