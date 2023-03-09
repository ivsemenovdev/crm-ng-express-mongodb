const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports.login = function (req, res) {
    res.status(200).json({
        login: {
            email: req.body.email, password: req.body.password
        }
    });
}

module.exports.register = async function (req, res) {

    // email password
    // Проверка - создания пользователя
    // const user = new User({
    //     email: req.body.email,
    //     password: req.body.password
    // });
    //
    // user.save().then( () => {
    //     console.log('User created');
    // });

    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {
        //Пользователь существует, отправляем ошибку
        res.status(409).json({
            message: 'Пользователь с таким email уже зарегистрирован'
        });
    } else {
        //Создаём пользователя
        const key = bcrypt.generateKeySync(10);
        const password = req.body.password;

        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, key)
        });

        //Записываем пользователя в БД
        try {
            await user.save();
            //отправляем ответ в случае успеха
            res.status(201).json(user);
        } catch (e) {
            //обработка ошибки
        }

    }

}
