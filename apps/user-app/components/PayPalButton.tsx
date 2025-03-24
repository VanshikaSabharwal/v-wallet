// apps/web/components/PayPalButton.tsx
import { PayPalButtons } from "@paypal/react-paypal-js";

interface PayPalButtonProps {
  amount: string;
  currency: string;
  onSuccess: (details: any) => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ amount, currency, onSuccess }) => {
    return (
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",  // ✅ Add intent (required)
            purchase_units: [
              { 
                amount: { 
                  value: amount, 
                  currency_code: currency  
                } 
              }
            ],
          });
        }}
        onApprove={(data, actions) => {
          if (!actions.order) {
            console.error("actions.order is undefined");
            return Promise.reject("Order actions are undefined");
          }
          return actions.order.capture().then(onSuccess);
        }}
      />
    );
};

  

export default PayPalButton;
