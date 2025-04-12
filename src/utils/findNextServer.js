import useSortedNodesHashMapStore from "../store/sortedNodesHashMap";
import useNodeStore from "../store/nodesMap";

const findNextServer = (position) => {
    const sortedNodes = useSortedNodesHashMapStore.getState().cells;
    const nodeStore = useNodeStore.getState().nodes;
    const sortedNodesLength = sortedNodes.length;
    for (var i = position; ; i++) {
        if (sortedNodes[i % sortedNodesLength].marked) {
            return {
                uuid: sortedNodes[i % sortedNodesLength].uuid,
                position: i % sortedNodesLength,
                serverDetail: nodeStore.find(
                    (node) =>
                        node.id === sortedNodes[i % sortedNodesLength].uuid
                ),
            };
        }
    }
};

export default findNextServer;
