import { formatResp } from "@/app/BE/utils/formatResp"
import { TProductSearchDTO } from "@/app/interfaces/DTOs/product.dto"
import { PrismaClient } from "@prisma/client"
import { parseRequest } from "../../utils/parseRequest"

const prisma = new PrismaClient()

export const getProducts = async ({ reqData }: { reqData: Request }) => {
   const reqJson: TProductSearchDTO = await parseRequest({ reqData })

   console.log(reqJson)

   const products = await prisma.products.findMany({
      take: reqJson.take || 15,
      skip: reqJson.skip || 0,
      where: {
         article_type: reqJson.article_type || undefined,
         base_colour: reqJson.base_colour
            ? {
                 contains: reqJson.base_colour,
                 mode: "insensitive",
              }
            : undefined,
         display_name: reqJson.display_name
            ? {
                 contains: reqJson.display_name,
                 mode: "insensitive",
              }
            : undefined,
         gender: reqJson.gender
            ? {
                 contains: reqJson.gender,
                 mode: "insensitive",
              }
            : undefined,
         master_category: reqJson.master_category
            ? {
                 contains: reqJson.master_category,
                 mode: "insensitive",
              }
            : undefined,
         product_usage: reqJson.product_usage
            ? {
                 contains: reqJson.product_usage,
                 mode: "insensitive",
              }
            : undefined,
         release_year: reqJson.release_year
            ? {
                 gt: reqJson.release_year,
              }
            : undefined,
         season: reqJson.season
            ? {
                 contains: reqJson.season,
                 mode: "insensitive",
              }
            : undefined,
         sub_category: reqJson.sub_category
            ? {
                 contains: reqJson.sub_category,
                 mode: "insensitive",
              }
            : undefined,
         price:
            reqJson.price_gt && reqJson.price_lt
               ? {
                    gte: reqJson.price_gt,
                    lte: reqJson.price_lt,
                 }
               : reqJson.price_gt
               ? {
                    gte: reqJson.price_gt,
                 }
               : reqJson.price_lt
               ? {
                    lte: reqJson.price_lt,
                 }
               : undefined,
         discount:
            reqJson.discount_gt && reqJson.discount_lt
               ? {
                    gte: reqJson.discount_gt,
                    lte: reqJson.discount_lt,
                 }
               : reqJson.discount_gt
               ? {
                    gte: reqJson.discount_gt,
                 }
               : reqJson.discount_lt
               ? {
                    lte: reqJson.discount_lt,
                 }
               : undefined,
      },
   })

   prisma.$disconnect()

   if (!products)
      return formatResp({ status: 0, msg: "Failed to fetch products" })

   if (products && (products || []).length > 0) {
      const result = products.map((product) => {
         return {
            ...product,
            price: product.price.toString(),
            discount: product.discount.toString(),
         }
      })
      return formatResp({ status: 1, data: result })
   }

   return formatResp({} as any)
}
