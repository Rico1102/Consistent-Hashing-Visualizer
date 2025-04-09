import useSortedNodesHashMapStore from "../store/sortedNodesHashMap";

const findNextServer = (position) => {
    const sortedNodes = useSortedNodesHashMapStore.getState().state;
    const sortedNodesLength = sortedNodes.length;
    for (var i = position; ; i++) {
        if (sortedNodes[i % sortedNodesLength].marked) {
            return sortedNodes[i % sortedNodesLength].uuid;
        }
    }
};

export default findNextServer;
