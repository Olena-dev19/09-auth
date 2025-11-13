import { Metadata } from "next";
import css from "../components/Home/Home.module.css";

export const metadata: Metadata = {
  title: "Page not found - 404 -  Note Hub App",
  description:
    "Sorry, the page you are looking for does not exist. Please visit https://notehub.com/.",
  openGraph: {
    title: "Note Hub App",
    description: "A hub for your notes",
    url: `https://notehub.com/`,
    siteName: "NoteHub",
    images: [
      {
        url: "https://colorlib.com/wp/wp-content/uploads/sites/2/404-error-template-10.png",
        width: 1200,
        height: 630,
        alt: "Note Hub not-found image",
      },
    ],
    type: "article",
  },
};
const NotFound = () => {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
};
export default NotFound;
