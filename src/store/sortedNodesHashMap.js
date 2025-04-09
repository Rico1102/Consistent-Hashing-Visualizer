import { create } from "zustand";

const useSortedNodesHashMapStore = create((set) => ({
    state: Array(100)
        .fill(null)
        .map(() => ({ marked: false, uuid: null })),
    markCell: (index, uuid) =>
        set((state) => {
            if (index < 0 || index >= state.state.length) {
                throw new Error("Index out of bounds");
            }
            const newState = [...state.state];
            newState[index] = { marked: true, uuid: uuid };
            return { state: newState };
        }),
    unmarkCell: (index) =>
        set((state) => {
            if (index < 0 || index >= state.state.length) {
                throw new Error("Index out of bounds");
            }
            const newState = [...state.state];
            newState[index] = { marked: false, uuid: null };
            return { state: newState };
        }),
    reset: () =>
        set(() => ({
            state: Array(100)
                .fill(null)
                .map(() => ({ marked: false, uuid: null })),
        })),
}));
export default useSortedNodesHashMapStore;
