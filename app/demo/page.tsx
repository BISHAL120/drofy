"use client";

import { Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface FormInputs {
  name: string;
  description: string;
  image: File | null;
}

const Page = () => {
  const [previewImage, setPreviewImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    // reset,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();
    formData.append(
      "details",
      JSON.stringify({
        data,
      })
    );
    if (previewImage) {
      formData.append("image", previewImage);
    }

    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // reset();
        // setPreviewImage(null);
        // alert("Form submitted successfully!");
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPreviewImage(e.target.files[0]);
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    setValue("image", null);
  };

  return (
    <div>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              className="mt-1 p-3 border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              rows={4}
              className="mt-1 p-3 border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image Upload
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              {...register("image", { required: "Image is required" })}
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-indigo-50 file:text-indigo-700
                                hover:file:bg-indigo-100"
            />
            {errors.image && (
              <p className="mt-1 text-sm text-red-600">
                {errors.image.message}
              </p>
            )}
          </div>

          {previewImage && (
            <div className="mt-4 p-3 border rounded-md">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">
                  Image Preview
                </label>
                <button
                  type="button"
                  onClick={removeImage}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  <Trash2 className="h-8 w-8 border rounded-full p-2 bg-rose-500 text-white" />
                </button>
              </div>
              <div className="mt-1">
                <Image
                  width={300}
                  height={300}
                  src={URL.createObjectURL(previewImage)}
                  alt="Preview"
                  className="h-60 w-auto object-cover rounded-md"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
