import React, { useState } from "react";
import "./DatabaseVisualizationComponent.css";
import useNodeStore from "../store/nodesMap";
import dbStore from "../store/nodesStorage";

const DatabaseVisualizationComponent = () => {
    const [selectedNodeId, setSelectedNodeId] = useState("");
    const [selectedNodeName, setSelectedNodeName] = useState("");
    const [data, setData] = useState({});
    const nodes = useNodeStore((state) => state.nodes);

    const handleNodeChange = (event) => {
        setSelectedNodeId(event.target.value);
        setSelectedNodeName(
            event.target.options[event.target.selectedIndex].text
        );
        setData(dbStore.getState().nodesStorage[event.target.value] || {});
    };

    return (
        <div className="database-visualization-component">
            <h2>Database Visualization</h2>
            <div className="dropdown-container">
                <label htmlFor="node-select">Select Node:</label>
                <select
                    id="node-select"
                    value={selectedNodeId}
                    onChange={handleNodeChange}
                >
                    <option value="">--Select a Node--</option>
                    {nodes.map((node) => {
                        return (
                            <option key={node.id} value={node.id}>
                                {node.name}
                            </option>
                        );
                    })}
                </select>
            </div>
            {selectedNodeId && (
                <div className="table-container">
                    <h3>Data for {selectedNodeName}</h3>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default DatabaseVisualizationComponent;
