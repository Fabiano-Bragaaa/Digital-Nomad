import { useEffect, useState } from "react";
import { supabaseService } from "../supabase/supabaseService";
import { Category } from "../types";
import { useFetchData } from "./useFetchData";

export function useCategories() {
  return useFetchData(() => supabaseService.listCategories());
}
