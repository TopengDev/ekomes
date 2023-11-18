export const extractParams = ({ url }: { url: string }) => {
   if (url.indexOf("?") > 0) {
      let paramStrings: string | string[] = url.split("?")[1]

      if (paramStrings.indexOf("&") > 1) {
         paramStrings = paramStrings.split("&")

         const params: { [key: string]: any }[] = paramStrings.map(
            (param: string | string[]) => {
               param = (param as string).split("=")
               return {
                  [param[0]]: param[1],
               }
            }
         )

         return params
      } else {
         paramStrings = paramStrings.split("=")
         return {
            [paramStrings[0]]: paramStrings[1],
         }
      }
   } else return {}
}
