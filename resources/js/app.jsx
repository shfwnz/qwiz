import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Leaderboard from "./pages/leaderboard";
import Premium from "./pages/premium";

const rootElement = document.getElementById("app");
const root = ReactDOM.createRoot(rootElement);

function App() {
    return <div className="underline">Welcome</div>;
}

root.render(
    <BrowserRouter>
        <Routes>
            <Route index element={<App />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/premium" element={<Premium />} />
        </Routes>
    </BrowserRouter>
);
