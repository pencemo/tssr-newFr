import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Loader2,
} from "lucide-react";
import { useGetOrderByStatus } from "@/hooks/tanstackHooks/useOrder";

const OrderCancelled = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isPending } = useGetOrderByStatus({
    page: currentPage,
    limit,
    status: "cancelled",
    search: debouncedSearch,
  });

  const orders = data?.data || [];
  const totalPage = data?.totalPages || 1;

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl font-semibold">Cancelled Orders</h2>
        <Input
          type="text"
          placeholder="Search by product name..."
          className="max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="w-full overflow-x-auto">
        <Table>
          <TableCaption>All cancelled orders</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Buyer</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <div className="flex justify-center items-center h-48 w-full">
                    <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
                  </div>
                </TableCell>
              </TableRow>
            ) : orders.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-6 text-muted-foreground"
                >
                  No cancelled orders found.
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => {
                const productName = order.productId?.name || "N/A";
                const price = order.productId?.price || 0;
                const total = price * order.quantity;

                return (
                  <TableRow key={order._id}>
                    <TableCell className="font-medium">{productName}</TableCell>
                    <TableCell>{order.buyerId?.name || "N/A"}</TableCell>
                    <TableCell className="truncate max-w-[150px]">
                      {order.buyerId?.email || "N/A"}
                    </TableCell>
                    <TableCell>₹{price}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell className="text-right font-semibold">
                      ₹{total}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="destructive"
                        className="bg-red-600 text-white"
                      >
                        Cancelled
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        {totalPage > 0 && (
          <div className="flex items-center sm:justify-end justify-between space-x-2 py-4 px-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPage}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPage))
              }
              disabled={currentPage === totalPage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(totalPage)}
              disabled={currentPage === totalPage}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCancelled;
