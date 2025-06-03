// components/ProductCard.jsx
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart01Icon } from "hugeicons-react";
import { toast } from "sonner";import OrderDialog from "./OrderDialog";

export default function ProductCard({ item }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirmOrder = async (orderData) => {
    // try {
    //   const res = await axiosInstance.post("/orders", orderData); // adjust endpoint
    //   if (res.data.success) {
    //     toast.success("Order placed successfully!");
    //   } else {
    //     toast.error(res.data.message || "Failed to place order");
    //   }
    // } catch (err) {
    //   toast.error("Something went wrong: " + err.message);
    // }
  };

  return (
    <>
      <Card className="w-full pt-0 overflow-hidden shadow-none hover:shadow-xl transition-all duration-300">
        <CardHeader className="p-0">
          <img
            src={
              "https://media.istockphoto.com/id/495477978/photo/open-book.jpg?s=612x612&w=0&k=20&c=vwJ6__M7CVPdjkQFUv9j2pr7QJiQ9bWW_5jXjR9TcjY="
            }
            alt={item.name}
            width={300}
            height={200}
            className="w-full h-48 object-cover border-b"
          />
        </CardHeader>

        <CardContent>
          <div className="space-y-1">
            <h3 className="font-semibold text-lg">{item.name}</h3>
            {item?.courseId && (
              <h3 className="font-medium">{item.courseId.name}</h3>
            )}
            <p className="text-sm text-muted-foreground">{item.description}</p>
            <div className="flex items-center justify-between pt-2">
              <span className="text-2xl font-bold">
                ₹{item.price.toFixed(2)}{" "}
                <span className="text-base font-normal">/-</span>
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button
            className="w-full rounded-full"
            onClick={() => setIsOpen(true)}
          >
            <ShoppingCart01Icon className="mr-2" />
            Order Now
          </Button>
        </CardFooter>
      </Card>

      {/* Order dialog */}
      <OrderDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        product={item}
        onConfirm={handleConfirmOrder}
      />
    </>
  );
}
