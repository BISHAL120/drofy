"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import {
  BadgeCheckIcon,
  Edit,
  FolderTree,
  Plus,
  Search,
  Trash2,
  TriangleAlert,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ConfirmationDialog from "../components/confirmationDialog";

interface BaseCategory {
  allCategories: ({
    id: string;
    description: string | null;
    name: string;
    imageUrl: string | null;
    productCount: number;
    isActive: boolean;
    isFeatured: boolean;
  } & {
    subCategory: {
      id: string;
      name: string;
      productCount: number;
    }[];
  })[];
}

export default function CategoriesPage({ allCategories }: BaseCategory) {
  const router = useRouter();

  const handleDelete = async (categoryId: string) => {
    toast.loading("Processing...");
    axios
      .delete(`/api/admin/categories`, {
        data: {
          id: categoryId,
        },
      })
      .then((res) => {
        toast.dismiss();
        router.refresh();
        toast.success(res.data.message, {
          duration: 5000,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.dismiss();
        router.refresh();
        toast.error(err.response.data.message, {
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
      });
  };

  const handleDeleteSubCategory = async (subCategoryId: string) => {
    toast.loading("Processing...");
    axios
      .delete(`/api/admin/subCategory`, {
        data: {
          id: subCategoryId,
        },
      })
      .then((res) => {
        toast.dismiss();
        router.refresh();
        toast.success(res.data.message, {
          duration: 5000,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.dismiss();
        router.refresh();
        toast.error(err.response.data.message, {
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
      });
  };

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
            <p className="text-muted-foreground">
              Manage product categories and subcategories
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button asChild variant="outline">
              <Link href="/admin/categories/new-subcategory">
                <Plus className="mr-2 h-4 w-4" />
                Add Subcategory
              </Link>
            </Button>
            <Button asChild>
              <Link href="/admin/categories/action">
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Link>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Category Management</CardTitle>
            <CardDescription>
              Organize your products with categories and subcategories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search categories..." className="pl-10" />
              </div>
            </div>

            <div className="space-y-6">
              {allCategories.map((category) => (
                <Card key={category.id}>
                  <CardContent className="px-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <Image
                          src={category.imageUrl || "/placeholder.svg"}
                          alt={category.name}
                          width={120}
                          height={120}
                          className="rounded-lg"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">
                              {category.name}
                            </h3>
                            {category.isActive ? (
                              <Badge
                                variant="secondary"
                                className="bg-blue-500 text-white dark:bg-blue-600"
                              >
                                Active
                                <BadgeCheckIcon />
                              </Badge>
                            ) : (
                              <Badge variant="destructive">
                                Inactive <X className="w-4 h-4 font-semibold" />
                              </Badge>
                            )}
                            {
                              category.isFeatured ? (
                                <Badge
                                  variant="secondary"
                                  className="bg-yellow-500 text-white dark:bg-yellow-600 flex items-center gap-1"
                                >
                                  Featured
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                  </svg>
                                </Badge>
                              ) : null
                              // <Badge
                              //     variant="outline"
                              //     className="text-gray-500 border-gray-300"
                              // >
                              //     Not Featured
                              // </Badge>
                            }
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {category.description}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {category.productCount} products
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button asChild variant="ghost" size="sm">
                          <Link
                            href={`/admin/categories/action?type=edit&id=${category.id}`}
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <ConfirmationDialog
                          currentState={false}
                          onConfirm={() => handleDelete(category.id)}
                          trigger={
                            <Button
                              variant="ghost"
                              size="sm"
                              className="border hover:bg-amber-700 hover:text-white transition-colors duration-300"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          }
                          title="Delete Category"
                          description="Are you sure you want to delete this category?"
                        />
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      {category.subCategory.length !== 0 ? (
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-medium flex items-center">
                            <FolderTree className="mr-2 h-4 w-4" />
                            Subcategories
                          </h4>
                          <Button asChild variant="outline" size="sm">
                            <Link
                              href={`/admin/categories/new-subcategory?catId=${category.id}`}
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Add Subcategory
                            </Link>
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center p-6 text-center bg-slate-200 rounded-xl border border-dashed border-slate-200">
                          <div className="rounded-full bg-slate-100 p-3 mb-3">
                            <FolderTree className="h-6 w-6 text-slate-400" />
                          </div>
                          <h3 className="text-lg font-medium text-slate-900 mb-2">
                            No Subcategories Yet
                          </h3>
                          <p className="text-sm text-slate-500 mb-4">
                            Create subcategories to better organize your
                            products
                          </p>
                          <Button asChild variant="outline">
                            <Link
                              href={`/admin/categories/new-subcategory?catId=${category.id}`}
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Add First Subcategory
                            </Link>
                          </Button>
                        </div>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {category.subCategory.map((subCategory, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <div className="flex items-center space-x-2">
                              <span
                                title={subCategory.name}
                                className="text-sm font-medium"
                              >
                                {subCategory.name.slice(0, 15)}
                                {subCategory.name.length > 15 ? "..." : ""}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                ({subCategory.productCount} products)
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button asChild variant="ghost" size="sm">
                                <Link
                                  href={`/admin/categories/new-subcategory?type=edit&catId=${subCategory.id}&subCatId=${subCategory.id}`}
                                >
                                  <Edit className="h-4 w-4" />
                                </Link>
                              </Button>
                              <ConfirmationDialog
                                currentState={false}
                                onConfirm={() =>
                                  handleDeleteSubCategory(subCategory.id)
                                }
                                trigger={
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="border hover:bg-amber-700 hover:text-white transition-colors duration-300"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                }
                                title="Delete Subcategory"
                                description="Are you sure you want to delete this subcategory?"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
