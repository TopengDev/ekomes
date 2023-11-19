"use client"

import { Button } from "@/app/FE/components/Button"
import LoadingCircle from "@/public/Rolling-1s-188px"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"

export const DeleteProductButton = () => {
   const [loading, setLoading] = useState<boolean>(false)

   const id = usePathname().split("/")[usePathname().split("/").length - 1]

   const fetchDelete = async () => {
      toast("Creating new product", { autoClose: 2500 })
      setLoading(true)
      try {
         const res = await fetch(`/BE/endpoints/products/${id}`, {
            method: "DELETE",
         })

         const jsonRes = await res.json()

         if (!jsonRes.success) toast(jsonRes.msg, { autoClose: 2500 })
         else toast("Successfully deleted the product", { autoClose: 2500 })

         setLoading(false)
      } catch (e: any) {
         toast(e.toString(), { autoClose: 2500 })
         setLoading(false)
      }
   }

   return (
      <>
         <ToastContainer />
         {loading ? (
            <div className=''>
               <LoadingCircle />
            </div>
         ) : (
            <Button onClick={() => fetchDelete()}>Delete</Button>
         )}
      </>
   )
}
