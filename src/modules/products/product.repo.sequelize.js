import { Op } from "sequelize"
import { Product } from "../../models/Product"
import { User } from "../../models/User"

export const makeProductRepoSequelize = () => {
    const create = async ({ name, price, createdBy }) => {
        const product = await Product.create({
            name,
            price,
            userId: createdBy

        })
        return product.toJson()
    }

    const findAll = async ({ q, order, dir, page, limit }) => {
        const where = {}

        if (q) {
            where.name = { [Op.like]: `%${q}` }
        }

        const offset = (page - 1) * limit

        const { count, rows } = await Product.findAndCountAll({
            where,
            include: [{
                model: User,
                as: "createdBy",
                attributes: ["id", "name"]

            }],
            limit,
            offset,
            order: [[order, dir]]
        })
        return {
            items: rows.map(p => p.toJson()),
            page,
            limit,
            total: count
        }
    }
    const findById = async ({id}) => {
        const product = await Product.findByPk(id, {
            include: [{
                model:User,
                as: "cratedBy",
                attributes: ["id", "name"]

            }]
        })
        

    }
}