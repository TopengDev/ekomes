export type TProductSearchDTO = {
   id?: string
   gender?: string
   master_category?: string
   sub_category?: string
   article_type?: string
   base_colour?: string
   season?: string
   release_year?: number
   product_usage?: string
   display_name?: string
   price_gt?: number
   price_lt?: number
   discount_gt?: number
   discount_lt?: number
   take?: number
   skip?: number
}

export const initialProductSearchRequest: TProductSearchDTO = {
   id: "",
   gender: "",
   master_category: "",
   sub_category: "",
   article_type: "",
   base_colour: "",
   season: "",
   release_year: 0,
   product_usage: "",
   display_name: "",
   price_gt: 0,
   price_lt: 0,
   discount_gt: 0,
   discount_lt: 0,
}
