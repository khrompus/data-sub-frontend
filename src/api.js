// class Api {
//     constructor({baseUrl}) {
//         this._baseUrl = baseUrl;
//
//     }
//
//     _parseResponse(res) {
//         if (res.ok) {
//             return res.json();
//         }
//         return Promise.reject(new Error(`Произошла ошибка со статус-кодом ${res.status}`));
//     }
//
//     sendCard(number, amount, cvv, expiry) {
//         return fetch(`${this._baseUrl}/cards`, {
//             method: 'POST',
//             headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json"
//             }, body: JSON.stringify({
//                 number,
//                 amount,
//                 cvv,
//                 expiry
//                 }
//             )
//         })
//             .then(res => this._parseResponse(res));
//     }
// }
//
// const api = new Api({
//     baseUrl: 'http://localhost:3001'
// })
// export default api


const parseResponse = (response) => {
    if (response.ok) {
        return response.json();
    }

    return Promise.reject(new Error(`Ошибка ${response.status}`));
};

const sendCard = (amount, number, expiry, cvv) => {
    return fetch(`${baseUrl}/cards`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({amount, number, expiry, cvv})
    })
        .then((response) => parseResponse(response));
}
const baseUrl = 'http://localhost:3001'
export {
    sendCard
}
