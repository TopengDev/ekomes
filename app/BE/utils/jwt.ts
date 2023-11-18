import { TCustomer } from "@/app/interfaces/DTOs/customer.dto"
import jwt from "jsonwebtoken"

const secret =
   "SOVERYSECRETIVESTRINGOFSECRETTEXTTHATCOULDPOSSIBLYBETHEMOSTSECRETIVESTRINGOFSECRETTEXT"

export const tokenize = (data: Partial<TCustomer>) => {
   const token = jwt.sign(data, secret, {
      algorithm: "HS256",
      expiresIn: data.id ? 60 * 15 : 60 * 120, // 15 minutes
   })

   return token
}

export const verifyToken = (token: string) => {
   try {
      const decoded = jwt.verify(token, secret)
      return decoded
   } catch (e: any) {
      console.log("Error while decoding token: ", e.toString())
      return {}
   }
}
