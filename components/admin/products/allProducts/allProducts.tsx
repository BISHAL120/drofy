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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ImageObj, ProductStatus } from "@prisma/client";
import axios from "axios";
import {
  BadgeCheckIcon,
  Edit,
  Plus,
  RotateCcw,
  Search,
  Trash2,
  TriangleAlert,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ConfirmationDialog from "../../components/confirmationDialog";

interface AllProductsPageProps {
  allProducts: {
    id: string;
    name: string;
    images: ImageObj[];
    sku: string;
    isFeatured: boolean;
    cost: number;
    sellingPrice: number;
    discountPrice: number | null;
    inStock: boolean;
    stock: number;
    saleCount: number | null;
    status: ProductStatus;
    isDeleted: boolean;
    category: {
      name: string;
    };
    SubCategory: {
      name: string;
    };
  }[];
  allCategories: {
    id: string;
    name: string;
  }[];
  totalProductCount: number;
}

export default function AllProductsPage({
  allProducts,
  allCategories,
  totalProductCount,
}: AllProductsPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [previewImage, setPreviewImage] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(totalProductCount / 10);

  useEffect(() => {
    // Create timeout to delay URL update
    const timeoutId = setTimeout(() => {
      // Build query params object
      const params = new URLSearchParams();

      if (search) params.set("search", search);
      if (category && category !== "all") params.set("category", category);
      if (status && status !== "all") params.set("status", status);
      if (currentPage) params.set("page", currentPage.toString());

      // Construct URL with query params
      const url = `/admin/products${
        params.toString() ? `?${params.toString()}` : ""
      }`;

      // Only update URL if params changed
      if (url !== window.location.pathname + window.location.search) {
        router.push(url);
      }
    }, 100); // 1 second delay

    // Cleanup timeout on unmount or when dependencies change
    return () => clearTimeout(timeoutId);
  }, [search, category, status, router, currentPage]);

  const handleDelete = async (productId: string) => {
    toast.loading("Processing...");
    axios
      .delete(`/api/admin/products/${productId}`)
      .then((res) => {
        toast.dismiss();
        router.refresh();
        toast.success(res.data.message, {
          duration: 5000,
        });
      })
      .catch((err) => {
        toast.dismiss();
        console.log(err);
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
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold tracking-tight">Products</h2>
              <div className="px-2.5 py-0.5 bg-primary/10 text-primary rounded-md text-sm font-medium">
                {totalProductCount} items
              </div>
            </div>
            <p className="text-muted-foreground">
              Manage your product catalog and inventory
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-lg border">
                <span className="text-sm text-muted-foreground">Active:</span>
                <span className="font-medium">
                  {allProducts.filter((p) => p.status === "ACTIVE").length}
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-lg border">
                <span className="text-sm text-muted-foreground">Inactive:</span>
                <span className="font-medium">
                  {allProducts.filter((p) => p.status === "INACTIVE").length}
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-lg border">
                <span className="text-sm text-muted-foreground">Draft:</span>
                <span className="font-medium">
                  {allProducts.filter((p) => p.status === "DRAFT").length}
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-lg border">
                <span className="text-sm text-muted-foreground">Deleted:</span>
                <span className="font-medium">
                  {allProducts.filter((p) => p.isDeleted === true).length}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link href="/admin/products/edit">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Product Management</CardTitle>
            <CardDescription>
              View and manage all products in your catalog
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search By Name, Sku, Sub-Category"
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select onValueChange={(value) => setCategory(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {allCategories.map((category) => {
                    return (
                      <SelectItem value={category.id} key={category.id}>
                        {category.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => setStatus(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Cost Price</TableHead>
                    <TableHead>Selling Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Total Sales</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="relative group">
                            <Image
                              src={
                                product.images[0].imageUrl || "/placeholder.svg"
                              }
                              alt={product.name}
                              width={100}
                              height={100}
                              className="rounded-md h-[75px] w-[75px] object-cover cursor-pointer"
                              onClick={() =>
                                setPreviewImage(product.images[0]?.imageUrl)
                              }
                            />
                            {/* Preview overlay */}
                            {previewImage && (
                              <div
                                onClick={() => setPreviewImage("")}
                                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                              />
                            )}
                            {/* Large preview image */}
                            {previewImage && (
                              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                                <Image
                                  src={previewImage || "/placeholder.svg"}
                                  alt={product.name}
                                  width={400}
                                  height={400}
                                  className="rounded-lg shadow-xl w-fit h-fit max-w-[70vw] max-h-[70vh] object-contain border"
                                />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-medium">
                              {product.name.length > 50
                                ? product.name.substring(0, 47) + "..."
                                : product.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {product.sku}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {product.category.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {product.SubCategory.name}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{product.cost}</TableCell>
                      <TableCell>
                        <div className="flex flex-col pl-2 gap-2">
                          <span className="font-medium ">
                            {product.sellingPrice}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            {product.discountPrice}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {!product.inStock && "Stock Out"}
                        {product.inStock && product.stock}
                      </TableCell>
                      <TableCell>{product.saleCount}</TableCell>
                      <TableCell>
                        <div className="flex flex-col justify-center gap-2">
                          {product.isDeleted ? (
                            <Badge variant="destructive" className="">
                              Deleted
                              <Trash2 />
                            </Badge>
                          ) : (
                            <div className="space-y-1.5">
                              {product.status === "ACTIVE" && (
                                <Badge
                                  variant="secondary"
                                  className="bg-blue-500 text-white dark:bg-blue-600"
                                >
                                  Active
                                  <BadgeCheckIcon />
                                </Badge>
                              )}
                              {product.status === "INACTIVE" && (
                                <Badge variant="destructive" className="">
                                  Inactive
                                  <X />
                                </Badge>
                              )}
                              {product.status === "DRAFT" && (
                                <Badge
                                  variant="default"
                                  className="text-white bg-yellow-400"
                                >
                                  Draft
                                  <X />
                                </Badge>
                              )}
                              {product.isFeatured && (
                                <Badge
                                  variant="secondary"
                                  className="bg-gray-400 text-white dark:bg-yellow-600 flex items-center gap-1"
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
                              )}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button asChild variant="ghost" size="sm">
                            <Link
                              href={`/admin/products/edit?id=${product.id}`}
                            >
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          {product.isDeleted ? (
                            <ConfirmationDialog
                              currentState={product.isDeleted}
                              onConfirm={() => handleDelete(product.id)}
                              trigger={
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="border hover:bg-fuchsia-600 hover:text-white transition-colors duration-300"
                                >
                                  <RotateCcw className="h-4 w-4" />
                                </Button>
                              }
                              title="Restore Product"
                              description="Are you sure you want to restore this product?"
                            />
                          ) : (
                            <ConfirmationDialog
                              currentState={product.isDeleted}
                              onConfirm={() => handleDelete(product.id)}
                              trigger={
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="border hover:bg-amber-700 hover:text-white transition-colors duration-300"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              }
                              title="Delete Product"
                              description="Are you sure you want to delete this product?"
                            />
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {/* Pagination start */}
            <div className="flex items-center justify-end space-x-2 py-4">
              <div className="text-muted-foreground flex-1 text-sm">
                Page {currentPage + 1} of {totalPages}
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 0}
                  className={
                    currentPage === 0
                      ? "text-muted-foreground cursor-not-allowed"
                      : ""
                  }
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages - 1}
                  className={
                    currentPage === totalPages - 1
                      ? "text-muted-foreground cursor-not-allowed"
                      : ""
                  }
                >
                  Next
                </Button>
              </div>
            </div>
            {/* Pagination end */}
            {allProducts.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No products found matching your search criteria.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
