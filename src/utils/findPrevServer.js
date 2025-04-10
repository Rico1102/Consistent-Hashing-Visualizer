import useSortedNodesHashMapStore from "../store/sortedNodesHashMap";

const findPrevServer = (position) => {
    const sortedNodes = useSortedNodesHashMapStore.getState().cells;
    const sortedNodesLength = sortedNodes.length;
    for (var i = position; ; i--) {
        if (sortedNodes[i % sortedNodesLength].marked) {
            return {
                uuid: sortedNodes[i % sortedNodesLength].uuid,
                position: i % sortedNodesLength,
            };
        }
    }
};

export default findPrevServer;
