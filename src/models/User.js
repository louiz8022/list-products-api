import { DataTypes, ForeignKeyConstraintError } from "sequelize";
import { sequelize } from "../config/database";
import { Product } from "./Product";

export const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            len: {
                args: [3, 100],
                msg: "THe name must be betwenn 3 and 100 characters long"
            }

        }
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: {
            msg: "Email already in use"

        },
        validate: {
            isEmail: {
                msg: "Invalid email"
            }
        }
    },
    passwordHash: {
        type: DataTypes.STRING(255),
        allowNull:false,
        field: "password_hash"

    }
}, { tableName:"users",
    timestamps: true,
    underscored:true
})

User.hasMany(Product, {
    ForeignKey: "userId",
    as: "products"
})