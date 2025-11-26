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
            const role = parseInt(fields.role, 10); // convierte a número
            const is_online = fields.is_online === 'true'; // convierte a booleano
            const is_active = fields.is_active === 'true';
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
            if (!imageUrl) {
                imageUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
            }
            req.body = { email, password, photo: imageUrl, role, is_online, is_active };
            console.log(req.body);
            return next();
        } catch (error) {
            console.error('Error al subir a Cloudinary:', error);
            return res.status(500).json({ message: 'Error al subir imagen' });
        }
    });
}