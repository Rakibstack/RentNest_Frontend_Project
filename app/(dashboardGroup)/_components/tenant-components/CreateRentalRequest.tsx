
"use client";

import { useState, useTransition } from "react";
import { CalendarDays, Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createRentalRequest } from "../../_action/tenant_action/createRentalRequest";


export default function CreateRentalRequest({
  propertyId,
}: {propertyId : string}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [moveInDate, setMoveInDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!moveInDate) {
      toast.error("Please select your move-in date");
      return;
    }

    startTransition(async () => {
      const result = await createRentalRequest({
        propertyId,
        moveInDate,
        message: message.trim() || undefined,
      });

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success("Rental request sent successfully");

      setMoveInDate("");
      setMessage("");
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-xl px-6">
          <Send className="mr-2 size-4" />
          Request to Rent
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-2xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Request this property
          </DialogTitle>

          <DialogDescription>
            Send a rental request to the landlord. You can include
            your preferred move-in date and a short message.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Move In Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Preferred Move-in Date
            </label>

            <div className="relative">
              <CalendarDays className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                type="date"
                value={moveInDate}
                onChange={(e) => setMoveInDate(e.target.value)}
                className="pl-9"
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                Message
              </label>

              <span className="text-xs text-muted-foreground">
                {message.length}/255
              </span>
            </div>

            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a short message to the landlord..."
              maxLength={255}
              rows={4}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="rounded-xl"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="rounded-xl"
              disabled={isPending}
            >
              {isPending ? "Sending..." : "Send Request"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}