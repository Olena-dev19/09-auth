import css from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={css.footer}>
      <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
      <div className={css.wrap}>
        <p>Developer: Olena</p>
        <p>
          Contact us:
          <a href="mailto:student@notehub.app">student@notehub.app</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
