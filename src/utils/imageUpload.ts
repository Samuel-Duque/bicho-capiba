/**
 * Image upload utilities for handling profile pictures and other image uploads
 */

export interface ImageUploadResult {
  preview: string;
  file: File;
}

export interface ImageUploadError {
  message: string;
  type: "size" | "format" | "upload" | "unknown";
}

/**
 * Validates image file type
 */
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

/**
 * Maximum file size in bytes (5MB)
 */
const MAX_FILE_SIZE = 5 * 1024 * 1024;

/**
 * Validates if the file is a valid image
 */
export const validateImageFile = (
  file: File
): { valid: boolean; error?: ImageUploadError } => {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: {
        message: "Formato de arquivo inválido. Use JPG, PNG ou WebP.",
        type: "format",
      },
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: {
        message: "Arquivo muito grande. O tamanho máximo é 5MB.",
        type: "size",
      },
    };
  }

  return { valid: true };
};

/**
 * Creates a preview URL for an image file
 */
export const createImagePreview = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string);
      } else {
        reject(new Error("Failed to read file"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsDataURL(file);
  });
};

/**
 * Converts file to base64 string
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return createImagePreview(file);
};

/**
 * Handles image file selection and validation
 */
export const handleImageSelection = async (
  file: File
): Promise<
  | { success: true; data: ImageUploadResult }
  | { success: false; error: ImageUploadError }
> => {
  const validation = validateImageFile(file);

  if (!validation.valid && validation.error) {
    return { success: false, error: validation.error };
  }

  try {
    const preview = await createImagePreview(file);
    return {
      success: true,
      data: {
        preview,
        file,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: {
        message: "Erro ao processar imagem. Tente novamente.",
        type: "unknown",
      },
    };
  }
};

/**
 * Revokes an object URL to free up memory
 */
export const revokeImagePreview = (preview: string) => {
  if (preview.startsWith("blob:")) {
    URL.revokeObjectURL(preview);
  }
};

/**
 * Creates FormData for image upload
 */
export const createImageFormData = (
  file: File,
  fieldName: string = "avatar"
): FormData => {
  const formData = new FormData();
  formData.append(fieldName, file);
  return formData;
};

/**
 * Handles multiple image files selection and validation
 */
export const handleMultipleImageSelection = async (
  files: FileList
): Promise<
  | { success: true; data: ImageUploadResult[] }
  | { success: false; error: ImageUploadError }
> => {
  const results: ImageUploadResult[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const validation = validateImageFile(file);

    if (!validation.valid && validation.error) {
      return { success: false, error: validation.error };
    }

    try {
      const preview = await createImagePreview(file);
      results.push({
        preview,
        file,
      });
    } catch (error) {
      return {
        success: false,
        error: {
          message: "Erro ao processar imagem. Tente novamente.",
          type: "unknown",
        },
      };
    }
  }

  return {
    success: true,
    data: results,
  };
};

/**
 * Creates FormData for multiple image upload
 */
export const createMultipleImageFormData = (
  files: File[],
  fieldName: string = "images"
): FormData => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append(fieldName, file);
  });
  return formData;
};
