import { initVanroll } from '@ArnieYuan/vanroll_app';

window.addEventListener('load', () => {
    const root = document.getElementById('app-root');
    if (root) {
        const gallery = document.createElement('div');
        gallery.style.display = 'flex';
        gallery.style.flexDirection = 'column';
        gallery.style.alignItems = 'center';
        gallery.style.justifyContent = 'center';
        gallery.style.height = '100%';
        gallery.style.gap = '20px';
        gallery.style.backgroundColor = '#8dd7f2';

        const title = document.createElement('h1');
        title.innerText = 'Select a Category';
        gallery.appendChild(title);

        const categories = [
            { name: 'Find an Animal', file: 'animal.json', icon: '🐾' },
            { name: 'Count', file: 'count.json', icon: '🔢' },
            { name: 'Free Drawing', file: 'drawing.json', icon: '🎨' }
        ];

        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.innerText = `${cat.icon} ${cat.name}`;
            btn.style.padding = '20px 40px';
            btn.style.fontSize = '24px';
            btn.style.borderRadius = '10px';
            btn.style.border = 'none';
            btn.style.backgroundColor = '#fff';
            btn.style.cursor = 'pointer';
            btn.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';

            btn.addEventListener('click', () => {
                gallery.remove();
                initVanroll(root, { activitiesUrl: cat.file });
            });

            gallery.appendChild(btn);
        });

        root.appendChild(gallery);
    } else {
        console.error("app-root not found");
    }

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    }
});
