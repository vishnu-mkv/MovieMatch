"use client";

import { FormContainer, FormProps } from "@/components/Form";
import { IfAuthenticated } from "@/components/If";
import { Movie } from "@/interfaces/movie";
import { postReview } from "@/services/movies";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CommentData = {
  rating: 1,
  comment: "",
};

const CommentFormProps: FormProps<typeof CommentData> = {
  button: {
    text: "Add Review",
  },
  fields: [
    {
      label: "Rating",
      name: "rating",
      type: "number",
      onChange: (val) => {
        console.log(val.target.value);
        return parseInt(val.target.value);
      },
      inputProps: {
        min: 1,
        max: 10,
      },
      messages: [
        {
          match: "valueMissing",
          message: "Rating is required",
        },
        {
          match: "rangeOverflow",
          message: "The rating should be between 1 and 10",
        },
        {
          match: "rangeUnderflow",
          message: "The rating should be between 1 and 10",
        },
      ],
    },
    {
      label: "Comment",
      name: "comment",
      type: "string",
      messages: [
        {
          match: "valueMissing",
          message: "Comment is required",
        },
      ],
    },
  ],
  initial: CommentData,
  title: "Say something about the movie!",
  maxWidth: "100%",
};

function Comment({ movie }: { movie: Movie }) {
  const { data: session } = useSession();
  const router = useRouter();

  async function onSubmit(data: typeof CommentData) {
    console.log(data);
    await postReview({ ...data, movieId: movie.id });
    router.refresh();
  }

  return (
    <IfAuthenticated>
      {!movie.reviews.some((r) => r.user.id == session?.user?.id) && (
        <FormContainer {...CommentFormProps} onSubmit={onSubmit} />
      )}
    </IfAuthenticated>
  );
}

export default Comment;
