export const formatResp = <TData>(
   props: { status: 1 | 2; data: TData } | { status: 0; msg: string }
) => {
   if (props.status === 0)
      return {
         success: false,
         msg: props.msg,
         status_code: 400,
      }

   if (props.status === 1)
      return {
         success: true,
         data: props.data,
         status_code: 200,
      }
   if (props.status === 2)
      return {
         success: true,
         data: props.data,
         status_code: 201,
      }
   else
      return {
         success: false,
         msg: "Unknown error occured",
         status: 500,
      }
}
