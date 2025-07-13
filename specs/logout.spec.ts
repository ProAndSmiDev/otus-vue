import { describe, it, expect, vi, beforeEach } from 'vitest'
import {useAuth} from "@composables/useAuth";
import {nextTick} from "vue";

const mockRouter = {
    go: vi.fn()
}

vi.mock('vue-router', () => ({
    useRouter: () => mockRouter,
}))

describe('Тест функции «logout»', () => {
    beforeEach(() => {
        const storage = new Map<string, string>()

        Object.defineProperty(global, 'localStorage', {
            value: {
                getItem: (key: string) => storage.get(key) || null,
                setItem: (key: string, value: string) => storage.set(key, value),
                removeItem: (key: string) => storage.delete(key),
                clear: () => storage.clear(),
            },
            configurable: true,
        })
    })

    it('Выходит из учетной записи', async () => {
        const { isAuth, logout } = useAuth()

        localStorage.setItem('isAuth', 'true')
        isAuth.value = true

        logout.value
        await nextTick()

        expect(localStorage.getItem('isAuth')).not.toBeTruthy()
        expect(isAuth.value).not.toBeTruthy()
        expect(mockRouter.go).toHaveBeenCalledWith('/')
    })
})
