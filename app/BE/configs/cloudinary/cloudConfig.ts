import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({
   cloud_name: "dlx7bodfp",
   api_key: "416168626465853",
   api_secret: "TmUXM495VyOazHI-PoCZ9u-b-Oc",
})

export const readAllFile = () => {
   // cloudinary.uploader.upload(
   //    `../../../../../tmp/ekomes-image-data/images/1163.jpg`,
   //    { public_id: "test", async: true },
   //    function (error, result) {
   //       if (error) console.log("ERROR WHILE UPLOADING: ", error)
   //       console.log(result)
   //    }
   // )

   let filesUpCount: number = 0
   const upload = async ({ fileName }: { fileName: string }) => {
      await cloudinary.uploader.upload(
         `../../../../../tmp/ekomes-image-data/images/${fileName}`,
         { public_id: fileName.split(".")[0], folder: "ekomes" },
         function (error, result) {
            if (error) console.log("ERROR WHILE UPLOADING: ", error)
            if (result) {
               console.log(result)
               filesUpCount++
               console.log(filesUpCount)
            }
         }
      )
   }

   try {
      fs.readdir(
         "../../../../../tmp/ekomes-image-data/images",
         (err, files) => {
            if (err) throw err
            else {
               console.log(files)

               files.map((fileName: any, index: number) => {
                  if (fileName === "1163.jpg") console.log("1163  : ", fileName)
                  if (index > 44000) {
                     // console.log(fileName.split(".")[0])
                     upload({ fileName })
                  }

                  // console.log()
               })
            }
         }
      )
   } catch (e: any) {
      console.log("ERROR: ", e.toString())
   }
}

console.log("Reading files....")
// readAllFile()
