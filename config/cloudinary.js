// المسار: /src/config/cloudinary.js
const cloudinary = require('cloudinary').v2;
require('dotenv').config()
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const uploadOptions = {
    resource_type: 'auto',
};

module.exports = {cloudinary, uploadOptions};

/*
cloudinary.uploader
.destroy('educational-resources/file-1727632208513', {resource_type: 'raw'})
.then(result => console.log(result)); 

 
 cloudinary.api
    .delete_resources('educational-resources/file-1727632208513')
    .then(res => console.log(res)) */