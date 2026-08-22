'use server'
export const getSingleProperty = async (propertyId: string) => {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/properties/${propertyId}`,
    {
        next: {
            revalidate: 60
        }
    }
  );

  if(!res.ok){
    throw  new Error('Failed to fetch property')
  }
  const result = await res.json()
  return result;
};
