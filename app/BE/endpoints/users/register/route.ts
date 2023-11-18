import { registerUser } from "./service"

export const POST = async (reqData: Request) => {
   const res = await registerUser({ reqData })

   return Response.json(res, {
      status: res.status_code,
   })
}
