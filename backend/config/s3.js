require("dotenv").config();
const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");

const bucketName = 'praneetbucket';
const region = 'ap-south-1';
const accessKeyId = 'AKIAZPYCPU5UZ4MZ3APH';
const secretAccessKey = '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';

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

//upload file to s3
module.exports.uploadFile = (file) => {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
};

module.exports.downloadFile = (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };
  return s3.getObject(downloadParams).createReadStream();
};
