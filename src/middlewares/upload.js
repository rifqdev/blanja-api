const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const cloudinaryConfig = require('../config/cloudinay');

cloudinary.config(cloudinaryConfig);

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // async code using `req` and `file`
    // ...
    return {
      folder: 'folder_name',
      format: 'jpeg',
      public_id: 'some_unique_id',
    };
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
