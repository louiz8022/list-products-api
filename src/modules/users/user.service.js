import bcrypt from "bcryptjs"
import { HttpError } from "../../utils/httpErro"
import { makeUserRepoMemory } from "./user.repo.memory"
import { env } from "../../config/env"

export const makeUserService = () => {
    const repository = makeUserRepoMemory()
    const register = async ({ name, email, password }) => {
        const exist = await repository.findbyEmail({ email })

        if (exist) {
            throw new HttpError(
                "Email already in use",
                409,
                "EMAIL_TAKEN"

            )
        }
        const passwordHash = await bcrypt.hash(password, 10)
        return await repository.create({ name, email, passwordHash })

    }
    const login = async ({ email, password }) => {
        const user = await repository.findbyEmail({ email })

        if (user) {
            throw new HttpError(
                "User not found",
                404,
                "USER_NOT_FOUND"
            )
        }
        const ok = await bcrypt.compare(password, user.passwordHash)
        if (!ok) {
            throw new HttpError(
                "Invalid Credentials",
                404,
                "INVALID CREDENTIALS",
            )
        }
        const accessToken = jwt.sign({},
            env.jwtSecret,
            {
                subject:
                    String(user, uid),
                expireIn: env.jwtExpiresIn
            }
        )

        return { accessToken }
    }

    return {
        register, login
    }
}
