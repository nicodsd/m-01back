import Food from "../../models/Food.js";

let updateOrder = async (req, res, next) => {
    try {
        const { order } = req.body;

        const updatePromises = order.map(item => {
            return Food.findByIdAndUpdate(
                item._id,
                { $set: { order: item.order } },
                { new: true }
            );
        });

        await Promise.all(updatePromises);

        return res.status(200).json({ message: "Orden actualizado con éxito" });
    } catch (error) {
        next(error);
    }
};

export default updateOrder;