export type TCustomer = {
   id?: string
   name: string
   email: string
   password: string
   createdAt?: Date
   isVerified?: boolean
   isMerchant?: boolean
}

export const initialNewCustomer: TCustomer = {
   name: "",
   email: "",
   password: "",
}
