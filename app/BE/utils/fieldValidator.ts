export const validateField = <
   TData extends { [key: string]: TData[typeof key] }
>({
   data,
   initialData,
}: {
   data: Partial<TData>
   initialData: TData
}): {
   isValid: boolean
   missingFields: string[]
} => {
   const requiredFields: string[] = []
   const unvalidatedData = data
   const traverseFields = (data: any) => {
      Object.keys(data).map((field) => {
         if (typeof data[field] != "object") {
            if (
               unvalidatedData[field] === "" ||
               unvalidatedData[field] === undefined ||
               unvalidatedData[field] === null
            )
               requiredFields.push(field)
         } else {
            traverseFields(data[field])
         }
      })
   }
   traverseFields(initialData)

   if (requiredFields.length > 0) {
      return {
         isValid: false,
         missingFields: requiredFields,
      }
   } else {
      return {
         isValid: true,
         missingFields: [],
      }
   }
}
