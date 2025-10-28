import { Router } from "express"
import { makeProductController } from "../modules/products/products.controller.js"
import { ensureAuth } from "../middleware/auth.js"
import { createProductSchema, listProductsQuery, patchProductsSchema, productIdParams } from "../modules/products/products.schemas.js"
import { validate } from "../middleware/validate.js"
export const productRouter = () => {

    const r = Router()
    const ctrl = makeProductController()

    r.use(ensureAuth)

    r.post("/", validate({ body: createProductSchema }), ctrl.create)
    r.get("/", validate({ query: listProductsQuery }), ctrl.list)
    r.get("/", validate({ params: productIdParams }), ctrl.get)
    r.patch("/:id", validate({
        params: productIdParams,
        body: patchProductsSchema
    }), ctrl.patch)
    r.delete("/:id", validate({ params: productIdParams }), ctrl.remove)
    
    return r
}