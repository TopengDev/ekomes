import { logUserIn } from "./service"
import { cookies } from "next/headers"

export const POST = async (reqData: Request) => {
   const res = await logUserIn({ reqData })

   if (!res.success)
      return Response.json(
         {
            success: res.success,
            msg: res.msg,
         },
         {
            status: res.status_code,
         }
      )

   cookies().set("refreshtoken", (res as any).data.refreshToken)

   return Response.json(
      {
         success: res.success,
         data: { accessToken: (res as any).data.accessToken },
      },
      {
         status: res.status_code,
      }
   )
}
