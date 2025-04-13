import useSortedNodesHashMapStore from "../store/sortedNodesHashMap";

const findPrevServer = (position) => {
    const pos = parseInt(position, 10);
    const sortedNodes = useSortedNodesHashMapStore.getState().cells;
    const sortedNodesLength = sortedNodes.length;
    for (var i = pos - 1; ; i--) {
        if (sortedNodes[i % sortedNodesLength].marked) {
            return {
                uuid: sortedNodes[i % sortedNodesLength].uuid,
                position: i % sortedNodesLength,
            };
        }
    }
};

export default findPrevServer;
