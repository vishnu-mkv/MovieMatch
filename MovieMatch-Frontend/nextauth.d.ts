import { Role, User } from "./constants";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: User;
    token?: string;
  }
}

declare global {
  interface String {
    toTitleCase(): string;
  }
}
