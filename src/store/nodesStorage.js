import { create } from "zustand";
import { persist } from "zustand/middleware";

const dbStore = create(
    persist((set) => ({
        nodesStorage: {},
        addNode: (uuid) =>
            set((state) => ({
                nodesStorage: {
                    ...state.nodesStorage,
                    [uuid]: [],
                },
            })),
        removeNode: (uuid) =>
            set((state) => {
                const { [uuid]: _, ...rest } = state.nodesStorage;
                return { nodesStorage: rest };
            }),
        addDataToNode: (uuid, data) =>
            set((state) => ({
                nodesStorage: {
                    ...state.nodesStorage,
                    [uuid]: [...state.nodesStorage[uuid], data],
                },
            })),
        removeDataFromNode: (uuid, id) =>
            set((state) => ({
                nodesStorage: {
                    ...state.nodesStorage,
                    [uuid]: state.nodesStorage[uuid].filter(
                        (item) => item.id !== id
                    ),
                },
            })),
    }))
);
export default dbStore;
