import formidable from 'formidable';
import { v2 as cloudinary } from 'cloudinary';

export default async function (req, res, next) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const form = formidable({
        multiples: false,
        keepExtensions: true,
    });
    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error('Error al parsear formulario:', err);
            return res.status(400).json({ message: 'Error al procesar formulario' });
        }
        try {
            const email = fields.email[0].toString();
            const password = fields.password[0].toString();
            const image = Array.isArray(files.image) ? files.image[0] : files.image;
            let imageUrl = null;
            if (image && image.filepath) {
                const uploadResult = await cloudinary.uploader.upload(image.filepath, {
                    folder: 'usuarios',
                });
                imageUrl = uploadResult.secure_url;
            }
            req.body = { email, password, photo: imageUrl };
            return next();
        } catch (error) {
            console.error('Error al subir a Cloudinary:', error);
            return res.status(500).json({ message: 'Error al subir imagen' });
        }
    });
}