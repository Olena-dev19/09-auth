"use client";

import { useRouter } from "next/navigation";
import css from "../../../components/SignInPage/SignInPage.module.css";
import { registerUser, UserData } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useState } from "react";
import { ApiError } from "@/lib/api/api";

const SignUpPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { setUser } = useAuthStore();
  const handleSubmit = async (formData: FormData) => {
    try {
      const userData = Object.fromEntries(formData) as unknown as UserData;
      const user = await registerUser(userData);
      if (user) {
        setUser(user);
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          "Oops... some error"
      );
    }
  };
  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form action={handleSubmit} className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignUpPage;
