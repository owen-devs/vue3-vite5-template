import { themes } from '@/styles/themes/themes'

export function useTheme() {
    const allTheme = Object.keys(themes) as Array<keyof typeof themes>
    const theme = useLocalStorage('theme', allTheme[0] || 'default')

    const syncTheme = () => {
        document.documentElement.className = theme.value || 'default'
    }

    const setTheme = (newTheme: (typeof allTheme)[number]) => {
        theme.value = allTheme.includes(newTheme) ? newTheme : 'default'
        syncTheme()
    }

    const getTheme = () => {
        return theme.value || 'default'
    }

    const themeModel = computed({
        get: () => {
            return theme.value
        },
        set: (val) => {
            setTheme(val)
        }
    })

    return {
        themeValue: theme.value,
        themeModel,
        getTheme,
        syncTheme,
        setTheme
    }
}
