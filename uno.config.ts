import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetTypography,
    presetWebFonts,
    transformerDirectives,
    transformerVariantGroup
} from 'unocss'
import presetWind3 from '@unocss/preset-wind3'
import presetTheme from 'unocss-preset-theme'

import { themes, getCurrentThemeSafeList } from './src/styles/themes/themes'
import { dynamicIcons } from './src/styles/dynamicIcons'

export default defineConfig({
    shortcuts: {
        'keep-all': 'ws-nowrap break-keep',
        'text-exceed': 'truncate break-keep'
    },
    safelist: [...dynamicIcons, ...getCurrentThemeSafeList()],
    theme: {
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
        presetWind3(),
        presetAttributify(),
        presetIcons(),
        presetTypography(),
        presetWebFonts({
            fonts: {
                // ...
            }
        }),
        presetTheme({
            theme: themes,
            prefix: '--un-theme',
            selectors: { default: ':root.default', vue: ':root.vue' }
        })
    ],
    transformers: [transformerDirectives(), transformerVariantGroup()]
})
