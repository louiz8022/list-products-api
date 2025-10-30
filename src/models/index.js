import { sequelize } from "../config/database"
import { Product } from "./Product"
import { User } from "./User"

const models = { User, Product}

sequelize.sync({alter: true})
.then(() => console.log("Sync models"))
.catch((error) => console.error("Sync error", error))

export {sequelize, User, Product }
export default models