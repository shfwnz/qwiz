import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Leaderboard from './pages/leaderboard';
import Premium from './pages/premium';

const rootElement = document.getElementById('app');

function App() {
    return <div className="underline">Welcome</div>;
}

if (!rootElement.hasAttribute('data-react-root')) {
    const root = ReactDOM.createRoot(rootElement);
    rootElement.setAttribute('data-react-root', 'true');
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
