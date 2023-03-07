const {Todo} = require('../models')

class TodoControllers {
  static async createTodo(req, res, next){
    try {
      const {userId, name, deskripsi} = req.body
      let todo = await Todo.create({ userId, name, deskripsi});
      if(todo){
        res.status(200).json({
          message: 'Successfully Create Todo',
          todo,
        });
      } else {
          throw {
            tatus : 401,
            message : "Create Failed!",
        }
      }

    } catch (err) {
      next(err)

    }
  }

}

module.exports = TodoControllers
