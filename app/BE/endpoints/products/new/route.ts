import { newProduct } from "./service"
// import { registerUser } from "./service"
// import { formatResp } from "@/app/BE/utils/formatResp"

export const POST = async (reqData: Request) => {
   const res = await newProduct({ reqData })
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
