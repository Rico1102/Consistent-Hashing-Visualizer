import "./ManageNodesComponent.css";
import AddDataComponent from "./AddDataComponent";
import AddServerComponent from "./AddServerComponent";
import ServerListComponent from "./ServerListCompoent";

const ManageNodesComponent = () => {
    return (
        <div className="container">
            <AddServerComponent />

            <ServerListComponent />

            <AddDataComponent />
        </div>
    );
};

export default ManageNodesComponent;
