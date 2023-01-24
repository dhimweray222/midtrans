const { Pembelian, Barang } = require('../models');
const midtransClient = require('midtrans-client');
let core = new midtransClient.CoreApi({
    isProduction : false,
    serverKey : 'SB-Mid-server-pFd9pQTXZOCzmJAyx31JKSbD',
    clientKey : 'SB-Mid-client-iRv9Lo0snJ5nyHtd'
});

class BarangController {
    static async create(req, res, next) {
        try {
            const {
                barang_id,
                price,
                quantity,
                payment_method,
            } = req.body;

            const [pembelian, created] = await Pembelian.findOrCreate({
                where: {
                barang_id,
                price,
                quantity,
                payment_method,
                user_id:req.user.id
                },
            });
            if (created) {
                res.status(200).json({
                    message: 'Successfully Create Pembelian',
                    pembelian: pembelian,
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
        const pembelian = await Pembelian.findAll({where:{user_id:req.user.id}});
        res.status(200).json(pembelian);
      } catch (err) {
        next(err);
      }
    }

    static async coreApi(req, res, next){
        const {payment_type,bank,barang_id,quantity} = req.body
        const barang = await Barang.findOne({where:{id:barang_id}})
        console.log(barang.price)
        const data =  {
          payment_type: payment_type,
          bank_transfer: {
            bank: bank
          },
          transaction_details: {
            order_id: barang_id+Date.now()+req.user.id,
            gross_amount: barang.price*quantity
          },
          barang_id:barang_id,
          quantity: quantity
        }
        core.charge(data)
        .then((chargeResponse)=>{
        // console.log('chargeResponse:',JSON.stringify(chargeResponse));
        let payment = chargeResponse
        Pembelian.create({
          barang_id:barang_id,
          price:barang.price,
          quantity:quantity,
          payment_method:`${payment_type}(${bank})`,
          user_id:req.user.id
        })
        res.json({
          status: 200,
          message: "success",
          data: chargeResponse
        })

      })
        .catch((e)=>{
        console.log('Error occured:',e.message);
    });;

    }

    // static async hardDelete(req, res, next) {
    //     try {
    //         const { id } = req.params;
    //         const barang = await Barang.findOne({
    //             where: {
    //                 id,
    //             },
    //             paranoid: false,
    //         });
    //         if (barang) {
    //             await barang.destroy({ force: true });
    //             res.status(200).json({
    //                 message: 'Successfully delete permanently',
    //                 barang: barang,
    //             });
    //         } else {
    //             throw {
    //                 status: 404,
    //                 message: 'Barang not found',
    //             };
    //         }
    //     } catch (err) {
    //         next(err);
    //     }
    // }

    static async nofitikasi(req, res, next){
      coreApi.transaction.notification(notificationJson)
      .then((statusResponse)=>{

      });
    }
}


module.exports = BarangController;
