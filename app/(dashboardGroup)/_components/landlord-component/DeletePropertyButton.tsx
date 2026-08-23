"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteProperty } from "../../_action/landlord_action/deleteProperty";


type DeletePropertyButtonProps = {
  propertyId: string;
};

export default function DeletePropertyButton({
  propertyId,
}: DeletePropertyButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteProperty(propertyId);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success("Property deleted successfully");

      router.replace("/landlord-dashboard/properties");
    });
  };

  return (
    <AlertDialog>
      <Button
        variant="destructive"
        className="rounded-xl"
        disabled={isPending}
        asChild
      >
        <AlertDialogTrigger>
          <Trash2 className="mr-2 size-4" />
          Delete
        </AlertDialogTrigger>
      </Button>

      <AlertDialogContent className="rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete this property?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This property will be
            permanently removed from your listings.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-xl">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isPending ? "Deleting..." : "Yes, delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}