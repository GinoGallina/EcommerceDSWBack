import { IBaseResponse, IBaseResponseError } from "../types/shared/IBaseResponse";

export function createSuccessResponse<T>(message: string, data: T): IBaseResponse<T> {
	return {
		message,
		data,
		error: null,
		success: true,
	};
}

export function createErrorResponse(message: string, error?: IBaseResponseError): IBaseResponse<null> {
	return {
		message,
		data: null,
		error: error || { code: 500, message: "Error interno del servidor" },
		success: false,
	};
}
