import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { User } from "./User";

export const  Product = sequelize.define("Product", {
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
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull:false,
            validate: {
                min: {
                    args: [0.01],
                    msg: "The price must be greater than zero."

                }
            }
        }

}, {
    tableName: "products",
    timestamps: true,
    underscored: true,
    paranoid:true 

}
)

Product.belongsTo(User, {
    foreignKey: "userId",
    as: "createdBy",
    onDelete:"CASCADE"
})