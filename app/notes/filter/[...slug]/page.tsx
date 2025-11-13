import { fetchNotes } from "@/lib/api";

import { NoteTag } from "@/types/note";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesPageDefault from "./Notes.client";
import { Metadata } from "next";

interface NotesByCategoryProps {
  params: Promise<{ slug: string[] }>;
}

export const generateMetadata = async ({
  params,
}: NotesByCategoryProps): Promise<Metadata> => {
  const { slug: tag } = await params;
  const searchTag = tag[0] === "all" ? undefined : tag[0];
  return {
    title: `${searchTag ? searchTag : "All"} Notes`,
    description: `List of ${searchTag} notes`,
    openGraph: {
      title: `${searchTag} Notes`,
      description: `Notes filtered by ${searchTag}`,
      url: `https:/notehub.com/notes/filter/${searchTag}`,
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
};

const NotesByCategory = async ({ params }: NotesByCategoryProps) => {
  const { slug } = await params;
  const tag = slug?.[0];
  const searchTag = tag === "all" ? undefined : tag;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", { currentPage: 1, search: "", searchTag }],
    queryFn: () =>
      fetchNotes({
        page: 1,
        search: "",
        perPage: 12,
        tag: searchTag as NoteTag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesPageDefault tag={searchTag as NoteTag} />
    </HydrationBoundary>
  );
};
export default NotesByCategory;
