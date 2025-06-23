"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { productSchema } from "@/lib/zod/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";
import axios from "axios";
import {
  ArrowBigUpDash,
  LoaderCircle,
  Plus,
  RotateCw,
  TriangleAlert,
  Upload,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import ImageDeleteConfirmation from "../../components/imageDeleteConfirmation";

interface ProductCategories {
  id: string;
  name: string;
  subCategory: {
    id: string;
    name: string;
  }[];
}

export default function AddProductPage({
  initialData,
  categories,
}: {
  initialData: Product | undefined;
  categories: ProductCategories[];
}) {
  const [productImages, setProductImages] = useState<File | null>();
  const [initialImage, setInitialImage] = useState<string>(
    initialData?.imageUrl || ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const router = useRouter();

  const loadingText = initialData
    ? "Updating Product..."
    : "Creating Product...";
  const buttonText = initialData ? "Update Product" : "Create Product";

  // 1. Define your form.
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          deliveryCharge: initialData.deliveryCharge.toString(),
          cost: initialData.cost.toString(),
          sellingPrice: initialData.sellingPrice.toString(),
          stock: initialData.stock.toString(),
          weight: initialData.weight.toString(),
          shortDescription: initialData.shortDescription || "",
          brand: initialData.brand || "",
          discountPrice: initialData.discountPrice?.toString() || "",
          stockAlert: initialData.stockAlert?.toString() || "",
          videoUrl: initialData.videoUrl || "",
          dimensions: initialData.dimensions || "",
          metaTitle: initialData.metaTitle || "",
          metaDescription: initialData.metaDescription || "",
        }
      : {
          name: "",
          fullDescription: "",
          categoryId: "",
          subCategoryId: "",
          status: "ACTIVE",
          isFeatured: false,
          stockAlert: "",
          weight: "",
          dimensions: "",
          cost: "",
          sellingPrice: "",
          discountPrice: "",
          trackInventory: false,
          inStock: true,
          stock: "",
          deliveryCharge: "120",
          metaTitle: "",
          metaDescription: "",
        },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof productSchema>) {
    if (!initialImage && !productImages) {
      toast.error("দয়া করে ছবি নির্বাচন করুন", {
        duration: 5000,
        icon: <TriangleAlert className="h-4 w-4" />,
        style: {
          borderRadius: "6px",
          background: "red",
          color: "white",
          border: "1px solid #ff0000",
          fontSize: "16px",
          fontWeight: "bold",
        },
      });
      return;
    }

    toast.loading(loadingText);
    setIsLoading(true);

    const formdata = new FormData();
    formdata.append("imageUrl", productImages || "");
    if (initialData) {
      formdata.append(
        "Details",
        JSON.stringify({
          ...initialData,
          ...values,
        })
      );
    } else {
      formdata.append("Details", JSON.stringify(values));
    }

    if (initialData) {
      axios
        .patch(`/api/admin/products/${initialData.id}`, formdata)
        .then((response) => {
          // Handle success, e.g., show a success message or redirect
          toast.dismiss();
          setIsLoading(false);
          toast.success(response.data.message, {
            description: "Product Updated Successfully.",
            duration: 5000,
          });
          router.push("/admin/products"); // Redirect to the products list page after
        })
        .catch((error) => {
          console.log("Error creating product:", error);
          // Handle error, e.g., show an error message
          toast.dismiss();
          setIsLoading(false);
          toast.error(error.response.data.message, {
            duration: 5000,
            icon: <TriangleAlert className="h-4 w-4" />, // Replace with your desired icon component
            style: {
              borderRadius: "6px",
              fontSize: "16px",
              background: "red",
              color: "white",
              border: "1px solid #ff0000",
            },
          });
        });
    } else {
      axios
        .post("/api/admin/products", formdata)
        .then((response) => {
          toast.dismiss();
          setIsLoading(false);
          toast.success(response.data.message, {
            description: "New product has been added successfully.",
            descriptionClassName: "text-sm",
            duration: 5000,
          });
          //   router.push("/admin/products");
        })
        .catch((error) => {
          console.log(error);
          toast.dismiss();
          setIsLoading(false);
          toast.error(error.response.data.message, {
            description: "Something went wrong.",
            descriptionClassName: "text-sm",
            duration: 5000,
          });
        });
    }
  }

  const { watch } = form;

  const watchedCategory = watch("categoryId");
  const watchedCostPrice = watch("cost");
  const watchedSellingPrice = watch("sellingPrice");

  const handleImageSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (7MB limit)
      const maxSize = 7 * 1024 * 1024; // 7MB in bytes
      if (file.size > maxSize) {
        toast.error("Image size must be less than 7MB", {
          duration: 5000,
          icon: <TriangleAlert className="h-4 w-4" />,
          style: {
            borderRadius: "6px",
            background: "red",
            color: "white",
            border: "1px solid #ff0000",
          },
        });
        return;
      }

      // Check file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/heic",
        "image/webp",
        "image/avif",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error(
          "Please upload a valid image file (JPEG, JPG, PNG, HEIC, WEBP, AVIF)",
          {
            duration: 5000,
            icon: <TriangleAlert className="h-4 w-4" />,
            style: {
              borderRadius: "6px",
              background: "red",
              color: "white",
              border: "1px solid #ff0000",
            },
          }
        );
        return;
      }

      setProductImages(file);
    }
  };

  const removeImage = () => {
    setProductImages(null);
  };

  const selectedCategoryData = categories.find(
    (cat) => cat.id === watchedCategory
  );
  const profitMargin =
    watchedSellingPrice && watchedCostPrice
      ? (
          ((Number(watchedSellingPrice) - Number(watchedCostPrice)) /
            Number(watchedSellingPrice)) *
          100
        ).toFixed(2)
      : "0";

  return (
    <div className="flex flex-col relative">
      {initialData?.isDeleted && (
        <div className="fixed inset-0 flex justify-center items-center bg-red-500/20 backdrop-blur-sm z-40">
          <div className="flex flex-col items-center justify-center gap-4">
            {restoring && (
              <RotateCw
                className={` ${
                  restoring && "animate-spin"
                } h-16 w-16 mb-16 mr-4 text-red-500`}
              />
            )}
            <p className="text-sm text-gray-500 text-center max-w-[300px]">
              This product is currently in trash. Click restore to make it
              available again in your store.
            </p>
            <div className="space-x-3">
              <Button
                asChild
                disabled={restoring}
                type="button"
                variant="outline"
              >
                <Link href="/admin/products">Go Back</Link>
              </Button>
              <Button
                onClick={() => {
                  setRestoring(true);
                  axios
                    .delete(`/api/admin/products/${initialData?.id}`)
                    .then(() => {
                      toast.success("Product restored successfully");
                      setRestoring(false);
                      router.refresh();
                    })
                    .catch((error) => {
                      setRestoring(false);
                      toast.error(
                        "Failed to restore product: " + error.message
                      );
                    });
                }}
                variant="destructive"
                className="bg-green-600 hover:bg-green-700"
              >
                Restore Product
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="flex-1 space-y-6 p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-x-4">
          {/* <Link href="/admin/products">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Products
                        </Button>
                    </Link> */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Add New Product
            </h2>
            <p className="text-muted-foreground">
              Create a new product for your catalog
            </p>
          </div>
          <div>
            <div className="flex justify-end space-x-4 pt-6">
              <Link href="/products">
                <Button disabled={isLoading} type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button disabled={isLoading} type="button" variant="outline">
                Save as Draft
              </Button>
              <Button
                disabled={isLoading}
                type="submit"
                onClick={form.handleSubmit(onSubmit)}
                variant={initialData ? "secondary" : "default"}
                className={
                  initialData
                    ? "bg-green-600 hover:bg-green-500 text-white"
                    : ""
                }
              >
                {isLoading ? (
                  <LoaderCircle className="animate-spin mr-2 h-4 w-4" />
                ) : (
                  <div className="relative">
                    {initialData ? (
                      <>
                        {" "}
                        <div className="w-4 h-4" />{" "}
                        <ArrowBigUpDash className="absolute -top-1 -left-2 size-5 md:size-6" />{" "}
                      </>
                    ) : (
                      <Plus className="mr-2 h-4 w-4" />
                    )}
                  </div>
                )}
                {buttonText}
              </Button>
            </div>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Main Product Information */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Information</CardTitle>
                    <CardDescription>
                      Basic details about your product
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Name *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isLoading}
                              placeholder="Enter product name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="shortDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Short Description *</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              disabled={isLoading}
                              placeholder="Brief product description (max 160 characters)"
                              rows={2}
                              maxLength={160}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="fullDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Description *</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              disabled={isLoading}
                              placeholder="Detailed product description"
                              rows={6}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="brand"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Brand</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={isLoading}
                                placeholder="Product brand"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="sku"
                        render={({ field }) => (
                          <FormItem className="cursor-not-allowed">
                            <FormLabel>
                              SKU *{" "}
                              {!initialData &&
                                "( This value automatically generate on the Backend)"}
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={true}
                                placeholder="PROD-XXX"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Product Images */}
                <Card className="relative">
                  <CardHeader>
                    <CardTitle>Product Media</CardTitle>
                    <CardDescription>
                      Upload product images and video{" "}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-2">
                        Product Image
                      </h3>
                      <div className="w-full">
                        {initialImage ? (
                          <div className="relative group w-full">
                            <div className="w-full flex justify-center">
                              <Image
                                src={initialImage}
                                alt="Product"
                                width={400}
                                height={400}
                                className=" max-w-[400px] max-h-[400px] object-contain rounded-lg border bg-gray-50"
                              />
                            </div>
                            {/* <Button
                                                                type="button"
                                                                variant="destructive"
                                                                size="sm"
                                                                className="absolute top-2 right-2"
                                                                onClick={removeImage}
                                                            >
                                                                <X className="h-4 w-4" />
                                                            </Button> */}

                            <ImageDeleteConfirmation
                              trigger={
                                <Button
                                  type="button"
                                  variant="destructive"
                                  disabled={isLoading}
                                  size="sm"
                                  className="absolute top-2 right-2"
                                  onClick={removeImage}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              }
                              title="Remove Image"
                              description="Are you sure you want to remove this image?"
                              setInitialImage={setInitialImage}
                            />
                          </div>
                        ) : (
                          <div>
                            {productImages ? (
                              <div className="relative group w-full">
                                <div className="w-full flex justify-center">
                                  <Image
                                    src={
                                      URL.createObjectURL(productImages) ||
                                      "/placeholder.svg"
                                    }
                                    alt="Product"
                                    width={400}
                                    height={400}
                                    className="w-fit max-w-[400px] max-h-[400px] object-contain rounded-lg border bg-gray-50"
                                  />
                                </div>
                                <Button
                                  type="button"
                                  variant="destructive"
                                  disabled={isLoading}
                                  size="sm"
                                  className="absolute top-4 right-4"
                                  onClick={() => removeImage()}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                                {productImages && (
                                  <div className="absolute bottom-4 left-4 bg-primary text-primary-foreground text-sm px-3 py-1 rounded-md font-medium">
                                    Main Product Image
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                <input
                                  type="file"
                                  accept="image/*"
                                  disabled={isLoading}
                                  onChange={handleImageSize}
                                  className="hidden"
                                  id="image-upload"
                                />
                                <label
                                  htmlFor="image-upload"
                                  className="cursor-pointer"
                                >
                                  <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                                  <p className="text-base font-medium">
                                    Upload Subcategory Image
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    (JPEG, JPG, PNG, HEIC, WEBP, AVIF) up to 7MB
                                  </p>
                                </label>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">
                        Product Video
                      </h3>
                      <FormField
                        control={form.control}
                        name="videoUrl"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex gap-2">
                              <FormControl>
                                <Input
                                  {...field}
                                  disabled={isLoading}
                                  placeholder="Enter YouTube video URL"
                                  className="mb-2"
                                />
                              </FormControl>
                              {field.value && (
                                <Button
                                  type="button"
                                  variant="destructive"
                                  disabled={isLoading}
                                  size="icon"
                                  className="mb-2"
                                  onClick={() => field.onChange("")}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                            <FormDescription>
                              Paste a YouTube video URL to showcase your product
                            </FormDescription>
                            {field.value && (
                              <div className="mt-4 aspect-video w-full">
                                <iframe
                                  src={`https://www.youtube.com/embed/${
                                    field.value.split("v=")[1]
                                  }`}
                                  title="Product video"
                                  className="w-full h-full rounded-lg"
                                  allowFullScreen
                                />
                              </div>
                            )}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* SEO Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle>SEO Settings</CardTitle>
                    <CardDescription>
                      Optimize your product for search engines
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="metaTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Title</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isLoading}
                              placeholder="SEO title for search engines"
                              maxLength={60}
                            />
                          </FormControl>
                          <FormDescription className="text-sm text-muted-foreground">
                            {watch("metaTitle")?.length || 0}/60 characters
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="metaDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Description</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              disabled={isLoading}
                              placeholder="SEO description for search engines"
                              rows={3}
                              maxLength={160}
                            />
                          </FormControl>
                          <FormDescription className="text-sm text-muted-foreground">
                            {watch("metaDescription")?.length || 0}/160
                            characters
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Category & Status */}
                <Card>
                  <CardHeader>
                    <CardTitle>Category & Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category *</FormLabel>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                            }}
                            disabled={isLoading}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={category.id}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {selectedCategoryData && (
                      <>
                        {selectedCategoryData.subCategory.length > 0 ? (
                          <FormField
                            control={form.control}
                            name="subCategoryId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Subcategory *</FormLabel>
                                <Select
                                  disabled={isLoading}
                                  onValueChange={(value) => {
                                    field.onChange(value);
                                  }}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select subcategory" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {selectedCategoryData.subCategory.map(
                                      (category) => (
                                        <SelectItem
                                          key={category.id}
                                          value={category.id}
                                        >
                                          {category.name}
                                        </SelectItem>
                                      )
                                    )}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        ) : (
                          <>
                            <p className="text-red-500 text-sm mt-2">
                              No subcategories available for this category.
                              Please select a different category or add
                              subcategories first.
                            </p>
                          </>
                        )}
                      </>
                    )}
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select
                            disabled={isLoading}
                            onValueChange={(value) => {
                              field.onChange(value);
                            }}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ACTIVE">Active</SelectItem>
                              <SelectItem value="INACTIVE">Inactive</SelectItem>
                              <SelectItem value="DRAFT">Draft</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="isFeatured"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex flex-col gap-4 space-x-2">
                            <div className="flex items-center gap-2">
                              <Switch
                                id="isFeatured"
                                disabled={isLoading}
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                              <FormLabel htmlFor="isFeatured">
                                Featured Product
                              </FormLabel>
                            </div>
                            <FormDescription>
                              Featured Product functionality is not specified
                            </FormDescription>
                          </div>
                          <FormControl></FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Pricing */}
                <Card>
                  <CardHeader>
                    <CardTitle>Pricing</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="cost"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cost Price *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isLoading}
                              type="number"
                              step={0.01}
                              min={0}
                              placeholder="0.00"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="sellingPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Selling Price *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isLoading}
                              type="number"
                              step={0.01}
                              min={0}
                              placeholder="0.00"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="discountPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Discount Price</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isLoading}
                              type="number"
                              step={0.01}
                              min={0}
                              placeholder="0.00"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {watchedCostPrice && watchedSellingPrice && (
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm font-medium">
                          Profit Margin: {profitMargin}%
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Profit: $
                          {(
                            Number(watchedSellingPrice) -
                            Number(watchedCostPrice)
                          ).toFixed(2)}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Inventory */}
                <Card>
                  <CardHeader>
                    <CardTitle>Inventory</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="trackInventory"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex flex-col gap-4 space-x-2">
                              <div className="flex items-center gap-2">
                                <Switch
                                  id="isActive"
                                  disabled={isLoading}
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                                <FormLabel htmlFor="isActive">
                                  Track Inventory
                                </FormLabel>
                              </div>
                              <FormDescription>
                                Enable this to automatically track and manage
                                product stock levels
                              </FormDescription>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="inStock"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex flex-col gap-4 space-x-2">
                              <div className="flex items-center gap-2">
                                <Switch
                                  id="inStock"
                                  disabled={isLoading}
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                                <FormLabel htmlFor="inStock">
                                  In Stock
                                </FormLabel>
                              </div>
                              <FormDescription>
                                &quot;In Stock&quot; will make the product
                                available for purchase
                              </FormDescription>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="stock"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stock Quantity *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isLoading}
                              type="number"
                              placeholder="0"
                              min={0}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="stockAlert"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimum Stock Alert</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isLoading}
                              type="number"
                              placeholder="5"
                              min={0}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Shipping */}
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="deliveryCharge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Delivery Charge</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isLoading}
                              type="number"
                              placeholder="0.00"
                              step={0.01}
                              min={0}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Wright (kg)</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isLoading}
                              type="number"
                              placeholder="0.00"
                              step={0.01}
                              min={0}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dimensions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dimensions (L x W x H cm)</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isLoading}
                              placeholder="20 x 15 x 5"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button
                asChild
                disabled={isLoading}
                type="button"
                variant="outline"
              >
                <Link href="/admin/products">Cancel</Link>
              </Button>
              <Button disabled={isLoading} type="button" variant="outline">
                Save as Draft
              </Button>
              <Button disabled={isLoading} type="submit">
                <Plus className="mr-2 h-4 w-4" />
                Create Product
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
