"use client";

import Loading from "@/app/loading";
import { pageProps } from "@/app/movies/[id]/page";
import { FormContainer, FormProps } from "@/components/Form";
import useGenre from "@/hooks/useGenre";
import { addGenre, updateGenre } from "@/services/movies";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";

function UpdateGenre({ params: { id } }: pageProps) {
  const router = useRouter();
  const [genre, loading] = useGenre(id);

  const GenreFormData = {
    name: genre?.name,
    photo: undefined,
  };

  const GenreFormProps: FormProps<typeof GenreFormData> = {
    button: { text: "Save Changes" },
    title: "Update Genre",
    initial: GenreFormData,
    fields: [
      {
        label: "Name",
        name: "name",
        type: "string",
      },
      {
        label: "Picture",
        name: "photo",
        type: "file",
        inputProps: {
          accept: "image/*",
        },
        onChange: (e) => {
          return e.target.files[0];
        },
        required: false,
        defaultValue: genre?.photo,
      },
    ],
  };

  async function onSubmit(d: any, e: FormEvent) {
    const data = new FormData(e.target as any);
    console.log(genre?.id);
    if (!genre?.id) return;

    data.append("id", genre?.id.toString());
    const res = await updateGenre(genre.id, data);
    router.push("/genres/" + res.id);
  }

  if (loading) return <Loading />;

  return (
    <div>
      <FormContainer {...GenreFormProps} onSubmit={onSubmit}></FormContainer>
    </div>
  );
}

export default UpdateGenre;
