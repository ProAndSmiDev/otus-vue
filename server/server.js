const WebSocket = require('ws');

const port = 8080;
const wss = new WebSocket.Server({ port, path: '/countries' });

console.log(`WebSocket сервер запущен на ws://localhost:${port}/countries`);

let initialCountries = [];

wss.on('connection', (ws, req) => {
    console.log('Клиент подключился');

    ws.on('message', (message) => {
        console.log('Получено сообщение:', message);
        const data = JSON.parse(message);

        if (data.type === 'initCountries') {
            // Сохраняем начальные страны
            initialCountries = data.countries;
            console.log('Получены начальные страны:', initialCountries);
        }

        if (data.type === 'getCountries') {
            // Отправляем клиенту список стран
            // Если есть сохранённые initialCountries, отправляем их
            if (initialCountries.length > 0) {
                ws.send(JSON.stringify({ countries: initialCountries }));
            } else {
                // Можно отправлять какой-то дефолт или пустой список
                ws.send(JSON.stringify({ countries: [] }));
            }
        }

        if (data.type === 'addCity') {
            console.log('Добавление города:', data.name);

            // Добавим новую страну, если она есть
            const newCountryCode = data.code;
            const newCountryName = data.name;
            const newCountryEmoji = data.emoji;

            // Проверка, есть ли уже такая страна
            const existingCountry = initialCountries.find(c => c.code === newCountryCode);
            if (!existingCountry) {
                initialCountries.push({ code: newCountryCode, name: newCountryName, emoji: newCountryEmoji});
            } else {
                console.log(`Страна с кодом ${newCountryCode} уже существует.`);
            }

            // После этого отправляем обновленный список всем подключенным клиентам
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: 'getCountries', countries: initialCountries }));
                }
            });
        }
    });

    ws.on('close', () => {
        console.log('Клиент отключился');
    });
});
