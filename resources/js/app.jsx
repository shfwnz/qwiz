import React from "react";
import ReactDOM from "react-dom/client";

function App() {
    return (
        <div className="text-center text-2xl font-bold text-blue-600">
            Hello, React in Laravel!
        </div>
    );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
