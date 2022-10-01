module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      amount: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2).UNSIGNED,
        allowNull: false,
      },
      discount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
      underscored: true,
    }
  );

  OrderItem.associate = (db) => {
    OrderItem.belongsTo(db.Order, {
      foreignKey: {
        name: "orderId",
        allowNull: false,
      },
    });
    OrderItem.belongsTo(db.Product, {
      foreignKey: {
        name: "productId",
        allowNull: false,
      },
    });
  };

  return OrderItem;
};
