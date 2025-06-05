<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Leaderboard from "./pages/leaderboard";
import Premium from "./pages/premium";

const rootElement = document.getElementById("app");

function App() {
    return <div className="underline">Welcome</div>;
}

if (!rootElement.hasAttribute("data-react-root")) {
    const root = ReactDOM.createRoot(rootElement);
    rootElement.setAttribute("data-react-root", "true");
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route index element={<App />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/premium" element={<Premium />} />
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    );
}
=======
import React, {useEffect, useState} from "react";
import Leaderboard from "./pages/leaderboard";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ParticlesBackground from "@/components/ParticleBackground";
import Header from "@/components/header";
import SearchBar from "@/components/search_bar";
import Items from "@/components/items";
import Footer from "@/components/footer";
import "../css/app.css";

const root = document.getElementById("app");

function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const [clicked, setClicked] = useState();

    return (
        <div className="relative text-white right-0 left-0 bottom-0 p-4 min-h-screen min-w-full font-bold font-handjet">
            <ParticlesBackground/>

            <div className="relative top-5 space-y-8 h-[200px] md:min-h-[180px] min-w-full z-50">
                <Header />
                <div className="relative min-w-full md:pl-10">
                    <h3 className="text-[30px]">Daftar Quizzies</h3>
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} clicked={clicked} setClicked={setClicked}/>
                </div>
            </div>

            <Items searchTerm={searchTerm} clicked={clicked}/>

            <Footer />
          </div>
    )
}

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <Routes>
            <Route index element={<App />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/premium" element={<ParticlesBackground />} />
        </Routes>
    </BrowserRouter>
);
>>>>>>> tuanbeliau-main
