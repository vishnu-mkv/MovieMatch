import { getSession } from "next-auth/react";

async function getHeader() {
  const session = await getSession();
  if (!session || !session.token) throw new Error("Authorization Required");

  return "Bearer " + session.token;
}

const isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?$/;

function isIsoDateString(value: any): boolean {
  return value && typeof value === "string" && isoDateFormat.test(value);
}

export function handleDates(body: any) {
  if (body === null || body === undefined || typeof body !== "object")
    return body;

  for (const key of Object.keys(body)) {
    const value = body[key];
    if (isIsoDateString(value)) body[key] = new Date(value);
    else if (typeof value === "object") handleDates(value);
  }
}

async function processResponse<T>(_res: Promise<Response>): Promise<T> {
  try {
    const res = await _res;
    const data = await res.json();
    handleDates(data);

    if (res.ok) return data as T;
    throw data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function get<T>(url: string, authRequired = false): Promise<T> {
  const res = fetch(process.env.NEXT_PUBLIC_SERVER_URL + url, {
    headers: { Authorization: authRequired ? await getHeader() : "" },
    next: {
      revalidate: 5,
    },
  });
  return processResponse<T>(res);
}

export async function post<T>(
  url: string,
  body: any,
  authRequired = false,
  rawBody = false,
  options?: any
): Promise<T> {
  const headers: any = {
    Authorization: authRequired ? await getHeader() : "",
    ...options,
  };

  if (!rawBody) {
    headers["Content-Type"] = "application/json";
  }

  const res = fetch(process.env.NEXT_PUBLIC_SERVER_URL + url, {
    method: "POST",
    headers: new Headers(headers),
    body: rawBody ? body : JSON.stringify(body),
  });
  return processResponse<T>(res);
}

export async function put<T>(
  url: string,
  body: any,
  authRequired = false,
  rawBody = false,
  options?: any
): Promise<T> {
  const headers: any = {
    Authorization: authRequired ? await getHeader() : "",
    ...options,
  };

  if (!rawBody) {
    headers["Content-Type"] = "application/json";
  }

  const res = fetch(process.env.NEXT_PUBLIC_SERVER_URL + url, {
    method: "PUT",
    headers: new Headers(headers),
    body: rawBody ? body : JSON.stringify(body),
  });
  return processResponse<T>(res);
}

export async function _delete<T>(
  url: string,
  authRequired = false
): Promise<T> {
  const res = fetch(process.env.NEXT_PUBLIC_SERVER_URL + url, {
    headers: { Authorization: authRequired ? await getHeader() : "" },
    method: "DELETE",
  });
  return processResponse<T>(res);
}
