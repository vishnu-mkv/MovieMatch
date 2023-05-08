"use client";
import useMovie from "@/hooks/useMovie";
import { pageProps } from "../page";
import Loading from "@/app/loading";
import { useSession } from "next-auth/react";
import UnAuthorized from "@/components/UnAuthorized";
import Button from "@/components/Button";
import { useState } from "react";
import { deleteMovie } from "@/services/movies";
import Toast from "@/components/Toast";

async function DeleteMovie({ params: { id } }: pageProps) {
  const [movie, loading] = useMovie(id);
  const { data: session } = useSession();
  const [deleted, setDeleted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!movie?.id) return;
    setDeleting(true);
    await deleteMovie(movie.id);
    setDeleted(true);
    setShowToast(true);
    setDeleting(false);
  }

  if (!loading && (!session || session.user?.id !== movie?.user.id))
    return <UnAuthorized></UnAuthorized>;

  if (loading) return <Loading />;

  return (
    <div className="card">
      <div className="card-content">
        <h1 className="title">Delete Movie?</h1>
        {deleted && <p>This movie has been deleted.</p>}
        {!deleted && (
          <div className="">
            <p>Are you sure to delete "{movie?.title}"</p>
            <div className="buttons my-4">
              <Button
                text="Delete"
                color="is-danger"
                onClick={handleDelete}
                loading={deleting}
              ></Button>
              <Button
                color="is-dark is-outlined"
                text="Cancel"
                href="../"
              ></Button>
            </div>
          </div>
        )}
      </div>
      <Toast
        open={showToast}
        setOpen={setShowToast}
        title="The movie has been deleted successfully!"
        color={"is-success"}
      ></Toast>
    </div>
  );
}

export default DeleteMovie;
