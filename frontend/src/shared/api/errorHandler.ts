import axios from "axios";
import type { ApiError } from "./types";

export function isApiError(error: unknown): error is {
	response: {
		data: ApiError;
	};
} {
	return (
		axios.isAxiosError(error) &&
		error.response?.data != null &&
		typeof error.response.data === "object"
	);
}

export function getErrorMessage(
	error: unknown,
	fallback = "Ocurrió un error inesperado",
): string {
	if (isApiError(error)) {
		return error.response.data.message;
	}

	return fallback;
}

export function getErrorCode(error: unknown): string | null {
	if (isApiError(error)) {
		return error.response.data.code;
	}

	return null;
}

export function getApiError(error: unknown): ApiError | null {
	if (isApiError(error)) {
		return error.response.data;
	}

	return null;
}
