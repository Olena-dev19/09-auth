"use client";
import { useRouter } from "next/navigation";
import css from "../../../components/SignInPage/SignInPage.module.css";
import { loginUser, UserData } from "@/lib/api";
const SignInPage = () => {
  const router = useRouter();
  const handleSubmit = async (formData: FormData) => {
    const userData = Object.fromEntries(formData) as unknown as UserData;
    const user = await loginUser(userData);
    router.push("/profile");
  };
  return (
    <main className={css.mainContent}>
      <form action={handleSubmit} className={css.form}>
        <h1 className={css.formTitle}>Sign in</h1>

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
            Log in
          </button>
        </div>

        {/* <p className={css.error}>{error}</p> */}
      </form>
    </main>
  );
};

export default SignInPage;
