import { Result } from "../interface/interface";

export const getResponseData = (
  data: any,
  error?: boolean | null,
  message?: string
): Result => {
  if (error) {
    return {
      success: false,
      error,
      message,
      data,
    };
  } else {
    return {
      success: true,
      error,
      message,
      data,
    };
  }
};

export const recursion = (): any => {};
