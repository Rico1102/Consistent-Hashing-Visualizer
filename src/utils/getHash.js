const getHash = (id) => {
    return id % 100; // Hash function to map the id to a position in the range of 0-99
};

export default getHash;
