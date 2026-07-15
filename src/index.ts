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
        gallery.style.backgroundColor = '#8dd7f2';

        const title = document.createElement('h1');
        title.innerText = 'Select a Category';
        gallery.appendChild(title);

        const btnContainer = document.createElement('div');
        btnContainer.style.display = 'flex';
        btnContainer.style.flexWrap = 'wrap';
        btnContainer.style.gap = '20px';
        btnContainer.style.justifyContent = 'center';
        btnContainer.style.maxWidth = '800px';
        gallery.appendChild(btnContainer);

        const categories = [
            { name: 'Animal', file: 'animal.json', icon: '🐾' },
            { name: 'Count', file: 'count.json', icon: '🔢' },
            { name: 'Drawing', file: 'drawing.json', icon: '🎨' }
        ];

        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.style.width = '150px';
            btn.style.height = '150px';
            btn.style.display = 'flex';
            btn.style.flexDirection = 'column';
            btn.style.alignItems = 'center';
            btn.style.justifyContent = 'center';
            btn.style.fontSize = '24px';
            btn.style.borderRadius = '15px';
            btn.style.border = 'none';
            btn.style.backgroundColor = '#fff';
            btn.style.cursor = 'pointer';
            btn.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            btn.style.gap = '10px';

            const iconSpan = document.createElement('span');
            iconSpan.innerText = cat.icon;
            iconSpan.style.fontSize = '48px';

            const textSpan = document.createElement('span');
            textSpan.innerText = cat.name;

            btn.appendChild(iconSpan);
            btn.appendChild(textSpan);

            btn.addEventListener('click', () => {
                gallery.remove();
                initVanroll(root, { activitiesUrl: cat.file });
            });

            btnContainer.appendChild(btn);
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
