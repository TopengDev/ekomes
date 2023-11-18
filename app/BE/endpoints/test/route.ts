// import { NextRequest } from "next/server"
import { readAllFile } from "../../configs/cloudinary/cloudConfig"

export const GET = () => {
   readAllFile()
}
