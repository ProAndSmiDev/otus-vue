export function useValidation() {
    const validateName = (value: string) => value ? true : 'Введите свое имя!';

    const validateEmail = (value: string) => {
        if (!value) return 'Поле "*E-mail" обязательно';
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return regex.test(value) ? true : 'Введено некорректное значение поля "Email"';
    };

    const validatePhone = (value: string) => {
        if (!value) return 'Введите номер телефона!';
        const regex = /^\+\d \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
        return regex.test(value) ? true : 'Вы ввели некорректное значение поля "Телефон"';
    };

    const validateAddress = (value: string) => value ? true : 'Введите корректный адрес доставки!';

    const validateAgreement = (value: string) => value ? true : 'Необходимо согласиться с обработкой персональных данных!';

    return {
        validateName,
        validateEmail,
        validatePhone,
        validateAddress,
        validateAgreement,
    }
}
