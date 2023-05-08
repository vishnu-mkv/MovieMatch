export enum Role {
  user = "User",
  admin = "Admin",
}

export interface User {
  role?: Role;
  firstName: string;
  lastName: string;
  id: number;
}

export interface LoginData {
  token: string;
  user: User;
}

export const dateOptions: any = {
  weekday: undefined,
  year: "numeric",
  month: "short",
  day: "numeric",
};
