"use client";

import { useRouter } from "next/navigation";
import css from "../../../components/SignInPage/SignInPage.module.css";
import { registerUser, UserData } from "@/lib/api";

const SignUpPage = () => {
  const router = useRouter();
  const handleSubmit = async (formData: FormData) => {
    const userData = Object.fromEntries(formData) as unknown as UserData;
    const user = await registerUser(userData);
    router.push("/profile");
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

        <p className={css.error}>Error</p>
      </form>
    </main>
  );
};

export default SignUpPage;
