import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import multer from "multer"

import EnvVars from "@src/declarations/major/EnvVars"

cloudinary.config({
  cloud_name: EnvVars.cloudinaryName,
  api_key: EnvVars.cloudinaryKey,
  api_secret: EnvVars.cloudinarySecret,
})

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    // async code using `req` and `file`
    // ...
    return {
      folder: "benit",
      format: "jpeg",
    }
  },
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const uploadCloud = multer({ storage })

export default uploadCloud
