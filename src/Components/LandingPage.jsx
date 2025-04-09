import React from "react";
import "./LandingPage.css"; // Import CSS for styling

const LandingPage = () => {
    return (
        <div className="landing-page">
            <div style={{ marginTop: "20px", padding: "20px" }}>
                <h2>Consistent Hashing Visualization</h2>
                <p>
                    This application visualizes consistent hashing using a
                    circular map. You can add nodes and see their distribution
                    on the circle.
                </p>
                <p>
                    The nodes are represented as small circles on the
                    circumference of a larger circle. The position of each node
                    is determined by its hash value.
                </p>
                <p>
                    You can add nodes using the form above. The nodes will be
                    displayed on the circular map.
                </p>
                <p>
                    This visualization helps in understanding how consistent
                    hashing works and how nodes are distributed in a hash table.
                </p>
                <p>
                    The application is built using React and Zustand for state
                    management.
                </p>
                <p>
                    Feel free to explore and add nodes to see how the
                    distribution changes!
                </p>
            </div>
        </div>
    );
};

export default LandingPage;
