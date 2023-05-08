"use client";

import GenreContainer from "@/components/GenreContainer";
import { TitleProps } from "@/components/Title";
import useGenres from "@/hooks/useGenres";
import { useSession } from "next-auth/react";
import React from "react";
import Loading from "../loading";

async function Genres() {
  const { data: session } = useSession();
  const [genres, loading] = useGenres();

  if (loading) return <Loading />;

  const title: TitleProps = {
    title: "All Genres",
  };

  if (session?.user?.role === "Admin") {
    title.button = { text: "Add New", href: "/genres/new" };
  }

  return (
    <GenreContainer
      showActions={session?.user?.role === "Admin"}
      title={title}
      genres={genres}
    ></GenreContainer>
  );
}

export default Genres;
