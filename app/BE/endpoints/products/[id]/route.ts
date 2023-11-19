import { deleteProductById, getProductById, updateProductById } from "./service"
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

export const PUT = async (reqData: Request) => {
   const res = await updateProductById({ reqData })
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

export const DELETE = async (reqData: Request) => {
   const res = await deleteProductById({ reqData })
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
