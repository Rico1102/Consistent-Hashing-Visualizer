import React, { useEffect } from "react";
import useNodeStore from "../store/nodesMap";
import findXY from "../utils/findPosition";

const CircularMapComponent = () => {
    const state = useNodeStore((state) => state.nodes);
    const nodeCount = useNodeStore((state) => state.nodeCount);
    const addNode = useNodeStore((state) => state.addNodes);
    const radius = 400;
    const smallCircleRadius = 30;
    const totalParts = 100;
    const anglePerPart = 360 / totalParts;
    const smallCirclesCount = 3;

    useEffect(() => {
        if (nodeCount === 0) {
            console.log("State is empty, adding default nodes.");
            for (let i = 0; i < smallCirclesCount; i++) {
                const position = i * 33;
                console.log(`position: ${position}`);

                const serverName = `server-${i + 1}`;
                const { x, y } = findXY(position, anglePerPart, radius);
                addNode(serverName, position, x, y, "blue");
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <svg width={radius * 2.5} height={radius * 2.5} padding={20}>
            {/* Big Circle */}
            <circle
                cx={radius * 1.25}
                cy={radius * 1.25}
                r={radius}
                fill="none"
                stroke="black"
                strokeWidth={4}
            />

            {/* Small Circles */}
            {state.map((node, index) => (
                <circle
                    key={index}
                    cx={node.x}
                    cy={node.y}
                    r={smallCircleRadius}
                    fill="blue"
                >
                    <title>{node.name}</title>
                </circle>
            ))}
        </svg>
    );
};

export default CircularMapComponent;
