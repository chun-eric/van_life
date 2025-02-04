// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(() => resolve(), ms));
// }

// Fetch all vans
export async function getVans(id) {
  const url = id ? `/api/vans/${id}` : "/api/vans";
  const response = await fetch(url);

  if (!response.ok) {
    throw {
      message: "Failed to fetch vans",
      statusText: response.statusText,
      status: response.status,
    };
  }
  const data = await response.json();
  return data.vans;
}

// Fetch all Host Vans
export async function getHostVans(id) {
  const url = id ? `/api/host/vans/${id}` : "/api/host/vans";
  const response = await fetch(url);

  if (!response.ok) {
    throw {
      message: "Could not fetch Host vans",
      statusText: response.statusText,
      status: response.status,
    };
  }

  const data = await response.json();
  return data.vans;
}

// login users with credentials
export async function loginUser(credentials) {
  const response = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw {
      message: data.message,
      statusText: response.statusText,
      status: response.status,
    };
  }

  return data;
}
