import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PayPalButton from "./PayPalButton";

interface PayPalContainerProps {
  amount: string;
  currency: string;
  onSuccess: (details: any) => void;
}

const PayPalContainer: React.FC<PayPalContainerProps> = ({ amount, currency, onSuccess }) => {
  return (
    <PayPalScriptProvider options={{ clientId: "YOUR_PAYPAL_CLIENT_ID" }}>
      <PayPalButton amount={amount} currency={currency} onSuccess={onSuccess} />
    </PayPalScriptProvider>
  );
};

export default PayPalContainer;
