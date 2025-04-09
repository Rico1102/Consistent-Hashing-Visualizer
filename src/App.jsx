import "./App.css";
import CircularMapComponent from "./Components/CircularMapComponent";
import DatabaseVisualizationComponent from "./Components/DatabaseVisualizationComponent";
import ManageNodesComponent from "./Components/ManageNodesComponent";

function App() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
            }}
        >
            <div style={{ flex: 2 }}>
                <DatabaseVisualizationComponent />
            </div>
            <div
                style={{
                    flex: 6,
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                }}
            >
                <CircularMapComponent />
            </div>
            <div style={{ flex: 2 }}>
                <ManageNodesComponent />
            </div>
        </div>
    );
}

export default App;
