import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSortedNodesHashMapStore = create(
    persist(
        (set) => ({
            cells: Array(100)
                .fill(null)
                .map(() => ({ marked: false, uuid: null })),
            markCell: (index, uuid) =>
                set((state) => {
                    if (index < 0 || index >= state.cells.length) {
                        throw new Error("Index out of bounds");
                    }
                    const newCells = [...state.cells];
                    newCells[index] = { marked: true, uuid: uuid };
                    return { cells: newCells };
                }),
            unmarkCell: (index) =>
                set((state) => {
                    if (index < 0 || index >= state.cells.length) {
                        throw new Error("Index out of bounds");
                    }
                    const newCells = [...state.cells];
                    newCells[index] = { marked: false, uuid: null };
                    return { cells: newCells };
                }),
            reset: () =>
                set(() => ({
                    cells: Array(100)
                        .fill(null)
                        .map(() => ({ marked: false, uuid: null })),
                })),
        }),
        {
            name: "hashMapStore", // key in localStorage
        }
    )
);
export default useSortedNodesHashMapStore;
