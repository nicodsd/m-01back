import { MercadoPagoConfig, PreApprovalPlan } from 'mercadopago';

const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN
});

export const createSubscription = async (req, res) => {
    try {
        const plan = new PreApprovalPlan(client);

        const result = await plan.create({
            body: {
                reason: "QMenú - Plan Premium Mensual",
                auto_recurring: {
                    frequency: 1,
                    frequency_type: "months",
                    transaction_amount: 10000, // Precio que definas
                    currency_id: "ARS"
                },
                back_url: "https://www.tu-sitio.com/success", // Donde vuelve tras pagar
                status: "active"
            }
        });

        res.json({ init_point: result.init_point });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear la suscripción" });
    }
};

// controllers/subscriptionController.js
export const cancelSubscription = async (req, res) => {
    const { id } = req.params; // El ID de la suscripción a cancelar
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