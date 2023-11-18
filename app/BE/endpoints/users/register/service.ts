import { validateField } from "@/app/BE/utils/fieldValidator"
import { formatResp } from "@/app/BE/utils/formatResp"
import { encryptPassword } from "@/app/BE/utils/hash"
import {
   TCustomer,
   initialNewCustomer,
} from "@/app/interfaces/DTOs/customer.dto"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const registerUser = async ({ reqData }: { reqData: Request }) => {
   const reqJson: TCustomer = await reqData.json()

   // validate fields
   const validated = validateField<TCustomer>({
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
   if (user) {
      return formatResp({ status: 0, msg: "This email is already registered" })
   }

   const hashedPassword = await encryptPassword({ pwdStr: reqJson.password })
   if (!hashedPassword)
      return formatResp({
         status: 0,
         msg: "There was an error while registering new user",
      })

   // proceed to create the user
   const newUser = await prisma.customers.create({
      data: { ...reqJson, password: hashedPassword },
   })

   return formatResp({
      status: 2,
      data: newUser,
   })
}
