// _action/getAllProperty.ts

type PropertyQuery = {
  searchTerm?: string;
  location?: string;
  categoryId?: string;
  minRent?: number;
  maxRent?: number;
  page?: number;
  limit?: number;
};

export async function getAllProperty(query: PropertyQuery) {
  const params = new URLSearchParams();

  if (query.searchTerm) {
    params.set("searchTerm", query.searchTerm);
  }

  if (query.location) {
    params.set("location", query.location);
  }

  if (query.categoryId) {
    params.set("categoryId", query.categoryId);
  }

  if (query.minRent !== undefined) {
    params.set("minRent", String(query.minRent));
  }

  if (query.maxRent !== undefined) {
    params.set("maxRent", String(query.maxRent));
  }

  params.set("page", String(query.page ?? 1));
  params.set("limit", String(query.limit ?? 9));

  const response = await fetch(
    `${process.env.BACKEND_API_URL}/api/properties?${params.toString()}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch properties");
  }

  const result = await response.json();  

  return result;
}