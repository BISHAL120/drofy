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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { RotateCcw, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface DeletedProductsPageProps {
  deletedProducts: {
    category: {
      name: string;
    };
    name: string;
    id: string;
    saleCount: number | null;
    SubCategory: {
      name: string;
    };
    sku: string;
    cost: number;
    sellingPrice: number;
    discountPrice: number | null;
    stock: number;
    imageUrl: string;
    inStock: boolean;
  }[];
  deletedProductsCount: number;
}

const DeletedProducts = ({
  deletedProducts,
  deletedProductsCount,
}: DeletedProductsPageProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(deletedProductsCount / 10);
  const router = useRouter();

  useEffect(() => {
    // Create timeout to delay URL update
    const timeoutId = setTimeout(() => {
      // Build query params object
      const params = new URLSearchParams();

      if (currentPage) params.set("page", currentPage.toString());

      // Construct URL with query params
      const url = `/admin/products/deleted${
        params.toString() ? `?${params.toString()}` : ""
      }`;

      // Only update URL if params changed
      if (url !== window.location.pathname + window.location.search) {
        router.push(url);
      }
    }, 100); // 1 second delay

    // Cleanup timeout on unmount or when dependencies change
    return () => clearTimeout(timeoutId);
  }, [currentPage, router]);

  const handleDelete = async (productId: string) => {
    toast.loading("Processing...");
    axios
      .delete(`/api/admin/products`, {
        data: {
          id: productId,
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
          description: "Something went wrong.",
          descriptionClassName: "text-sm",
          duration: 5000,
        });
      });
  };

  const handleRestore = async (productId: string) => {
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
          description: "Something went wrong.",
          descriptionClassName: "text-sm",
          duration: 5000,
        });
      });
  };

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              {" "}
              Deleted Products
            </h2>
            <p className="text-muted-foreground">
              Manage deleted products catalog and inventory
            </p>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Permanently Delete</CardTitle>
            <CardDescription>
              Remove product permanently from your platform
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                  {deletedProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="relative group">
                            <Image
                              src={product.imageUrl || "/placeholder.svg"}
                              alt={product.name}
                              width={100}
                              height={100}
                              className="rounded-md h-[75px] w-[75px] object-cover cursor-pointer"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{product.name}</div>
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
                          <Badge variant="destructive" className="">
                            Deleted
                            <Trash2 />
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2 items-center">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="border hover:bg-fuchsia-600 hover:text-white transition-colors duration-300"
                              >
                                <RotateCcw className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Restore Product</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to restore this product?
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                  <Button
                                    onClick={() => handleRestore(product.id)}
                                    className="bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300 text-white"
                                    variant="default"
                                  >
                                    Confirm
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Dialog>
                            <DialogTrigger asChild>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="border hover:bg-amber-700 hover:text-white transition-colors duration-300"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Delete Product</DialogTitle>
                                <DialogDescription>
                                  are you sure you want to delete this product?
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                  <Button
                                    onClick={() => handleDelete(product.id)}
                                    variant={"destructive"}
                                  >
                                    Confirm
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
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
            {deletedProducts.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No Deleted products found.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeletedProducts;
