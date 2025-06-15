import { defineStore } from 'pinia';
import { ref} from 'vue';

export const useSettingsStore = defineStore('settings', () => {
    const theme = ref('light');
    const title = ref('深色模式');
    const darkModeEnabled = ref(false);

    function setTheme() {
        if (theme.value === 'light') {
            theme.value = 'dark';
            title.value = '浅色模式';
            return;
        }
        if (theme.value === 'dark') {
            theme.value = 'light';
            title.value = '深色模式';
        }
    }

    return {
        theme,
        title,
        darkModeEnabled,
        setTheme
    };
});