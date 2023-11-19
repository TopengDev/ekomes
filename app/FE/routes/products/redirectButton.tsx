"use client"

import { useRouter } from "next/navigation"

export const RedirectButton = (
   props: React.PropsWithChildren & { id: string }
) => {
   const router = useRouter()

   return (
      <div
         onClick={() => router.replace(`/FE/routes/products/${props.id}`)}
         className=' flex flex-col gap-4 bg-light-white rounded-xl w-[45%] min-w-[320px] max-w-[385px] h-[640px] py-4 px-6 hover:bg-light-gray transition-all duration-150 hover:cursor-pointer'
      >
         {props.children}
      </div>
   )
}
