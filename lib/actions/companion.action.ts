"use server";

import { createSupabaseClient } from "../supabase";
import { auth } from "@clerk/nextjs/server";

//! 1-Function to create a companion:

export const createNewCompanion = async (formData: CreateCompanion) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("Companions")
    .insert({
      ...formData,
      author,
    })
    .select();

  //! 2-Check for errors:
  if (error || !data) {
    throw new Error(
      error?.message || "Failed to create companion, please try again."
    );
  }

  //! 3- Return the created companion:
  return data[0];
};
