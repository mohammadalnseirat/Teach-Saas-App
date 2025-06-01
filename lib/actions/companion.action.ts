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

//! 2-Function to get All Companions:
export const getAllCompanions = async ({
  limit = 10,
  page = 1,
  subject,
  topic,
}: GetAllCompanions) => {
  //! 1-Connect to the database:
  const supabase = createSupabaseClient();

  //! 2-Get all Companions and build query:
  let query = supabase.from("Companions").select();

  if (subject && topic) {
    query = query
      .ilike("subject", `%${subject}%`)
      .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  } else if (subject) {
    query = query.ilike("subject", `%${subject}%`);
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  }

  //! 3-Pagination:
  query = query.range((page - 1) * limit, page * limit - 1);

  //! 4-Execute the query:
  const { data: companions, error } = await query;

  //! 5-Check for errors:
  if (error) {
    throw new Error(error?.message || "Failed to get companions");
  }

  //! 6-Return the companions:
  return companions;
};
