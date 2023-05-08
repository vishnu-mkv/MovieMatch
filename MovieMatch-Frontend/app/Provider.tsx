"use client";
import { SessionProvider, useSession } from "next-auth/react";
import React, { ReactNode } from "react";
import * as Toast from "@radix-ui/react-toast";

interface Props {
  children: ReactNode;
}
function Provider({ children }: Props) {
  return (
    <SessionProvider>
      <CommonProviders>{children}</CommonProviders>
    </SessionProvider>
  );
}

function CommonProviders({ children }: Props) {
  const session = useSession();

  // useEffect(() => console.log(session), [session]);

  return (
    <>
      <Toast.Provider swipeDirection="left" duration={5000}>
        {children}
        <Toast.Viewport className="ToastViewport" />
      </Toast.Provider>
    </>
  );
}

export default Provider;
