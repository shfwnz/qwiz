import { useLocation } from 'react-router-dom';

export default function Footer() {
    const location = useLocation(); // Dapatkan path halaman saat ini

    const menuItems = [
        {
            src: 'http://127.0.0.1:8000/storage/assets/Home.png',
            label: 'Home',
            path: '/',
        },
        {
            src: 'http://127.0.0.1:8000/storage/assets/Quiz.png',
            label: 'Quiz',
            path: '/quiz',
        },
        {
            src: 'http://127.0.0.1:8000/storage/assets/Leaderboard.png',
            label: 'Leaderboard',
            path: '/leaderboard',
        },
        {
            src: 'http://127.0.0.1:8000/storage/assets/User.png',
            label: 'You',
            path: '/profile',
        },
    ];

    return (
        <div className="fixed bottom-0 left-0 w-screen min-h-[60px] bg-[#0D1520] rounded-lg grid grid-cols-4 text-center text-white py-2">
            {menuItems.map((item, index) => {
                const isActive = location.pathname === item.path; // Cek apakah path aktif

                return (
                    <div
                        key={index}
                        className={`flex flex-col items-center space-y-1 p-2 ml-3 mr-3 rounded-lg transition duration-300
                        ${isActive ? 'bg-[#1A2535]' : 'hover:bg-[#1A2535]'}`}
                    >
                        <img
                            className="w-6 h-6"
                            src={item.src}
                            alt={item.label}
                        />
                        <p className="text-sm">{item.label}</p>
                    </div>
                );
            })}
        </div>
    );
}
