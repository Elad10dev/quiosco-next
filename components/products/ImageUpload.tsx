"use client"
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import Image from "next/image";
import { getImagenPath } from "@/src/util";

export default function ImageUpload({image}:{image?:string}) {
  const uploadPreset = "quioscoimg"; // Reemplaza esto con tu upload preset
  const [imageUrl, setImageUrl] = useState("");

  return (
    <CldUploadWidget 
    onSuccess={(result, { widget }) => {
        if(result.event === "success") {
            widget.close();
            //@ts-expect-error error por solucion
            setImageUrl(result.info?.secure_url);
        }
    }}
    uploadPreset={uploadPreset}
    options={{ maxFiles: 1 }}
    >
      {({ open }) => (
        <>
          <div className="space-y-2">
            <label className="text-slate-800">Imagen Producto</label>
            <div
              className="relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col items-center justify-center gap-4 text-neutral-600 bg-slate-100"
              onClick={() => open()}
            >
              <TbPhotoPlus size={50} />
              <p className="text-lg font-semibold">Agregar Imagen</p>

              {imageUrl && (
                  <div className="absolute inset-0 h-full w-full">
                      <Image
                        fill
                        style={{ objectFit: "contain" }}
                        src={imageUrl}
                        alt="Imagen del Producto"/>
                  </div>
              )}
            </div>
          </div>
          {image && !imageUrl && (
            <div className="space-y-2" >
              <label className="text-slate-800">Imagen Actual</label>
              <div
                className="relative w-64 h-64"
              ><Image
                  fill
                  src={getImagenPath(image)} 
                  alt={"Imagen del Producto"}
                  style={{ objectFit: "contain" }}              
                />
              </div>
            </div>
          )}
          <input type="hidden" name="image" defaultValue={imageUrl ? imageUrl : image} />
        </>
      )}
    </CldUploadWidget>
  );
}
