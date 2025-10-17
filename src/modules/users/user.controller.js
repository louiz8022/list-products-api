import { request, response } from "express"
import { ensureAuth } from "../../middleware/auth"

export const makeUserService = () => {
    const service = makeUserService()

    const register = async (request, response, next) => {
        try {
            const { name, email, password } = request.body

            const user = await service.register({
                name,
                email,
                password,

            })
            return response.status(200).json({
                id: user, id,
                name: user, name,
                email: user.email,
            })

        } catch (error) {
            return next(error)
        }
    }

    const login = async (request, response, next) => {
        try {
            const { email, password } = request.body
            const tokens = await service.login({
                email,
                password
            })
            return response.json(tokens)
        } catch (error) {
            return next(error)
        }
    }

    const me = [ensureAuth, async( request, response ) => {
        return response.json ({user})}
    ]

    return {register, login, me}
}