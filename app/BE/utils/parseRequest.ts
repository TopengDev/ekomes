export const parseRequest = async ({ reqData }: { reqData: Request }) => {
   try {
      const reqJson = await reqData.json()

      return reqJson
   } catch (e: any) {
      console.log("Failed to parse request body: ", e.toString())
      return {}
   }
}
