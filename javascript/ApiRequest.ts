import getHostname from "./getHostname";

export class ApiError extends Error {
  respJson: {} | null;
  url: string;
  constructor(message: string, respJson: {} | null, url: string) {
    super(message);
    this.respJson = respJson;
    this.url = url;
  }
}

export type RequestMethodTypes = "GET" | "POST" | "PUT" | "PATCH";

export default function ApiRequest<T>(
  path: string,
  method: RequestMethodTypes,
  options: {
    params?: {};
    host?: string;
    body?: {};
  } = {}
): Promise<T> {
  return new Promise((resolve, reject) => {
    const urlParams = options.params ? new URLSearchParams(options.params) : "";

    const host = options.host ? options.host : getHostname();

    fetch(`http://${host}:8999${url}?${urlParams}`, {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: options.body ? JSON.stringify(options.body) : null,
      method,
    })
      .then(resp => {
        if (resp.ok) {
          return resolve(resp.json());
        }

        // otherwise, handle error
        resp
          .json()
          .then(json => {
            reject(new ApiError(json.error || resp.statusText, json, path));
          })
          .catch(e => {
            // Generic response based on status code
            reject(new ApiError(resp.statusText, null, path));
          });
      })
      .catch(e => {
        reject(e);
      });
  });
}

export function ApiGetRequest<T>(path: string, options = {}) {
  return ApiRequest<T>(path, "GET", options);
}

export function ApiPostRequest<T>(path: string, options = {}) {
  return ApiRequest<T>(path, "POST", options);
}

export function ApiPutRequest<T>(path: string, options = {}) {
  return ApiRequest<T>(path, "PUT", options);
}

export function ApiPatchRequest<T>(path: string, options = {}) {
  return ApiRequest<T>(path, "PATCH", options);
}
