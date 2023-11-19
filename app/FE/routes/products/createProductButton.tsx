"use client"

import CirclePlus from "@/public/Circle-Plus"
import {
   HTMLInputTypeAttribute,
   MutableRefObject,
   useRef,
   useState,
} from "react"
import ModalOverlay from "../../components/modalOverlay"
import { ToastContainer, toast } from "react-toastify"
import LoadingCircle from "@/public/Rolling-1s-188px"
import "react-toastify/dist/ReactToastify.css"
import CircleX from "@/public/Circle-x"

export const CreateProductButton = () => {
   const [productModal, setProductModal] = useState<boolean>(false)
   const [loading, setLoading] = useState<boolean>(false)

   const displayNameRef: any = useRef(null)
   const priceRef: any = useRef(null)
   const discountRef: any = useRef(null)
   const releaseYearRef: any = useRef(null)
   const genderRef: any = useRef(null)
   const masterCategoryRef: any = useRef(null)
   const subCategoryRef: any = useRef(null)
   const baseColourRef: any = useRef(null)
   const urlRef: any = useRef(null)
   const articleTypeRef: any = useRef(null)
   const seasonRef: any = useRef(null)
   const usageRef: any = useRef(null)

   const fetchCreate = async () => {
      toast("Creating new product", { autoClose: 2500 })
      setLoading(true)
      try {
         const res = await fetch("/BE/endpoints/products/new", {
            body: JSON.stringify({
               display_name: displayNameRef.current.value,
               price: priceRef.current.value,
               discount: discountRef.current.value,
               release_year: parseInt(releaseYearRef.current.value),
               gender: genderRef.current.value,
               master_category: masterCategoryRef.current.value,
               sub_category: subCategoryRef.current.value,
               base_colour: baseColourRef.current.value,
               url: urlRef.current.value,
               article_type: articleTypeRef.current.value,
               season: seasonRef.current.value,
               product_usage: usageRef.current.value,
            }),
            method: "POST",
         })

         const jsonRes = await res.json()

         if (!jsonRes.success) toast(jsonRes.msg, { autoClose: 2500 })
         else toast("Successfully added new product", { autoClose: 2500 })

         setLoading(false)
      } catch (e: any) {
         toast(e.toString(), { autoClose: 2500 })
         setLoading(false)
      }
   }

   const post = () => {
      if (
         displayNameRef.current.value &&
         priceRef.current.value &&
         discountRef.current.value &&
         releaseYearRef.current.value &&
         genderRef.current.value &&
         masterCategoryRef.current.value &&
         subCategoryRef.current.value &&
         baseColourRef.current.value &&
         urlRef.current.value &&
         articleTypeRef.current.value &&
         seasonRef.current.value &&
         usageRef.current.value
      ) {
         fetchCreate()
      } else {
         toast("Please fill in all fields", { autoClose: 2500 })
      }
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
                     <h1 className='text-4xl font-bold'>Create Product</h1>
                  </div>
                  <div className='w-full flex flex-col gap-6 overflow-y-scroll'>
                     <Inputs
                        inputList={[
                           {
                              title: "Display Name",
                              ref: displayNameRef,
                              type: "text",
                           },
                           {
                              title: "Price",
                              ref: priceRef,
                              type: "number",
                           },
                           {
                              title: "Discount",
                              ref: discountRef,
                              type: "number",
                           },
                           {
                              title: "Release Year",
                              ref: releaseYearRef,
                              type: "number",
                           },
                           {
                              title: "Gender",
                              ref: genderRef,
                              type: "Text",
                           },
                           {
                              title: "Master Category",
                              ref: masterCategoryRef,
                              type: "Text",
                           },
                           {
                              title: "Sub Category",
                              ref: subCategoryRef,
                              type: "Text",
                           },
                           {
                              title: "Base Colour",
                              ref: baseColourRef,
                              type: "Text",
                           },
                           {
                              title: "Image Url",
                              ref: urlRef,
                              type: "Text",
                           },
                           {
                              title: "Article Type",
                              ref: articleTypeRef,
                              type: "Text",
                           },
                           {
                              title: "Season",
                              ref: seasonRef,
                              type: "Text",
                           },
                           {
                              title: "Usage",
                              ref: usageRef,
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
                                 "Add product"
                              )}
                           </button>
                        </div>
                     </>
                  }
               </div>
            </div>
         </ModalOverlay>
         <button onClick={() => setProductModal(!productModal)}>
            <CirclePlus className='fixed bottom-0 right-0 w-16 h-16 hover:w-24 hover:h-24 m-12 hover:m-8 transition-all duration-150 hover:cursor-pointer' />
         </button>
      </>
   )
}

export const Inputs = ({
   inputList,
}: {
   inputList: {
      ref: MutableRefObject<any>
      type: HTMLInputTypeAttribute
      title: string
   }[]
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
                        ref={input.ref}
                     />
                  </div>
               </>
            )
         })}
      </>
   )
}
