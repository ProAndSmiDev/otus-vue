import { ref, Ref } from 'vue'
import {useRouter} from "vue-router"

export function useAuth() {
    const isAuth: Ref<boolean> = ref(localStorage.getItem('isAuth') === 'true')
    const router = useRouter()

    const login = (username: string, password: string): boolean => {
        if (username === 'admin' && password === '1q2w3e4R') {
            localStorage.setItem('isAuth', 'true')
            isAuth.value = true
            return true
        }
        return false;
    };

    const logout = (): void => {
        localStorage.removeItem('isAuth')
        isAuth.value = false
        router.go(0)
    };

    return {
        isAuth,
        login,
        logout,
    };
}
