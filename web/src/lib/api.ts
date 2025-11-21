const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export const endpoints = {
  health: `${API_URL}/health`,
  auth: {
    register: `${API_URL}/auth/register`,
    login: `${API_URL}/auth/login`,
    profile: `${API_URL}/auth/me`,
  },
  contact: {
    submit: `${API_URL}/contact`,
  },
};

type HttpMethod = "GET" | "POST";

const request = async <T>(
  url: string,
  options: RequestInit & { method: HttpMethod }
): Promise<T> => {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include",
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = (data as { message?: string }).message ?? "Request failed";
    throw new Error(message);
  }
  return data as T;
};

export interface UserProfile {
  _id: string;
  fullName: string;
  email: string;
  headline?: string;
  roles: string[];
  skills: string[];
  bio?: string;
  createdAt?: string;
}

export interface AuthSuccess {
  user: UserProfile;
  accessToken: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  roles?: string[];
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactResponse {
  message: string;
  contactId: string;
}

export const authApi = {
  register: (payload: RegisterPayload) =>
    request<AuthSuccess>(endpoints.auth.register, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  login: (payload: LoginPayload) =>
    request<AuthSuccess>(endpoints.auth.login, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  profile: (accessToken: string) =>
    request<UserProfile>(endpoints.auth.profile, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
};

export const contactApi = {
  submit: (payload: ContactPayload) =>
    request<ContactResponse>(endpoints.contact.submit, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};

export const getApiUrl = () => API_URL;
