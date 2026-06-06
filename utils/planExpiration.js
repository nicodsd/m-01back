import User from "../models/UserAuth.js";

/**
 * Checks if the user's plan should be expired.
 * If the subscription state is 'cancelled' and more than 30 days have passed since paymentCreated,
 * the user's plan is reverted to 'free'.
 * @param {Object} user - The user object (Mongoose document)
 * @returns {Object} The updated or original user object
 */
export const checkAndUpdatePlan = async (user) => {
    if (!user) return user;
    
    // Si el plan ya es free, no hay nada que verificar
    if (user.plan === 'free') return user;

    // Solo verificamos la expiración si la suscripción está cancelada o no está autorizada
    // Si está 'authorized', Mercado Pago se encarga de los cobros recurrentes.
    if (user.mp_subscription_state === 'cancelled') {
        if (user.paymentCreated) {
            const paymentDate = new Date(user.paymentCreated);
            const now = new Date();
            
            const diffTime = Math.abs(now - paymentDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            // Si pasaron más de 30 días, expiramos el plan
            if (diffDays > 30) {
                user.plan = 'free';
                user.paymentCreated = null;
                // Opcional: limpiar los datos de la suscripción para que vuelva a suscribirse desde cero si quiere
                // user.mp_preapproval_id = null;
                // user.mp_subscription_state = null;
                // user.mp_subscription_id = null;
                await user.save();
                console.log(`[Plan Expiration] Plan expirado para el usuario ${user.email}`);
            }
        } else {
            // Si está cancelado y no tiene paymentCreated, por seguridad lo pasamos a free
            user.plan = 'free';
            await user.save();
            console.log(`[Plan Expiration] Plan revertido a free (sin paymentCreated) para el usuario ${user.email}`);
        }
    }

    return user;
};
