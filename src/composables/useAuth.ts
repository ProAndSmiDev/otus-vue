import { ref } from 'vue';

export function useAuth() {
    const isAuth = ref(localStorage.getItem('isAuth') === 'true');

    const login = (username: string, password: string) => {
        if (username === 'admin' && password === '1q2w3e4R') {
            localStorage.setItem('isAuth', 'true')
            isAuth.value = true
            return true
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem('isAuth');
        isAuth.value = false
    };

    return {
        isAuth,
        login,
        logout,
    };
}
