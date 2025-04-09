import React from "react";

const CircleWithNodes = () => {
    const bigRadius = 350;
    const smallRadius = 20;
    const numberOfSmallCircles = 12;
    const center = {
        x: bigRadius + smallRadius + 10,
        y: bigRadius + smallRadius + 10,
    };

    const smallCircles = Array.from(
        { length: numberOfSmallCircles },
        (_, i) => {
            const angle = (2 * Math.PI * i) / numberOfSmallCircles;
            const x = center.x + bigRadius * Math.cos(angle);
            const y = center.y + bigRadius * Math.sin(angle);
            return { x, y, label: `S ${i + 1}` };
        }
    );

    const svgSize = 2 * (bigRadius + smallRadius + 10);

    return (
        <div className="flex justify-center items-center h-screen">
            <svg width={svgSize} height={svgSize}>
                {/* Big Circle */}
                <>
                    <circle
                        cx={center.x}
                        cy={center.y}
                        r={bigRadius}
                        fill="none"
                        stroke="black"
                        strokeWidth={2}
                    />
                    <text
                        x={center.x}
                        y={center.y - 10} // Adjust to center vertically
                        textAnchor="middle"
                        fill="black"
                        fontSize="30"
                        fontFamily="Arial"
                        fontWeight="bold"
                    >
                        Consistent HashMap
                    </text>
                </>

                {/* Small Circles */}
                {smallCircles.map((pos, idx) => (
                    <g key={idx}>
                        <circle
                            cx={pos.x}
                            cy={pos.y}
                            r={smallRadius}
                            fill="dodgerblue"
                        />
                        <text
                            x={pos.x}
                            y={pos.y + 4} // Adjust to center vertically
                            textAnchor="middle"
                            fill="white"
                            fontSize="10"
                            fontFamily="Arial"
                        >
                            {pos.label}
                        </text>
                    </g>
                ))}
            </svg>
        </div>
    );
};

export default CircleWithNodes;
