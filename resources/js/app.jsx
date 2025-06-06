import Quizzes from "./pages/quizz/quizzies";
import Leaderboard from "./pages/leaderboard";
import Premium from "./pages/premium";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ParticlesBackground from "@/components/ParticleBackground";
import "../css/app.css";

const root = document.getElementById("app");

function App() {

    return (
        <div>
            <ParticlesBackground/>
          </div>
    )
}

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <Routes>
            <Route index element={<App />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/quiz" element={<Quizzes />} />
        </Routes>
    </BrowserRouter>
);
