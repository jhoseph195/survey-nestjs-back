export interface SuccessResponse {
  response: boolean;
  status: number;
  message: string;
  data?: any;
  count?: number;
  timestamp?: string;
  path?: string;
}

export interface ErroredResponse {
  response: boolean;
  status: number;
  message: string;
  exception?: any;
  timestamp?: string;
  path?: string;
}

export const successResponse = (
    status: number,
    message: string,
    data?: any,
    count?: number
) => {
  const response: SuccessResponse = {
    response: true,
    status,
    message,
  };

  if (data) {
    response.data = data;
  }
  if (count) {
    response.count = count;
  }

  return response;
};

export const erroredResponse = (
    status: number,
    exception: any,
    message: string = '',
) => {
    const response: ErroredResponse = {
        response: false,
        status,
        message: message,
        exception
    };

    if(exception?.errors) {
        for (const key in exception.errors) {
            if(key !== 'alive') {
                response.message = exception.errors[key].message;
                break;
            }
        }
    } else if(exception?.stack) {
        response.message = exception.stack.split(/\n/)[0];
    }

    return response;
}