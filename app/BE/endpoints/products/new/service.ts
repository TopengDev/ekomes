import { formatResp } from "@/app/BE/utils/formatResp"
import {
   TNewProductRequest,
   initialNewProductRequest,
} from "@/app/interfaces/DTOs/product.dto"
import { PrismaClient } from "@prisma/client"
import { parseRequest } from "../../../utils/parseRequest"
import { validateField } from "@/app/BE/utils/fieldValidator"

const prisma = new PrismaClient()

export const newProduct = async ({ reqData }: { reqData: Request }) => {
   const reqJson: TNewProductRequest = await parseRequest({ reqData })

   console.log(reqJson)

   const validated = validateField<TNewProductRequest>({
      data: reqJson,
      initialData: initialNewProductRequest,
   })
   if (!validated.isValid)
      return formatResp({
         status: 0,
         msg: `These fields are required: [ ${validated.missingFields.join(
            ", "
         )} ]`,
      })

   const newProduct = await prisma.products.create({
      data: reqJson as any,
   })

   prisma.$disconnect()

   if (!newProduct)
      return formatResp({ status: 0, msg: "Failed to add new product" })

   return formatResp({
      status: 1,
      data: {
         ...newProduct,
         price: parseInt(String(newProduct.price)),
         discount: parseInt(String(newProduct.discount)),
      },
   })
}
