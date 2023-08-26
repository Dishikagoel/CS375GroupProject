const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const env = require('../../env.json');

// AWS S3 setup
const s3 = new S3Client({
    credentials: {
        accessKeyId: env.awsAccessKeyId,
        secretAccessKey: env.awsSecretAccessKey
    },
    region: env.awsRegion
});

// multer-S3 storage configuration
const s3Storage = multerS3({
    s3: s3,
    bucket: env.s3BucketName,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
        const auctionId = req.params.auctionId;
        const filename = `${auctionId}/${file.originalname}`;
        cb(null, filename);
    }
});

// middleware
const upload = multer({
    storage: s3Storage,
    limits: { fileSize: 1024 * 1024 * 5 } // 5MB file size limit
});

router.post('/:auctionId', upload.array('images', 5), async (req, res) => {
    try {
        const uploadedFiles = req.files;
        const uploadedUrls = uploadedFiles.map(file => file.location);

        console.log('Images uploaded:', uploadedUrls);

        res.status(200).json({
            message: 'Images uploaded successfully',
            uploadedUrls: uploadedUrls
        });
    } catch (error) {
        console.error('Error uploading images:', error);
        res.status(500).json({ error: 'An error occurred while uploading images.' });
    }
});

module.exports = router;