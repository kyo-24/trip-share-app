import { supabase } from "./supabase";

export function getCoverImage(fileName: string) {
    const { data } = supabase.storage
        .from("trip-cover-image")
        .getPublicUrl(fileName);

    return data.publicUrl;
}

// getPhotoUrlを同期関数に変更
export function getPhotoUrl(fileName: string) {
    const { data } = supabase.storage.from("trip-photo").getPublicUrl(fileName);

    return data.publicUrl;
}
