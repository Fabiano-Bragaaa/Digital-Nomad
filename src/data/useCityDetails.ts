import { useEffect, useState } from "react";
import { supabaseService } from "../supabase/supabaseService";
import { City } from "../types";
import { useFetchData } from "./useFetchData";

export function useCityDetails(id: string) {
  return useFetchData(() => supabaseService.findById(id));
}
