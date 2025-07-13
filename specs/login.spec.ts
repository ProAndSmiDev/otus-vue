import { describe, it, expect, beforeEach } from 'vitest'
import {useAuth} from "@composables/useAuth";

describe('Тест функции «login»', () => {
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

    it('Авторизует пользователя при корректных данных', () => {
        const { isAuth, login } = useAuth()

        const result = login('admin', '1q2w3e4R')

        expect(result).toBeTruthy()
        expect(localStorage.getItem('isAuth')).toBeTruthy()
        expect(isAuth.value).toBeTruthy()
    })

    it('Не авторизует пользователя при некорректных данных', () => {
        const { isAuth, login } = useAuth()

        const result = login('user', 'wrong_password')

        expect(result).not.toBeTruthy()
        expect(localStorage.getItem('isAuth')).not.toBeTruthy()
        expect(isAuth.value).not.toBeTruthy()
    })
})
