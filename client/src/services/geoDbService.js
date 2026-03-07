const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

export async function fetchCities(searchText) {
  if (!searchText) return [];

  const response = await fetch(
    `${GEO_API_URL}/cities?namePrefix=${searchText}&countryIds=IN&limit=5`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_GEO_API_KEY,
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
    }
  );

  const result = await response.json();
  return result.data;
}
