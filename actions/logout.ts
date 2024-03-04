"use server";

import { signOut } from "@/auth";

export const logout = async () => {
  await signOut();
  return Response.redirect(new URL("/"));
};
