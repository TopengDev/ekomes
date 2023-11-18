import { getProductById } from "./service"
// import { registerUser } from "./service"
// import { formatResp } from "@/app/BE/utils/formatResp"

export const GET = async (reqData: Request) => {
   const res = await getProductById({ reqData })
   return Response.json(
      {
         success: res.success,
         data: res.data,
         msg: res.msg,
      },
      {
         status: res.status_code,
      }
   )
   // return NextResponse.json(res)
}
