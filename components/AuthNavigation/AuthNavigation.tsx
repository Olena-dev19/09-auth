import css from "./AuthNavigation.module.css";
import Link from "next/link";
const AuthNavigation = () => {
  return (
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
        <Link href={"/profile"} prefetch={false} className={css.navigationLink}>
          Profile
        </Link>
      </li>

      <li className={css.navigationItem}>
        <p className={css.userEmail}>User email</p>
        <button className={css.logoutButton}>Logout</button>
      </li>

      <li className={css.navigationItem}>
        <Link href={"/sign-in"} prefetch={false} className={css.navigationLink}>
          Login
        </Link>
      </li>

      <li className={css.navigationItem}>
        <Link href={"/sign-up"} prefetch={false} className={css.navigationLink}>
          Sign up
        </Link>
      </li>
    </>
  );
};
export default AuthNavigation;
