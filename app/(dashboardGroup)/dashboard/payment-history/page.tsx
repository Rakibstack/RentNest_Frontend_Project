
import PaymentHistory from "../../_components/tenant-components/payment-history";

export const dynamic = 'force-dynamic';
import { getPaymentHistory } from "../../_action/tenant_action/getPaymentHistory";

export default async function PaymentHistoryPage() {
  const result = await getPaymentHistory();

  return (
    <PaymentHistory
      payments={result.data ?? []}
    />
  );
}