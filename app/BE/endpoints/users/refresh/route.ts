import { genAccess } from "./service"

export const POST = async (reqData: Request) => {
   const res = await genAccess({ reqData })

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
