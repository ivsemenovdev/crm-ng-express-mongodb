const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {
        //Пользователь найден, проверка пароля
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if (passwordResult) {
            //Пароли совпали, генерируем токен
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id,
            }, keys.jwt, {expiresIn: 3600});
            res.status(200).json({
                token: `Bearer ${token}`
            });
        } else {
            //Пароли не совпали
            res.status(401).json({
                message: 'Неправильный пароль'
            });
        }
    } else {
        //Пользователя нет, ошибка
        res.status(404).json({
            message: 'Пользователь с таким email не найден'
        });
    }

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
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;

        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });

        //Записываем пользователя в БД
        try {
            await user.save();
            //отправляем ответ в случае успеха
            res.status(201).json(user);
        } catch (e) {
            //обработка ошибки
            errorHandler(res, e);
        }

    }

}
