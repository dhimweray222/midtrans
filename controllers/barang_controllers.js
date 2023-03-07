const { Barang } = require('../models');
const {Op} = require('sequelize')

class BarangController {
    static async create(req, res, next) {
        try {
            const {
                name,
                price,
                stock,
                category
            } = req.body;

            const [barang, created] = await Barang.findOrCreate({
                where: {
                name,
                price,
                stock,
                category
                },
            });
            console.log(created)
            if (created) {
                res.status(200).json({
                    message: 'Successfully Create Barang',
                    barang,
                });
            } else {
                throw {
                    status: 403,
                    message: 'Data barang sudah ada',
                };
            }
        } catch (err) {
            next(err);
        }
    }

    static async getAll(req, res, next) {
      try {
        const barang = await Barang.findAll();
        res.status(200).json(barang);
      } catch (err) {
        next(err);
      }
    }


    static async hardDelete(req, res, next) {
        try {
            const { id } = req.params;
            const barang = await Barang.findOne({
                where: {
                    id,
                },
                paranoid: false,
            });
            if (barang) {
                await barang.destroy({ force: true });
                res.status(200).json({
                    message: 'Successfully delete permanently',
                    barang: barang,
                });
            } else {
                throw {
                    status: 404,
                    message: 'Barang not found',
                };
            }
        } catch (err) {
            next(err);
        }
    }
    static async search(req, res, next){
        try {
            const searchQuery = req.params.searchQuery
            const data = await Barang.findAll({
            where : {
              [Op.or]: [
                { name: { [Op.like]: `%${searchQuery}%` } },
                { category: { [Op.like]: `%${searchQuery}%` } }
              ]
            }
            });
            res.status(200).json({
                message:'success',
                data: data
            })
        } catch (err) {
            next(err)
        }
    }
}


module.exports = BarangController;
