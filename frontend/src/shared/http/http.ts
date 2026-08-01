import axios from "axios";

export const http = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

http.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error("API Error:", error.response?.data);

		return Promise.reject(error);
	},
);
