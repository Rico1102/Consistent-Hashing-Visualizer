import "./ManageNodesComponent.css";
import useNodeStore from "../store/nodesMap";
import AddDataComponent from "./AddDataComponent";
import AddServerComponent from "./AddServerComponent";

const ManageNodesComponent = () => {
    const state = useNodeStore((state) => state.nodes);
    const removeNode = useNodeStore((state) => state.removeNode);

    const handleRemoveNode = (nodeId) => {
        removeNode(nodeId);
    };

    return (
        <div className="container">
            <AddServerComponent />

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

            <AddDataComponent />
        </div>
    );
};

export default ManageNodesComponent;
