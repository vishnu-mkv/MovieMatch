import { Role } from "@/constants";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";

interface childrenProps {
  children: ReactNode;
}

interface UserStateProps extends childrenProps {
  loggedIn: boolean;
  role?: Role;
}

export function RenderIfUser({ loggedIn, role, children }: UserStateProps) {
  const { data: session } = useSession();

  if (
    (loggedIn && !session?.user) ||
    (!loggedIn && session?.user) ||
    (role && session?.user?.role && session?.user?.role < role)
  )
    return <></>;

  return <>{children}</>;
}

export function IfAuthenticated({ children }: childrenProps) {
  return <RenderIfUser loggedIn={true}>{children}</RenderIfUser>;
}

export function IfNotAuthenticated({ children }: childrenProps) {
  return <RenderIfUser loggedIn={false}>{children}</RenderIfUser>;
}

export function IfAdmin({ children }: childrenProps) {
  return (
    <RenderIfUser loggedIn={true} role={Role.admin}>
      {children}
    </RenderIfUser>
  );
}
