export async function getVans() {
  const response = await fetch("/api/vans");

  if (!response.ok) {
    const errorData = await response.json();
    throw {
      message: errorData.error || "Could not fetch vans",
      statusText: response.statusText,
      status: response.status,
    };
  }
  const data = await response.json();

  if (!data.vans) {
    throw {
      message: "Data format is incorrect",
      statusText: "Invalid Data",
      status: response.status,
    };
  }

  return data.vans;
}
