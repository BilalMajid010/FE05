const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
    throw new Error("API URL is not configured");
}

export { API_URL };