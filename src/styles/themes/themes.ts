export const themes = {
    default: {
        colors: {
            bg: '#FFFFFF',
            bg0: '#F0F0F0',
            bg1: '#dbdbdb',
            bg2: '#F2F2F2',
            bg5: '#f5f5f5',
            bg6: '#e6e6e6',
            bg9: '#F9F9F9',
            bgb2: '#b2b2b2',
            bg1a: '#1a1a1a',
            bg54: '#545c64',
            bg4a: '#4a4a4a',
            sidebar: '#3E404C',
            base: '#2793ff',
            base0: '#1185f8',
            dark0: '#000',
            dark3: '#333',
            dark5: '#555',
            dark6: '#666',
            dark9: '#999',
            darkc: '#ccc',
            darkc5: '#c5c5c5'
        }
    },
    vue: {
        colors: {
            bg: '#FFFFFF',
            bg0: '#F0F0F0',
            bg1: '#dbdbdb',
            bg2: '#F2F2F2',
            bg5: '#f5f5f5',
            bg6: '#e6e6e6',
            bg9: '#F9F9F9',
            bgb2: '#b2b2b2',
            bg1a: '#1a1a1a',
            bg54: '#545c64',
            bg4a: '#4a4a4a',
            sidebar: '#3E404C',
            base: '#42b883',
            base0: '#32b883',
            dark0: '#000',
            dark3: '#333',
            dark5: '#555',
            dark6: '#666',
            dark9: '#999',
            darkc: '#ccc',
            darkc5: '#c5c5c5'
        }
    }
}

export function getCurrentThemeSafeList(): string[] {
    let allColors: string[] = []
    Object.values(themes).forEach((v) => {
        Object.keys(v.colors).forEach((c) => {
            if (!allColors.includes(`c-${c}`)) {
                allColors.push(`c-${c}`)
            }
        })
    })
    return allColors
}
