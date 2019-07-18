const keys = require('../keys');

module.exports = function(email, token) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Восстановаление пароля',
        html: `
            <h1>Вы забли пароль!</h1>
            <p>Пройдите по ссылке для восстаовления пароля.</p>
            <p><a href="${keys.BASE_URL}/auth/password/${token}">Восстановить пароль</a></p>.
            <hr />
            <a href="${keys.BASE_URL}">Магазин</a>
        `
    }
}