"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // Kalau mau, bisa tambah method atau relasi di sini
    static associate(models) {
      // contoh relasi: this.hasMany(models.Post);
      User.hasMany(models.Transaction, {
        foreignKey: "userId",
        as: "transactions",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      User.hasMany(models.Source, {
        foreignKey: "userId",
        as: "sources",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // generate UUID dari sisi Node.js
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users", // sesuaikan dengan nama tabel di migration
      timestamps: true, // createdAt dan updatedAt otomatis
    }
  );

  return User;
};
