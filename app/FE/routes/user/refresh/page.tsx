import { globalContext } from "@/app/FE/context/globalContext"
import { useRouter } from "next/navigation"
import { useContext } from "react"

export default function Page() {
   const router = useRouter()
   const { email, accessToken } = useContext(globalContext)

   const refresh = async () => {
      try {
         const res = await fetch(
            "http://localhost:3000/BE/endpoints/users/refresh",
            {
               body: JSON.stringify({
                  email: email.current,
               }),
               method: "POST",
            }
         )

         const jsonRes = await res.json()

         if (!jsonRes.success) router.replace("/FE/routes/user/login")
         else {
            accessToken.current = jsonRes.data.accessToken
            router.replace("/FE/routes/products")
         }
      } catch (e: any) {
         console.log(e.toString())
      }
   }

   refresh()

   return ""
}
