import { supabase } from "../supabase";

// Upload any file (image, PDF, video)
export async function uploadFile(file, folder = "general") {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { data, error } = await supabase.storage
    .from("barangay-system")  // your bucket name
    .upload(filePath, file);

  if (error) throw error;

  // Get public URL
  const { data: urlData } = supabase.storage
    .from("barangay-system")
    .getPublicUrl(filePath);

  return urlData.publicUrl;
}

// Delete a file
export async function deleteFile(filePath) {
  const { error } = await supabase.storage
    .from("barangay-system")
    .remove([filePath]);

  if (error) throw error;
}

// List files in a folder
export async function listFiles(folder = "general") {
  const { data, error } = await supabase.storage
    .from("barangay-system")
    .list(folder);

  if (error) throw error;
  return data;
}