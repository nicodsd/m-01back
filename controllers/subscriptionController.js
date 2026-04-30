import { MercadoPagoConfig, PreApprovalPlan } from 'mercadopago';

const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN
});

export const createSubscription = async (req, res) => {
    try {
        const { reason, transaction_amount, plan, page, email, password, name } = req.body;
        // 1. Guardamos los datos sensibles en la SESIÓN (no en la DB todavía)
        // Usamos bcrypt para la contraseña antes de guardarla en la sesión

        req.session.tempUserData = {
            email,
            password,
            plan: plan,
            amount: transaction_amount
        };

        // 2. Configuramos la suscripción en Mercado Pago
        const subscription = new PreApprovalPlan(client);
        const link_success = `${process.env.APP_URL}/registro-de-usuario/2/success`; // Tu página de éxito
        //const link_success = `https://standard-ipaq-hardly-yarn.trycloudflare.com/registro-de-usuario/2/success`; // Tu página de éxito

        const result = await subscription.create({
            body: {
                back_url: link_success,
                reason: reason,
                auto_recurring: {
                    frequency: 1,
                    frequency_type: "months",
                    transaction_amount: transaction_amount,
                    currency_id: "ARS"
                },
                status: "active",
            }
        });
        req.session.tempUserData = { email, password, plan, name }
        // 3. Opcional: Forzar guardado de sesión antes de responder
        // Esto asegura que los datos estén en MongoDB antes de que el usuario redirija
        req.session.save((err) => {
            if (err) {
                console.error("Error al guardar la sesión:", err);
                return res.status(500).json({ error: "Error de sesión" });
            }
            // RECIÉN AQUÍ envías la respuesta al frontend
            res.json({ init_point: result.init_point });
        });

    } catch (error) {
        console.error("Error MP:", error);
        res.status(500).json({ error: "Error al procesar la suscripción" });
    }
};

export const cancelSubscription = async (req, res) => {
    const { id } = req.params;
    try {
        const subscription = new PreApproval(client);

        const result = await subscription.update({
            id: id,
            body: {
                status: "cancelled"
            }
        });

        res.json({ message: "Suscripción cancelada con éxito", status: result.status });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "No se pudo cancelar la suscripción" });
    }
};