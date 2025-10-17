import { Router } from "express"
import { makeUserController } from "../modules/users/user.controller.js"
import { registerSchema } from "../modules/users/user.schema.js"

export const authRouter = () => {
    const router = Router()
    const ctrl = makeUserController()

    router.post("/register", validate({ body: registerSchema}), ctrl.register )
 router.post("/login", validate({ body: loginSchema}), ctrl.login )
  router.get("/me", ctrl.me)
  return router
}