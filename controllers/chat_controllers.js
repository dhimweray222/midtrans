const { User,Message } = require('../models');
const { Op } = require("sequelize");

class ChatController {
    static async get_all_user(req, res, next) {
        try {
            const users = await User.findAll({where:{id:{[Op.not]:req.user.id}}})
            if (!users) {
                throw {
                    status: 404,
                    message: 'not found',
                };
            } else {
                res.status(200).json({
                    users
                });
            }
        } catch (err) {
            next(err);
        }
    }
    static async send(req,res,next){
      try {
        const message = await Message.create({
          receiver:req.params.id,
          sender:req.user.id,
          content:req.body.content
        })
        res.status(200).json({
          message
        })
      } catch (err) {
        next(err)
      }
    }
    static async get_all_messages(req,res,next){
      try {
        const messages = await Message.findAll({where:{receiver:req.params.id}})
        res.status(200).json(messages)
      } catch (err) {
        next(err)
      }
    }
}


module.exports = ChatController;
