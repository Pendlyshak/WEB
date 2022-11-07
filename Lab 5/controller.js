// описуэмо контролер з використанням моделі
const User = require("./model");

const userController = {
    // метод отримання всіх користувачів
    getAll: async (req, res) => {
        try {
            res.send(await User.findAll());
        } catch (e) {
            // у всіх методах в разі помилки надсилаємо відповідне повідомлення
            console.log(e);
            res.status(500).send(e);
        }
    },
    getById: async (req, res) => {
        try {
            // шукаємо користувача по id, яке є primary key
            let user = await User.findByPk(parseInt(req.params.id));
            if (user !== null) 
                //якщо користувач є в базі то надсилаємо його дані
                res.status(200).send(user);
            else
                //інакше надсилаємо 404 
                res.status(404).send("Not Found");
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    delete: async (req, res) => {
        try {
            // шукаємо користувача по id для вилучення
            let deletedUser = await User.findByPk(parseInt(req.params.id));
            if (deletedUser) {
                // якщо користувача знайдено то вилучаємо його
                await deletedUser.destroy();
                res.send(deletedUser);
            } 
            else 
                //інакше надсилаємо 404 
                res.status(404).send("Not Found");
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    post: async (req, res) => {
        try {
            // створюємо та надсилаємо нового користувача на основі даних переданих в тілі запиту
            let newUser = await User.create(req.body);
            res.send(newUser);
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    patch: async (req, res) => {
        try {
            //для оновлення шукаємо користувача по id
            let updatedUser = await User.findByPk(parseInt(req.params.id));
            if (updatedUser) {
                //якщо його знайдено то оновлюємо
                await updatedUser.update(req.body);
                res.send(updatedUser);
            } 
            else 
                res.status(404).send("Not Found");
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    }
};

//експортуємо контролер
module.exports = userController;