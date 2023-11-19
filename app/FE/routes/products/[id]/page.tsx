"use client"

import Image from "next/image"
import { toast } from "react-toastify"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { numberWithCommas } from "../page"
import { ButtonInversed, Button } from "@/app/FE/components/Button"
import { UpdateProductButton } from "./updateProductButton"
import { DeleteProductButton } from "./deleteProductButton"

export default function Page() {
   const [product, setProduct] = useState<any>({})
   const fetchProduct = async (id: string) => {
      try {
         const res = await fetch(
            `http://localhost:3000/BE/endpoints/products/${id}`
         )

         const jsonRes = await res.json()

         if (!jsonRes.success)
            toast(jsonRes.msg.toString(), { autoClose: 2500 })
         else setProduct(jsonRes.data)
      } catch (e: any) {
         toast(e.toString(), { autoClose: 2500 })
      }
   }
   const id = usePathname().split("/")[usePathname().split("/").length - 1]
   useEffect(() => {
      console.log(id)
      id && fetchProduct(id)
   }, [id])

   return (
      <>
         <div className='center-75 py-32 flex flex-col gap-16'>
            <div className='flex justify-between gap-8 w-full'>
               <div className=' flex flex-row gap-4 bg-light-white rounded-xl w-2/3 h-[640px] py-8 px-10 '>
                  <div className='relative w-1/2 h-full rounded-md overflow-hidden'>
                     <Image
                        src={product.url}
                        alt=''
                        fill={true}
                        sizes='3xl'
                        objectFit='cover'
                     />
                  </div>
                  <div className='flex flex-col justify-between flex-grow'>
                     <div>
                        <h3 className='text-3xl text-dark-gray font-bold'>
                           {product.display_name}
                        </h3>
                        <div className='flex w-full items-center'>
                           <h4 className='text-base text-gray font-medium'>
                              {product.gender}
                           </h4>
                        </div>
                     </div>
                     <div>
                        <h4 className='text-2xl text-dark-gray font-bold'>
                           {product.product_usage}
                        </h4>
                     </div>
                     <div>
                        <h4 className='text-lg text-dark-gray font-bold'>
                           {product.base_colour}
                        </h4>
                        <div className='flex w-full items-center'>
                           <h4 className='text-lg text-dark-gray font-medium'>
                              {product.article_type}
                           </h4>
                        </div>
                        <div className='flex w-full items-center'>
                           <h4 className='text-lg text-dark-gray font-medium'>
                              Released on {product.release_year}
                           </h4>
                        </div>
                        <div className='flex w-full items-center'>
                           <h4 className='text-lg text-dark-gray font-medium'>
                              Best to wear on {product.season}
                           </h4>
                        </div>
                     </div>
                     <div className='flex justify-between items-end'>
                        <div>
                           <h3 className='text-3xl text-gray font-bold'>
                              {product.master_category}
                           </h3>
                           <h4 className='text-base text-gray font-medium'>
                              {product.sub_category}
                           </h4>
                        </div>
                        <div>
                           <h2 className='text-xl text-light-red font-bold'>
                              Rp. {numberWithCommas(product.price || 0)}
                           </h2>
                        </div>
                     </div>
                  </div>
               </div>
               <div>
                  <div className='flex flex-col justify-between h-full'>
                     <UpdateProductButton />
                     <DeleteProductButton />
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}
