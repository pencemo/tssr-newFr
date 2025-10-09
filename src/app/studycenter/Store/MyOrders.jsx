import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOrderOfUser } from "@/hooks/tanstackHooks/useOrder";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const statusColorMap = {
  pending: "bg-yellow-100 text-yellow-800",
  accepted: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const MyOrders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const navigate = useNavigate()

  const { data, isLoading } = useOrderOfUser(currentPage, limit);
  const orders = data?.data || [];
  const totalOrders = data?.total || 0;
  const totalPage = Math.ceil(totalOrders / limit);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold ">My Orders</h2>
      <Button onClick={()=>navigate(-1)}>Back</Button>
      </div>

      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableCaption>Your recent orders</TableCaption>
          <TableHeader className='uppercase'>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ordered</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground py-6"
                >
                  No orders found.
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="font-medium">
                    {order.productId?.name || "N/A"}
                  </TableCell>
                  <TableCell className="truncate max-w-[200px]">
                    {order.productId?.description || "N/A"}
                  </TableCell>
                  <TableCell>₹{order.productId?.price.toFixed(2)}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell className="font-medium">₹{(order.productId?.price * order.quantity).toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      className={`capitalize ${
                        statusColorMap[order.status] ||
                        "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(order.createdAt), {
                        addSuffix: true,
                    })}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPage > 1 && (
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
  );
};

export default MyOrders;
