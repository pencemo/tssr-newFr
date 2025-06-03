import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useCreateOrders } from "@/hooks/tanstackHooks/useOrder";
import AuthContext from "@/Context/authContext";

const OrderDialog = ({ open, onOpenChange, product }) => {
  const [quantity, setQuantity] = useState(1);
  const { mutate, isPending } = useCreateOrders();

  const handleOrder = () => {
    if (quantity < 1) {
      toast.error("Please enter a valid quantity.");
      return;
    }

    mutate(
      {
        productId: product._id,
        quantity: Number(quantity),
      },
      {
        onSuccess: (data) => {
          if (data.success) {
            console.log(data);
            toast.success(data.message || "Order placed successfully!");
            onOpenChange(false); // close dialog
          } else {
            toast.error(data.message || "Failed to place order.");
          }
        },
        onError: (error) => {
          toast.error(
            "Error placing order: " + (error?.message || "Unknown error")
          );
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Confirm Your Order
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            You're about to order: <strong>{product?.name}</strong>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <p className="text-sm">Price: ₹{product.price}</p>
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
          />
          <p className="text-sm font-medium">
            Total: ₹{(product.price * quantity).toFixed(2)}
          </p>
        </div>
        <DialogFooter className="flex justify-between gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button onClick={handleOrder}>
            {isPending ? (
              <Loader2 className="animate-spin h-4 w-4" />
            ) : "Confirm Order"}
            
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDialog;
