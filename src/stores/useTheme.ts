export const useThemeStore = defineStore('theme', {
    state: () => ({
        theme: {
            base: 'blue',
            textColor: '#FFF',
            bgcolor: 'blue'
        }
    }),
    getters: {
        getTheme() {
            return useLocalStorage('theme', 'default')
        },
        blue() {
            return {
                colors: {
                    bg: '#FFF',
                    base: 'blue'
                }
            }
        },
        red() {
            return {
                colors: {
                    bg: '#FFF',
                    base: 'red'
                }
            }
        }
    },
    actions: {
        setTheme(name) {}
    }
})
