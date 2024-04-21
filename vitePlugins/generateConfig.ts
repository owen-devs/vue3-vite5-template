import fs from 'fs'
import path from 'path'

export function generateConfig() {
    let envFilePath = path.resolve(__dirname, `.env.${process.env.NODE_ENV}`)
    let configFilePath = path.resolve(__dirname, 'public/config.js')

    function generateConfigFile() {
        const envContent = fs.readFileSync(envFilePath, 'utf8')
        fs.writeFileSync(configFilePath, envContent, 'utf8')
    }
    console.log(`当前执行环境为${envFilePath}，已自动生成config.js文件到public`)
    return {
        name: 'generate-config-plugin',
        apply: ['serve', 'build'],
        configureServer(server) {
            generateConfigFile()

            fs.watch(envFilePath, (event, filename) => {
                console.log('====>' + filename)
                if (event === 'change' && filename) {
                    generateConfigFile()
                }
            })
        }
    }
}
