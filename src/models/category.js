module.exports = (sequelize, DataTypes) => {
  const type = ["Expense", "Income"];
  const Category = sequelize.define(
    "Category",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      type: {
        type: DataTypes.ENUM(...type),
        allowNull: false,
        defaultValue: type[0]
      }
    },
    {
      underscored: true
    }
  );

  Category.associate = models => {
    Category.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

    Category.hasMany(models.Transaction, {
      foreignKey: {
        name: "categoryId",
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
  };
  return Category;
};
