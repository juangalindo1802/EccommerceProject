"use client";

import { Loader2, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

type ProductFormAction = (formData: FormData) => Promise<void>;

type ProductFormProps = {
  action: ProductFormAction;
  categories: { id: string; name: string }[];
  initial?: {
    id: string;
    name: string;
    slug: string;
    shortDescription: string;
    description: string;
    price: number;
    compareAtPrice: number | null;
    stock: number;
    rating: number;
    featured: boolean;
    specs: string[];
    categoryId: string;
    images: string[];
  };
};

export function ProductForm({ action, categories, initial }: ProductFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [imageUrls, setImageUrls] = useState<string[]>(initial?.images ?? []);
  const [isUploading, setIsUploading] = useState(false);

  const onUploadFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    try {
      setIsUploading(true);
      const uploadedUrls: string[] = [];
      for (const file of Array.from(files)) {
        const url = await uploadImageToCloudinary(file);
        uploadedUrls.push(url);
      }
      setImageUrls((current) => [...current, ...uploadedUrls]);
      toast.success("Imagenes subidas a Cloudinary.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error al subir imagen.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        formData.set("imageUrls", imageUrls.join(","));

        startTransition(async () => {
          try {
            await action(formData);
            toast.success("Producto guardado correctamente.");
            router.push("/admin/products");
            router.refresh();
          } catch (error) {
            toast.error(error instanceof Error ? error.message : "No se pudo guardar producto.");
          }
        });
      }}
    >
      {initial ? <input type="hidden" name="id" defaultValue={initial.id} /> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium">Nombre</span>
          <input
            name="name"
            defaultValue={initial?.name ?? ""}
            required
            className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Slug</span>
          <input
            name="slug"
            defaultValue={initial?.slug ?? ""}
            required
            className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm"
          />
        </label>
      </div>

      <label className="space-y-2">
        <span className="text-sm font-medium">Descripcion corta</span>
        <input
          name="shortDescription"
          defaultValue={initial?.shortDescription ?? ""}
          required
          className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm"
        />
      </label>

      <label className="space-y-2">
        <span className="text-sm font-medium">Descripcion larga</span>
        <textarea
          name="description"
          defaultValue={initial?.description ?? ""}
          required
          className="min-h-32 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-4">
        <label className="space-y-2">
          <span className="text-sm font-medium">Precio</span>
          <input
            name="price"
            type="number"
            defaultValue={initial?.price ?? 0}
            min={1}
            required
            className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Precio comparativo</span>
          <input
            name="compareAtPrice"
            type="number"
            defaultValue={initial?.compareAtPrice ?? undefined}
            min={0}
            className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Stock</span>
          <input
            name="stock"
            type="number"
            defaultValue={initial?.stock ?? 0}
            min={0}
            required
            className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Rating</span>
          <input
            name="rating"
            type="number"
            step="0.1"
            min={0}
            max={5}
            defaultValue={initial?.rating ?? 4.5}
            required
            className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium">Categoria</span>
          <select
            name="categoryId"
            defaultValue={initial?.categoryId ?? categories[0]?.id}
            className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-input bg-background px-3">
          <input
            name="featured"
            type="checkbox"
            defaultChecked={initial?.featured ?? false}
            className="h-4 w-4"
          />
          <span className="text-sm font-medium">Destacado</span>
        </label>
      </div>

      <label className="space-y-2">
        <span className="text-sm font-medium">Specs (separadas por coma)</span>
        <input
          name="specs"
          defaultValue={initial?.specs.join(", ") ?? ""}
          required
          className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm"
        />
      </label>

      <div className="space-y-3 rounded-2xl border border-border/70 p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Imagenes (Cloudinary)</p>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-3 py-1 text-xs">
            {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
            Subir imagenes
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(event) => onUploadFiles(event.target.files)}
            />
          </label>
        </div>
        {imageUrls.length === 0 ? (
          <p className="text-xs text-muted-foreground">No hay imagenes cargadas.</p>
        ) : (
          <div className="grid gap-2 sm:grid-cols-2">
            {imageUrls.map((url) => (
              <div key={url} className="truncate rounded-lg bg-secondary/60 px-3 py-2 text-xs">
                {url}
              </div>
            ))}
          </div>
        )}
      </div>

      <Button type="submit" disabled={isPending || isUploading}>
        {isPending ? "Guardando..." : initial ? "Actualizar producto" : "Crear producto"}
      </Button>
    </form>
  );
}
