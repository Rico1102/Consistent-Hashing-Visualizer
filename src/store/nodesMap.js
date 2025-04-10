import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
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
    persist((set) => ({
        nodes: [],
        nodeCount: 0,
        addNodes: (name, position, x, y, color) => {
            const id = uuidv4();
            set((state) => {
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
        removeNode: (uuid) =>
            set((state) => ({
                nodes: state.nodes.filter((node) => node.uuid !== uuid),
                nodeCount: state.nodeCount - 1,
            })),
    }))
);

export default useNodeStore;
