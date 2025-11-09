import Category from "../../models/Categories.js"
import createHttpError from "http-errors"

let read = async(req, res, next)=>{     // La funcion controladora debe ser asincrona para poder esperar la respuesta de Mongo
    try {                               // Utilizo la sintaxis de try/catch para intentar algo y catchear los errores que puedan surgir 
        let all = await Category.find() //Utilizo el metodo find() para buscar todos los recursos del modelo (que en este caso es CATEGORY) 
        if(all.length>0){
            return res.status(200)          
            .json({
                categories: all
            })
        }
        
        return next(createHttpError(404, "❌ El recurso no se encontró"))
        
    } catch(error){
        console.log(error)
        next(error)
    }
}

export default read 