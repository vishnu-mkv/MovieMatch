"use client";

import { FormContainer, FormProps } from "@/components/Form";
import { addGenre } from "@/services/movies";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";

const GenreFormData = {
  name: "",
  photo: undefined,
};

const GenreFormProps: FormProps<typeof GenreFormData> = {
  button: { text: "Create" },
  initial: GenreFormData,
  title: "Add Genre",
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
    },
  ],
};

function AddGenre() {
  const router = useRouter();

  async function onSubmit(d: any, e: FormEvent) {
    const data = new FormData(e.target as any);
    const res = await addGenre(data);
    router.push("/genres/" + res.id);
  }

  return (
    <div>
      <FormContainer {...GenreFormProps} onSubmit={onSubmit}></FormContainer>
    </div>
  );
}

export default AddGenre;
