
const User = require("./model");

const userController = {
    getAll: async (req, res) => {
        try {
            res.send(await User.findAll());
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    getById: async (req, res) => {
        try {
            let user = await User.findByPk(parseInt(req.params.id));
            if (user !== null) 
                res.status(200).send(user);
            else
                res.status(404).send("Not Found");
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    delete: async (req, res) => {
        try {
            let deletedUser = await User.findByPk(parseInt(req.params.id));
            if (deletedUser) {
                await deletedUser.destroy();
                res.send(deletedUser);
            } 
            else 
                res.status(404).send("Not Found");
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    post: async (req, res) => {
        try {
            let newUser = await User.create(req.body);
            res.send(newUser);
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    patch: async (req, res) => {
        try {
            let updatedUser = await User.findByPk(parseInt(req.params.id));
            if (updatedUser) {
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

module.exports = userController;