'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pembelian extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pembelian.belongsTo(models.Barang,{
        foreignKey: 'barang_id'
      });
      Pembelian.belongsTo(models.User,{
        foreignKey: 'user_id'
      });
    }
  }
  Pembelian.init({
    barang_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    payment_method: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Pembelian',
  });
  return Pembelian;
};
