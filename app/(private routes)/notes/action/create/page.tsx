import CreateNote from "@/components/CreateNote/CreateNote";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Note - Note Hub",
  description: "Create a new note in Note Hub",
  openGraph: {
    title: "Create Note - Note Hub",
    description: "Create a new note in Note Hub",
    url: `https://notehub.com/`,
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

const CreateNotePage = () => {
  return <CreateNote />;
};
export default CreateNotePage;
