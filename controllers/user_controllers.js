const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


class AuthController {
    static async register(req, res, next) {
        try {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            const user = await User.findOne({
                where: {
                    email: req.body.email,
                },
            });

            if (user) {
                throw {
                    status: 401,
                    message: 'Email already used',
                };
            } else {
                const {firstName,lastName,email} = req.body;
                await User.create({
                    firstName,
                    lastName,
                    email,
                    password: hash
                });

                const userAfterCreate = await User.findOne({
                    attributes: ['id', 'email', 'firstName', 'lastName'],
                    where: {
                        email: req.body.email,
                    },
                });
                res.status(200).json({
                    message: 'Successfully Create User',
                    user: userAfterCreate,
                });
            }
        } catch (err) {
            next(err);
        }
    }
    static async login(req, res, next) {
        try {
            const params = req.body.email;
            const user = await User.findOne({
                where: {
                    email: params,
                },
            });
            if (user) {
              const{id,email} = user
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const token = jwt.sign({id,email}, 'coba');
                    res.status(200).json({
                        token,
                    });
                } else {
                    throw {
                        status: 400,
                        message: 'Invalid email or password',
                    };
                }
            } else {
                throw {
                    status: 400,
                    message: 'Invalid email or password',
                };
            }
        } catch (err) {
            next(err);
        }
    }
}


module.exports = AuthController;
