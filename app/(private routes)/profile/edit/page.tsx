"use client";
import css from "@/components/EditProfilePage/EditProfilePage.module.css";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateUser } from "@/lib/api/clientApi";

const EditProfilePage = () => {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [username, setUserName] = useState(user?.username ?? "");

  const handleCloseBtn = () => {
    router.replace("/profile");
  };
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = { username };
    const updatedRes = await updateUser(data);
    setUser(updatedRes);
    router.push("/profile");
  };
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

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

        <form onSubmit={handleSubmit} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username: {user?.username}</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={handleChangeInput}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              onClick={handleCloseBtn}
              type="button"
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};
export default EditProfilePage;
