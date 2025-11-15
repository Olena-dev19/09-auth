import { Metadata } from "next";
import css from "../../../components/ProfilePage/ProfilePage.module.css";
import { getServerUser } from "@/lib/api/serverApi";
import Image from "next/image";

export async function generateMetadata(): Promise<Metadata> {
  const user = await getServerUser();

  return {
    title: `${user.username} profile page`,
    description: `Profile page of ${user.username}`,
    openGraph: {
      title: `${user.username} profile page`,
      description: `Profile page of ${user.username}`,
      url: `app/profile`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "Note Hub image",
        },
      ],
      type: "article",
    },
  };
}
const ProfilePage = async () => {
  const user = await getServerUser();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <a href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </a>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={
              user?.avatar ||
              "https://ac.goit.global/fullstack/react/default-avatar.jpg"
            }
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user?.username}</p>
          <p>Email: {user?.email}</p>
        </div>
      </div>
    </main>
  );
};
export default ProfilePage;
