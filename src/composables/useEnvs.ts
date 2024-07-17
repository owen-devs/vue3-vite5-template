/**
 * @method 转换.env环境文件的变量值为正确类型
 */
export function useEnvs() {
    const env = import.meta.env
    const convertEnv: IterableObject = {}

    for (const key in env) {
        if (typeof env[key] === 'string') {
            if (env[key].trim() === '') {
                convertEnv[key] = ''
            } else if (env[key] === 'true') {
                convertEnv[key] = true
            } else if (env[key] === 'false') {
                convertEnv[key] = false
            } else if (parseFloat(env[key]) == env[key]) {
                convertEnv[key] = parseFloat(env[key])
            } else {
                convertEnv[key] = env[key]
            }
        } else {
            convertEnv[key] = env[key]
        }
    }
    return convertEnv
}
