import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { InertiaProgress } from '@inertiajs/progress';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName =
    window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    resolve: name => {
        // Try multiple possible paths
        const pages = import.meta.glob('./pages/**/*.jsx');

        const possiblePaths = [
            `./pages/${name}.jsx`,
            `./pages/${name}/Index.jsx`,
            `./pages/auth/${name}.jsx`,
        ];

        for (const path of possiblePaths) {
            if (pages[path]) {
                return pages[path]();
            }
        }

        // Fallback to original resolver
        return resolvePageComponent(`./pages/${name}.jsx`, pages);
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});

InertiaProgress.init();
