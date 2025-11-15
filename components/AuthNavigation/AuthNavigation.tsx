"use client";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./AuthNavigation.module.css";
import Link from "next/link";
import { logoutUser } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";

const AuthNavigation = () => {
  const { isAuthenticated, user, clearIsAuthenticated } = useAuthStore();
  const router = useRouter();
  const logOut = async () => {
    await logoutUser();
    clearIsAuthenticated();
    router.replace("/sign-in");
  };
  return (
    <>
      {isAuthenticated && (
        <>
          <li className={css.navigationItem}>
            <Link className={css.navigationLink} href="/">
              Home
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link className={css.navigationLink} href={"/notes/filter/all"}>
              Notes
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link
              href={"/profile"}
              prefetch={false}
              className={css.navigationLink}
            >
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user?.email}</p>
            <button onClick={logOut} className={css.logoutButton}>
              Logout
            </button>
          </li>
        </>
      )}

      {!isAuthenticated && (
        <>
          <li className={css.navigationItem}>
            <Link
              href={"/sign-in"}
              prefetch={false}
              className={css.navigationLink}
            >
              Login
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link
              href={"/sign-up"}
              prefetch={false}
              className={css.navigationLink}
            >
              Sign up
            </Link>
          </li>
        </>
      )}
    </>
  );
};
export default AuthNavigation;
