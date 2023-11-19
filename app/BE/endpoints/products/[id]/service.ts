import { formatResp } from "@/app/BE/utils/formatResp"
import { PrismaClient } from "@prisma/client"
import { edp } from "@/app/BE/utils/extractDynamicParam"
import { parseRequest } from "@/app/BE/utils/parseRequest"

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

export const updateProductById = async ({ reqData }: { reqData: Request }) => {
   const reqJson = await parseRequest({ reqData })
   const id = edp({ url: reqData.url })

   if (!id) return formatResp({ status: 0, msg: "Product not found" })

   const product = await prisma.products.findUnique({
      where: {
         id: parseInt(id),
      },
   })
   if (!product) return formatResp({ status: 0, msg: "Product not found" })

   const updateProduct = await prisma.products.update({
      where: {
         id: parseInt(id),
      },
      data: reqJson,
   })
   if (!updateProduct)
      return formatResp({ status: 0, msg: "Failed to update product" })

   prisma.$disconnect()

   return formatResp({
      status: 1,
      data: {
         ...updateProduct,
         price: updateProduct.price.toString(),
         discount: updateProduct.discount.toString(),
      },
   })
}

export const deleteProductById = async ({ reqData }: { reqData: Request }) => {
   const id = edp({ url: reqData.url })

   if (!id) return formatResp({ status: 0, msg: "Product not found" })

   const product = await prisma.products.findUnique({
      where: {
         id: parseInt(id),
      },
   })
   if (!product) return formatResp({ status: 0, msg: "Product not found" })

   const deletedProduct = await prisma.products.delete({
      where: {
         id: parseInt(id),
      },
   })
   if (!deletedProduct)
      return formatResp({
         status: 0,
         msg: "an error occured while deleting product",
      })

   prisma.$disconnect()

   return formatResp({
      status: 1,
      data: {
         ...deletedProduct,
         price: deletedProduct.price.toString(),
         discount: deletedProduct.discount.toString(),
      },
   })
}
