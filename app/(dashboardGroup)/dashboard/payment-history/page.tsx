import { getPaymentHistory } from "../../_action/tenant_action/getPaymentHistory";
import PaymentHistory from "../../_components/tenant-components/payment-history";



export default async function PaymentHistoryPage() {
  const result = await getPaymentHistory();

  return (
    <PaymentHistory
      payments={result.data ?? []}
    />
  );
}