import { createApp } from 'vue';
import SilverstripeDatepicker from './SilverstripeDatepicker.vue';
import { watchElement } from '@/utils';

// needed to make sure app is mounted on dynamic content loaded
watchElement('.level51SilverstripeDatepicker-mount', (el: HTMLElement) => {
    setTimeout(() => {
        const payload = el.dataset?.payload ? JSON.parse(el.dataset.payload as string) : null;
        createApp(SilverstripeDatepicker, payload).mount(`#${el.id}`);
    });
});

export { SilverstripeDatepicker };
