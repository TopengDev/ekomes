import { compare, genSalt, hash } from "bcrypt-ts"

export const encryptPassword = async ({ pwdStr }: { pwdStr: string }) => {
   try {
      const salt = await genSalt(16)

      const hashed = await hash(pwdStr, salt)

      return hashed
   } catch (e: any) {
      console.log("An error occured while encrypting password")
      return null
   }
}

export const validatePassword = async ({
   pwdStr,
   hashedStr,
}: {
   pwdStr: string
   hashedStr: string
}) => {
   try {
      const valid = await compare(pwdStr, hashedStr)
      return valid
   } catch (e: any) {
      console.log("An error occured while validating password")
      return {}
   }
}
