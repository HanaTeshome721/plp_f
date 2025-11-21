"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { authApi, endpoints, type UserProfile } from "@/lib/api";

const storageKeys = {
  token: "plp_access_token",
  user: "plp_user",
};

const roleOptions = [
  { label: "Learner", value: "learner" },
  { label: "Mentor", value: "mentor" },
];

type AuthMode = "register" | "login";

type HealthState = "idle" | "loading" | "ok" | "error";

const parseUser = (value: string | null): UserProfile | null => {
  if (!value) return null;
  try {
    return JSON.parse(value) as UserProfile;
  } catch (error) {
    console.warn("Unable to parse stored user", error);
    return null;
  }
};

const fieldClasses = "w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200";

const chipClasses = (active: boolean) =>
  `rounded-full px-4 py-2 text-sm font-medium transition ${
    active ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30" : "bg-white/70 text-slate-600 hover:bg-white"
  }`;

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  try {
    return JSON.stringify(error);
  } catch {
    return "Something went wrong";
  }
};

export default function AuthPanel() {
  const [mode, setMode] = useState<AuthMode>("register");
  const [registerForm, setRegisterForm] = useState({
    fullName: "",
    email: "",
    password: "",
    roles: ["learner"],
  });
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [healthState, setHealthState] = useState<HealthState>("idle");
  const [healthDetail, setHealthDetail] = useState("Checking API...");

  const isRegister = mode === "register";

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedToken = window.localStorage.getItem(storageKeys.token);
    const storedUser = parseUser(window.localStorage.getItem(storageKeys.user));
    if (storedToken) setAccessToken(storedToken);
    if (storedUser) setUser(storedUser);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (accessToken) {
      window.localStorage.setItem(storageKeys.token, accessToken);
    } else {
      window.localStorage.removeItem(storageKeys.token);
    }
  }, [accessToken]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (user) {
      window.localStorage.setItem(storageKeys.user, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(storageKeys.user);
    }
  }, [user]);

  useEffect(() => {
    const checkHealth = async () => {
      setHealthState("loading");
      try {
        const res = await fetch(endpoints.health);
        const data = await res.json();
        setHealthState("ok");
        setHealthDetail(data.status ?? "Online");
      } catch (error) {
        setHealthState("error");
        setHealthDetail(getErrorMessage(error));
      }
    };

    checkHealth();
  }, []);

const handleAuthSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatusMessage(null);
    setErrorMessage(null);

    try {
      const response = isRegister
        ? await authApi.register({
            fullName: registerForm.fullName.trim(),
            email: registerForm.email.trim().toLowerCase(),
            password: registerForm.password,
            roles: registerForm.roles,
          })
        : await authApi.login({
            email: loginForm.email.trim().toLowerCase(),
            password: loginForm.password,
          });
      setAccessToken(response.accessToken);
      setUser(response.user);
      setStatusMessage(isRegister ? "Registration complete!" : "Logged in successfully.");
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

const refreshProfile = async () => {
    if (!accessToken) {
      setErrorMessage("Please authenticate first");
      return;
    }
    setProfileLoading(true);
    setErrorMessage(null);
    setStatusMessage(null);
    try {
      const profile = await authApi.profile(accessToken);
      setUser(profile);
      setStatusMessage("Profile synced with API");
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setProfileLoading(false);
    }
  };

useEffect(() => {
  if (!accessToken || user) return;
  void refreshProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [accessToken]);

  const handleLogout = () => {
    setAccessToken(null);
    setUser(null);
    setStatusMessage("Signed out locally");
  };

  const toggleRole = (role: string) => {
    setRegisterForm((previous) => {
      const exists = previous.roles.includes(role);
      let roles = exists ? previous.roles.filter((r) => r !== role) : [...previous.roles, role];
      if (roles.length === 0) {
        roles = ["learner"];
      }
      return { ...previous, roles };
    });
  };

  const currentRolesLabel = useMemo(() => registerForm.roles.join(", "), [registerForm.roles]);

  return (
    <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.45)] backdrop-blur-lg">
      <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 p-1 text-sm font-medium text-slate-300">
        {["register", "login"].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setMode(tab as AuthMode)}
            className={`flex-1 rounded-full px-4 py-2 capitalize transition ${
              mode === tab ? "bg-white text-slate-900" : "text-slate-300/80"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <form className="mt-8 space-y-5" onSubmit={handleAuthSubmit}>
        {isRegister && (
          <>
            <label className="block text-sm font-semibold text-slate-100">
              Full name
              <input
                type="text"
                required
                value={registerForm.fullName}
                onChange={(event) => setRegisterForm({ ...registerForm, fullName: event.target.value })}
                className={`${fieldClasses} mt-2`}
                placeholder="Amina Kiptoo"
              />
            </label>

            <div>
              <p className="text-sm font-semibold text-slate-100">Show me as</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {roleOptions.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => toggleRole(role.value)}
                    className={chipClasses(registerForm.roles.includes(role.value))}
                  >
                    {role.label}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-slate-400">Currently selected: {currentRolesLabel}</p>
            </div>
          </>
        )}

        <label className="block text-sm font-semibold text-slate-100">
          Email
          <input
            type="email"
            required
            value={isRegister ? registerForm.email : loginForm.email}
            onChange={(event) =>
              isRegister
                ? setRegisterForm({ ...registerForm, email: event.target.value })
                : setLoginForm({ ...loginForm, email: event.target.value })
            }
            className={`${fieldClasses} mt-2`}
            placeholder="you@email.com"
          />
        </label>

        <label className="block text-sm font-semibold text-slate-100">
          Password
          <input
            type="password"
            minLength={6}
            required
            value={isRegister ? registerForm.password : loginForm.password}
            onChange={(event) =>
              isRegister
                ? setRegisterForm({ ...registerForm, password: event.target.value })
                : setLoginForm({ ...loginForm, password: event.target.value })
            }
            className={`${fieldClasses} mt-2`}
            placeholder="••••••••"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-indigo-500 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-500/40 transition hover:bg-indigo-400 disabled:cursor-wait disabled:opacity-70"
        >
          {loading ? "Submitting…" : isRegister ? "Create account" : "Sign in"}
        </button>
      </form>

      <div className="mt-6 space-y-3 text-sm">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-200">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">API Status</p>
          <div className="mt-2 flex items-center gap-2 text-sm font-semibold">
            <span
              className={`h-2 w-2 rounded-full ${
                healthState === "ok"
                  ? "bg-emerald-400"
                  : healthState === "loading"
                  ? "bg-amber-400"
                  : healthState === "error"
                  ? "bg-rose-400"
                  : "bg-slate-500"
              }`}
            />
            {healthDetail}
          </div>
        </div>

        {statusMessage && (
          <p className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-emerald-100">
            {statusMessage}
          </p>
        )}
        {errorMessage && (
          <p className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-rose-100">
            {errorMessage}
          </p>
        )}
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Current user</p>
            <p className="text-base font-semibold text-white">{user ? user.fullName : "Not signed in"}</p>
            {user && <p className="text-xs text-slate-400">{user.email}</p>}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={refreshProfile}
              disabled={!accessToken || profileLoading}
              className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold text-white disabled:opacity-50"
            >
              {profileLoading ? "Syncing…" : "Sync profile"}
            </button>
            <button
              type="button"
              onClick={handleLogout}
              disabled={!accessToken}
              className="rounded-full border border-rose-400/40 px-4 py-2 text-xs font-semibold text-rose-100 disabled:opacity-40"
            >
              Sign out
            </button>
          </div>
        </div>

        {user && (
          <dl className="mt-4 grid grid-cols-2 gap-3 text-xs text-slate-300">
            <div>
              <dt className="uppercase tracking-[0.2em] text-slate-500">Roles</dt>
              <dd className="mt-1 text-white">{user.roles.join(", ")}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-[0.2em] text-slate-500">Member since</dt>
              <dd className="mt-1 text-white">
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
              </dd>
            </div>
          </dl>
        )}
      </div>
    </div>
  );
}
