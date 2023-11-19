"use client"

import { HTMLInputTypeAttribute, useEffect, useState } from "react"
import ModalOverlay from "../../../components/modalOverlay"
import { ToastContainer, toast } from "react-toastify"
import LoadingCircle from "@/public/Rolling-1s-188px"
import "react-toastify/dist/ReactToastify.css"
import CircleX from "@/public/Circle-x"
import { ButtonInversed } from "@/app/FE/components/Button"
import { usePathname } from "next/navigation"

export const UpdateProductButton = () => {
   const [product, setProduct] = useState<any>({})
   const fetchProduct = async (id: string) => {
      try {
         const res = await fetch(`/BE/endpoints/products/${id}`)

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

   const [productModal, setProductModal] = useState<boolean>(false)
   const [loading, setLoading] = useState<boolean>(false)

   const fetchUpdate = async () => {
      toast("Creating new product", { autoClose: 2500 })
      setLoading(true)
      try {
         const res = await fetch(`/BE/endpoints/products/${id}`, {
            body: JSON.stringify(product),
            method: "PUT",
         })

         const jsonRes = await res.json()

         if (!jsonRes.success) toast(jsonRes.msg, { autoClose: 2500 })
         else toast("Successfully updated the product", { autoClose: 2500 })

         setLoading(false)
      } catch (e: any) {
         toast(e.toString(), { autoClose: 2500 })
         setLoading(false)
      }
   }

   const post = () => {
      if (
         product.display_name &&
         product.price &&
         product.discount &&
         product.release_year &&
         product.gender &&
         product.master_category &&
         product.sub_category &&
         product.base_colour &&
         product.url &&
         product.article_type &&
         product.season &&
         product.product_usage
      ) {
         fetchUpdate()
      } else {
         toast("Please fill in all fields", { autoClose: 2500 })
      }
   }

   const handleChange = (field: string, value: any) => {
      setProduct((prevState: any) => ({ ...prevState, [field]: value }))
   }

   return (
      <>
         <ModalOverlay open={productModal}>
            <div className='bg-white rounded-xl w-[45%] h-[65%] flex justify-center items-center max-w-[700px] max-h-[845px] px-10 py-12 flex-col drop-shadow-xl relative'>
               <div
                  className='absolute top-0 right-0 m-12 hover:m-10 z-40'
                  onClick={() => setProductModal(!productModal)}
               >
                  <CircleX className='hover:w-12 hover:h-12 transition-all duration-150 hover:cursor-pointer' />
               </div>
               <ToastContainer />
               {/* <div className='flex justify-center items-center absolute w-48 h-48 hover:text-xl  top-0 right-0'>
               <button className='z-40' onClick={() => setOpen(false)}>
                  <i className='fa-solid fa-circle-xmark fa-beat fa-2xl color-[#ee6467]'></i>
               </button>
            </div> */}
               <div className='flex justify-around items-center flex-col w-full h-full gap-10 relative py-32 px-12 rounded-xl'>
                  <div className=''>
                     <h1 className='text-4xl font-bold'>Update Product</h1>
                  </div>
                  <div className='w-full flex flex-col gap-6 overflow-y-scroll'>
                     <Inputs
                        productState={product}
                        changer={handleChange}
                        inputList={[
                           {
                              title: "Display Name",
                              field: "display_name",
                              type: "text",
                           },
                           {
                              title: "Price",
                              field: "price",
                              type: "number",
                           },
                           {
                              title: "Discount",
                              field: "discount",
                              type: "number",
                           },
                           {
                              title: "Release Year",
                              field: "release_year",
                              type: "number",
                           },
                           {
                              title: "Gender",
                              field: "gender",
                              type: "Text",
                           },
                           {
                              title: "Master Category",
                              field: "master_category",
                              type: "Text",
                           },
                           {
                              title: "Sub Category",
                              field: "sub_category",
                              type: "Text",
                           },
                           {
                              title: "Base Colour",
                              field: "base_colour",
                              type: "Text",
                           },
                           {
                              title: "Image Url",
                              field: "url",
                              type: "Text",
                           },
                           {
                              title: "Article Type",
                              field: "article_type",
                              type: "Text",
                           },
                           {
                              title: "Season",
                              field: "season",
                              type: "Text",
                           },
                           {
                              title: "Usage",
                              field: "product_usage",
                              type: "Text",
                           },
                        ]}
                     />
                  </div>
                  {
                     <>
                        <div className='w-full '>
                           <button
                              className='bg-black h-[64px] rounded-xl p-4 flex justify-center items-center font-medium text-light-white w-full hover:bg-light-white hover:text-black transition-all duration-150'
                              onClick={() => post()}
                              disabled={loading}
                           >
                              {loading ? (
                                 <div className=''>
                                    <LoadingCircle />
                                 </div>
                              ) : (
                                 "Update"
                              )}
                           </button>
                        </div>
                     </>
                  }
               </div>
            </div>
         </ModalOverlay>
         <ButtonInversed onClick={() => setProductModal(!productModal)}>
            Update
         </ButtonInversed>
         {/* <button onClick={() => setProductModal(!productModal)}>
            <CirclePlus className='fixed bottom-0 right-0 w-16 h-16 hover:w-24 hover:h-24 m-12 hover:m-8 transition-all duration-150 hover:cursor-pointer' />
         </button> */}
      </>
   )
}

export const Inputs = ({
   inputList,
   changer,
   productState,
}: {
   inputList: {
      field: string
      type: HTMLInputTypeAttribute
      title: string
   }[]
   changer: any
   productState: any
}) => {
   return (
      <>
         {inputList.map((input) => {
            return (
               <>
                  <div className='flex flex-col w-full gap-4'>
                     <label
                        htmlFor=''
                        className='text-black text-2xl font-medium'
                     >
                        {input.title}
                     </label>
                     <input
                        type={input.type || "text"}
                        className='h-[48px] rounded-xl p-4'
                        onChange={(e) => changer(input.field, e.target.value)}
                        value={productState[input.field]}
                     />
                  </div>
               </>
            )
         })}
      </>
   )
}
