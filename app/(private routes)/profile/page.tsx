import css from "../../../components/ProfilePage/ProfilePage.module.css";
const ProfilePage = () => {
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <a href="" className={css.editProfileButton}>
            Edit Profile
          </a>
        </div>
        <div className={css.avatarWrapper}>
          {/* <img
          src="Avatar"
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        /> */}
        </div>
        <div className={css.profileInfo}>
          <p>Username: your_username</p>
          <p>Email: your_email@example.com</p>
        </div>
      </div>
    </main>
  );
};
export default ProfilePage;
