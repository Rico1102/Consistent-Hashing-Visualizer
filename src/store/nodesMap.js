import { create } from "zustand";
import { persist } from "zustand/middleware";
import useSortedNodesHashMapStore from "./sortedNodesHashMap";
import dbStore from "./nodesStorage";

// This store is used to manage the state of the nodes in the application.
// Structure of the nodes is as follows:
// {
//     uuid: string, // Unique identifier for the node
//     name: string, // User friendly name for the node
//     position: x,  // Position of the node on the circle
//     color: string, // Color of the node
// }

const useNodeStore = create(
    persist(
        (set) => ({
            nodes: [],
            nodeCount: 0,
            addNodes: (id, name, position, x, y, color) => {
                set((state) => {
                    console.log(
                        "Adding node:",
                        id,
                        name,
                        position,
                        x,
                        y,
                        color
                    );
                    return {
                        nodes: [
                            ...state.nodes,
                            {
                                id: id,
                                name,
                                position,
                                x,
                                y,
                                color,
                            },
                        ],
                        nodeCount: state.nodeCount + 1,
                    };
                });
                dbStore.getState().addNode(id); // Add the node to the storage
                useSortedNodesHashMapStore.getState().markCell(position, id); // Mark the cell in the sorted nodes hash map
            },
            removeNode: (uuid) => {
                console.log("Removing node:", uuid);
                set((state) => ({
                    nodes: state.nodes.filter((node) => node.id !== uuid),
                    nodeCount: state.nodeCount - 1,
                }));
                dbStore.getState().removeNode(uuid); // Remove the node from the storage
            },
        }),
        {
            name: "nodeStore", // key in localStorage
        }
    )
);

export default useNodeStore;
