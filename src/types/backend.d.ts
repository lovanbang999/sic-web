/* eslint-disable @typescript-eslint/no-explicit-any */
export { };
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript

declare global {
  interface IRequest {
    url: string;
    method: string;
    body?: { [key: string]: any };
    queryParams?: any;
    useCredentials?: boolean;
    headers?: any;
    nextOption?: any;
  }

  interface IBackendRes<T> {
    error?: string;
    message: string | string[];
    statusCode: number | string;
    data?: T;
  }

  // interface IBackendResError {}
}