import { validateField } from "@/app/BE/utils/fieldValidator"
import { formatResp } from "@/app/BE/utils/formatResp"
import { validatePassword } from "@/app/BE/utils/hash"
import { tokenize } from "@/app/BE/utils/jwt"
import { parseRequest } from "@/app/BE/utils/parseRequest"
import {
   TCustomer,
   initialNewCustomer,
} from "@/app/interfaces/DTOs/customer.dto"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export type loginReqData = { email: string; password: string }

export const logUserIn = async ({ reqData }: { reqData: Request }) => {
   const reqJson = await parseRequest({ reqData })

   // validate fields
   const validated = validateField<loginReqData>({
      data: reqJson,
      initialData: initialNewCustomer,
   })
   if (!validated.isValid)
      return formatResp({
         status: 0,
         msg: `These fields are required: [ ${validated.missingFields.join(
            ", "
         )} ]`,
      })

   // check if email exists
   const user: TCustomer | null = await prisma.customers.findUnique({
      where: {
         email: reqJson.email,
      },
   })
   prisma.$disconnect()
   if (user) {
      const isCorrectPassword = await validatePassword({
         pwdStr: reqJson.password,
         hashedStr: user.password,
      })

      if (!isCorrectPassword)
         return formatResp({
            status: 0,
            msg: "Incorrect email / password",
         })

      const accessToken = tokenize({
         email: reqJson.email,
         id: user.id,
         name: user.name,
      })

      const refreshToken = tokenize({
         email: reqJson.email,
      })
      return formatResp({
         status: 1,
         data: { accessToken, refreshToken },
      })
   }

   return formatResp({
      status: 0,
      msg: "Incorrect email / password",
   })
}
