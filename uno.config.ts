import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetTypography,
    presetUno,
    presetWebFonts,
    transformerDirectives,
    transformerVariantGroup
} from 'unocss'

import { dynamicIcons } from './src/styles/dynamicIcons'

export default defineConfig({
    shortcuts: {
        'keep-all': 'ws-nowrap break-keep',
        'text-exceed': 'truncate break-keep'
    },
    safelist: [...dynamicIcons],
    theme: {
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
        },
        font: {
            base: '16px',
            root: '16px'
        },
        height: {
            td: '60px',
            th: '60px'
        },
        width: {
            drawer: '680px'
        }
    },
    rules: [
        [
            /^font-(.*)$/,
            ([, c], { theme }) => {
                if (theme.font[c]) return { 'font-size': theme.font[c] }
            }
        ],
        [
            /^h-(.*)$/,
            ([, c], { theme }) => {
                if (theme.height[c]) return { height: theme.height[c] }
            }
        ],
        [
            /^w-(.*)$/,
            ([, c], { theme }) => {
                if (theme.width[c]) return { width: theme.width[c] }
            }
        ]
    ],
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons(),
        presetTypography(),
        presetWebFonts({
            fonts: {
                // ...
            }
        })
    ],
    transformers: [transformerDirectives(), transformerVariantGroup()]
})
