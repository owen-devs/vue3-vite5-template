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
import type { Theme } from 'unocss/preset-uno'
import { presetTheme } from 'unocss-preset-theme'

import { themes } from './src/styles/themes/themes'
import { dynamicIcons } from './src/styles/dynamicIcons'

export default defineConfig({
    shortcuts: {
        'keep-all': 'ws-nowrap break-keep',
        'text-exceed': 'truncate break-keep'
    },
    safelist: [...dynamicIcons],
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
        presetUno(),
        presetAttributify(),
        presetIcons(),
        presetTypography(),
        presetWebFonts({
            fonts: {
                // ...
            }
        }),
        // presetTheme<Theme>({
        //     theme: themes,
        //     prefix: '--un-theme',
        //     selectors: {
        //         default: '.default',
        //         vue: '.vue'
        //     }
        // })
        presetTheme<Theme>({ theme: themes })
    ],
    transformers: [transformerDirectives(), transformerVariantGroup()]
})
