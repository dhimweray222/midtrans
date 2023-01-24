const jwt = require('jsonwebtoken');
const { User } = require('../models');


const authentication = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw {
                status: 401,
                message: 'Unauthorized request',
            };
        } else {
            const token = req.headers.authorization;
            let decoded = jwt.verify(token, 'coba');

            let user = await User.findOne({where:{id:decoded.id}})
            if (user) {
                req.user = user;
                next();
            } else {
                throw {
                    status: 401,
                    message: 'Unauthorized request',
                };
            }
        }
    } catch (err) {
        next(err);
    }
};

module.exports = {
    authentication,
};
