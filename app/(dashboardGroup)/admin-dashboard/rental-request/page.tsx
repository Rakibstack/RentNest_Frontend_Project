import { getAllRentalRequest } from "../../_action/admin_action/getAllRentalRequest";
import RentalRequestList from "../../_components/admin-components/AllRentalRequestList";

export default async function RentalRequestPage() {
  const result = await getAllRentalRequest();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <RentalRequestList
        requests={result.data}
      />
    </div>
  );
}