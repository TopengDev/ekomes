"use client"

import { useRouter } from "next/navigation"
import { createContext, useEffect, useRef } from "react"

export const globalContext = createContext({
   accessToken: {
      current: "",
   },
   email: {
      current: "",
   },
})

export const GlobalCTXProvider = (props: React.PropsWithChildren) => {
   const router = useRouter()
   const accessToken = useRef("")
   const email = useRef("")

   useEffect(() => {
      console.log(accessToken.current)
      accessToken.current
         ? router.replace("/FE/routes/products")
         : router.replace("/FE/routes/user/login")
   }, [accessToken])

   return (
      <globalContext.Provider
         value={{
            accessToken,
            email,
         }}
      >
         {props.children}
      </globalContext.Provider>
   )
}
