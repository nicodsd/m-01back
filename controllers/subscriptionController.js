import { MercadoPagoConfig, PreApprovalPlan } from 'mercadopago';

const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN
});

export const createSubscription = async (req, res) => {
    console.log(req.body.plan)
    try {
        const { reason, frequency, frequency_type, transaction_amount, currency_id, back_url, status } = req.body;
        const plan = new PreApprovalPlan(client);

        const result = await plan.create({
            body: {
                reason: reason,
                auto_recurring: {
                    frequency: 1,
                    frequency_type: "months",
                    transaction_amount: transaction_amount, // Precio que definas
                    currency_id: "ARS"
                },
                back_url: process.env.APP_URL, // Donde vuelve tras pagar
                status: "active"
            }
        });

        res.json({ init_point: result.init_point });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear la suscripción" });
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