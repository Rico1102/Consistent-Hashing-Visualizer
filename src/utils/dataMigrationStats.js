import useSortedNodesHashMapStore from "../store/sortedNodesHashMap";
import useNodeStore from "../store/nodesMap";
import findPrevServer from "./findPrevServer";
import findNextServer from "./findNextServer";
import dbStore from "../store/nodesStorage";
import getHash from "./getHash";

export const migrationStatsOnServerAddition = (position) => {
    const prevServer = findPrevServer(position);
    const nextServer = findNextServer(position);
    console.log(`Previous Server Position: ${prevServer.position}`);
    console.log(`Next Server Position: ${nextServer.position}`);
    const serverDetails = useSortedNodesHashMapStore.getState().cells;
    const serverStorage = dbStore.getState().nodesStorage;
    const nodeStore = useNodeStore.getState().nodes;
    const nextServerStorage = serverStorage[nextServer.uuid] || [];
    const nextServerNodeDetail = nodeStore.find(
        (node) => node.id === nextServer.uuid
    );
    if (!nextServerNodeDetail) {
        console.error("Next server node detail not found.");
        return;
    }
    const dataToMigrate = [];
    for (let i = 0; i < nextServerStorage.length; i++) {
        const data = nextServerStorage[i];
        const hashPosition = getHash(data.id);
        if (hashPosition <= position && hashPosition > prevServer.position) {
            dataToMigrate.push(data);
        }
    }
    console.log(
        `Data to migrate from ${nextServer} to ${serverDetails[position].uuid}:`,
        dataToMigrate
    );
    return { data: dataToMigrate, oldServerDetails: nextServerNodeDetail };
};
