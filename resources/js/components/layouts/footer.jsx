import { useLocation } from 'react-router-dom';
import { Link, usePage } from '@inertiajs/react';


export default function Footer() {
    const { url } = usePage();

    const menuItems = [
        {
            icon: (
                <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M14 2h-4v2H8v2H6v2H4v2H2v2h2v10h7v-6h2v6h7V12h2v-2h-2V8h-2V6h-2V4h-2V2zm0 2v2h2v2h2v2h2v2h-2v8h-3v-6H9v6H6v-8H4v-2h2V8h2V6h2V4h4z" fill="currentColor"/>
                </svg>
            ),
            label: 'Home',
            path: '/',
        },
        {
            icon: (
                <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M3 3h8v2H3v12h8V5h2v12h8V5h-8V3h10v16H13v2h-2v-2H1V3h2zm16 7h-4v2h4v-2zm-4-3h4v2h-4V7zm2 6h-2v2h2v-2z" fill="currentColor"/>
                </svg>
            ),
            label: 'Quiz',
            path: '/quiz',
        },
        {
            icon: (
                <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M16 3H6v2H2v10h6V5h8v10h6V5h-4V3h-2zm4 4v6h-2V7h2zM6 13H4V7h2v6zm12 2H6v2h12v-2zm-7 2h2v2h3v2H8v-2h3v-2z" fill="currentColor"/>
                </svg>
            ),
            label: 'Leaderboard',
            path: '/leaderboard',
        },
        {
            icon: (
                <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M15 2H9v2H7v6h2V4h6V2zm0 8H9v2h6v-2zm0-6h2v6h-2V4zM4 16h2v-2h12v2H6v4h12v-4h2v6H4v-6z" fill="currentColor"/>
                </svg>
            ),
            label: 'You',
            path: '/profile',
        },
    ];

    return (
        <div className="fixed bottom-0 left-0 w-screen min-h-[60px] bg-[#0D1520] rounded-lg grid grid-cols-4 text-center text-white py-2">
            {menuItems.map((item, index) => {
                const isActive = url === item.path;

                return (
                    <Link
                        href={item.path}
                        key={index}
                        className={`flex flex-col items-center space-y-1 p-2 ml-3 mr-3 rounded-lg transition duration-300
                        ${isActive ? 'bg-[#1A2535]' : 'hover:bg-[#1A2535]'}`}
                    >
                        {item.icon}
                        <p className="text-sm">{item.label}</p>
                    </Link>
                );
            })}
        </div>
    );
}
