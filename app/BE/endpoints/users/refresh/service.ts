import { formatResp } from "@/app/BE/utils/formatResp"
import { tokenize, verifyToken } from "@/app/BE/utils/jwt"
import { parseRequest } from "@/app/BE/utils/parseRequest"
import { TCustomer } from "@/app/interfaces/DTOs/customer.dto"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

import { cookies } from "next/headers"

export const genAccess = async ({ reqData }: { reqData: Request }) => {
   const reqJson = await parseRequest({ reqData })
   const RTCookie = cookies().get("refreshtoken")

   if (!RTCookie?.value) return formatResp({ status: 0, msg: "Unauthorized" })

   const dec = verifyToken(RTCookie.value)
   if (((dec as any).email || "") != reqJson.email)
      return formatResp({
         status: 0,
         msg: `Unauthorized`,
      })

   // check if email exists
   const user: TCustomer | null = await prisma.customers.findUnique({
      where: {
         email: reqJson.email,
      },
   })
   prisma.$disconnect()
   if (user) {
      const accessToken = tokenize({
         email: reqJson.email,
         id: user.id,
         name: user.name,
      })

      return formatResp({
         status: 1,
         data: { accessToken },
      })
   }

   return formatResp({
      status: 0,
      msg: "Unauthorized",
   })
}
