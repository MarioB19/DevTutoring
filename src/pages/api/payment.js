
import paypal from "@paypal/checkout-server-sdk";


const clientId =  process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

export default function POST(req, res) {
  if (req.method === "POST") {
    try {
        const requestBody = JSON.parse(req.body);


        const costo = requestBody.costo;
  

      const request = new paypal.orders.OrdersCreateRequest();
      request.requestBody({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "MXN",
              value: costo,
              breakdown: {
                item_total: {
                  currency_code: "MXN",
                  value: costo
                }
              }
            },
            items: [
              {
                name: "Tutoría",
                description: "Tutoría de programación",
                quantity: 1,
                unit_amount: {
                  currency_code: "MXN",
                  value: costo
                }
              }
            ]
          }
        ]
      });

      client.execute(request)
        .then(response => {
          console.log(response);
          res.json({ id: response.result.id });
        })
        .catch(error => {
          console.error(error);
          res.status(500).json({ error: error.message });
        });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(405).end("Method Not Allowed");
  }
}