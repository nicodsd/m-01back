import Food from "../../models/Food.js";
import createHttpError from "http-errors";

let read = async (req, res, next) => {
    try {
        // Si hay user_id, filtramos y ORDENAMOS
        if (req.query.user_id) {
            let all = await Food.find({ user_id: req.query.user_id })
                .sort({ order: 1 }); // <--- CLAVE: Orden ascendente

            if (all.length > 0) {
                return res.status(200).json({ foods: all });
            }
            return next(createHttpError(404, "❌ El recurso no se encontró"));
        }

        // Si es la lista general, también ORDENAMOS
        let all = await Food.find().sort({ order: 1 });

        if (all.length > 0) {
            return res.status(200).json({ foods: all });
        }
        return next(createHttpError(404, "❌ El recurso no se encontró"));

    } catch (error) {
        console.log(error);
        next(error);
    }
};

export default read;