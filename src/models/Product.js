module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      description: DataTypes.STRING(45),

      price: {
        type: DataTypes.DECIMAL(10, 2).UNSIGNED,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      timestamps: false, // add columns createdAt updatedAt
      underscored: true,
    }
  );

  Product.associate = (db) => {
    Product.hasMany(db.OrderItem, {
      foreignKey: {
        allowNull: false,
        name: "productId",
      },
    });
  };
  return Product;
};
