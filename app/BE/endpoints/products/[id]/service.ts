import { formatResp } from "@/app/BE/utils/formatResp"
import { PrismaClient } from "@prisma/client"
import { edp } from "@/app/BE/utils/extractDynamicParam"

const prisma = new PrismaClient()

export const getProductById = async ({ reqData }: { reqData: Request }) => {
   const id = edp({ url: reqData.url })

   if (!id) return formatResp({ status: 0, msg: "Product not found" })

   const product = await prisma.products.findUnique({
      where: {
         id: parseInt(id),
      },
   })

   prisma.$disconnect()

   if (!product) return formatResp({ status: 0, msg: "Product not found" })

   return formatResp({
      status: 1,
      data: {
         ...product,
         price: product.price.toString(),
         discount: product.discount.toString(),
      },
   })
}
