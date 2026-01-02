import User from '../../models/UserAuth.js';
const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const user = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!user) {
            return next(new Error('Usuario no encontrado'));
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};
export default updateUser;