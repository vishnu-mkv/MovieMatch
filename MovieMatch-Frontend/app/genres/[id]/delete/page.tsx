"use client";
import Loading from "@/app/loading";
import { useSession } from "next-auth/react";
import UnAuthorized from "@/components/UnAuthorized";
import Button from "@/components/Button";
import { useState } from "react";
import { deleteGenre } from "@/services/movies";
import Toast from "@/components/Toast";
import { pageProps } from "@/app/movies/[id]/page";
import useGenre from "@/hooks/useGenre";

async function DeleteGenre({ params: { id } }: pageProps) {
  const [genre, loading] = useGenre(id);
  const { data: session } = useSession();
  const [deleted, setDeleted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!genre?.id) return;
    setDeleting(true);
    await deleteGenre(genre.id);
    setDeleted(true);
    setShowToast(true);
    setDeleting(false);
  }

  if (!loading && !session) return <UnAuthorized></UnAuthorized>;

  if (loading) return <Loading />;

  return (
    <div className="card">
      <div className="card-content">
        <h1 className="title">Delete Genre?</h1>
        {deleted && <p>Genre - "{genre?.name}" has been deleted.</p>}
        {!deleted && (
          <div className="">
            <p>Are you sure to delete "{genre?.name}"</p>
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
        title="The genre has been deleted successfully!"
        color={"is-success"}
      ></Toast>
    </div>
  );
}

export default DeleteGenre;
