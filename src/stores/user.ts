import { getCurrentUser } from '@/api/user'
export const useUserInfoStore = defineStore('UserInfo', {
    state: () => ({
        userInfo: {}
    }),
    actions: {
        async getUserInfo() {
            if (Object.keys(this.userInfo).length > 0) {
                return this.userInfo
            }
            return (this.userInfo = await getCurrentUser({}))
        },
        setUserInfo(row: any) {
            this.userInfo = row
        }
    }
})
