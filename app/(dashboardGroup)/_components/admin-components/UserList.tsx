"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Ban,
  CheckCircle2,
  Loader2,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";

import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { updateUserStatus } from "../../_action/admin_action/updateUserStatus";

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  profileImage?: string | null;
  role: string;
  status: string;
  createdAt: string;
};

type UserListProps = {
  users: User[];
};

export default function UserList({
  users,
}: UserListProps) {
  const router = useRouter();

  const [loadingUserId, setLoadingUserId] = useState<string | null>(
    null
  );

  // =========================================
  // Handle User Status
  // =========================================

  const handleUserStatus = async (
    userId: string,
    status: "ACTIVE" | "BLOCKED"
  ) => {
    try {
      setLoadingUserId(userId);

      const result = await updateUserStatus(
        userId,
        status
      );

      if (result.success) {
        toast.success(
          result.message || "User status updated successfully"
        );

        router.refresh();
      } else {
        toast.error(
          result.message || "Failed to update user status"
        );
      }
    } catch (error) {
      console.error(
        "Update user status error:",
        error
      );

      toast.error(
        "Something went wrong while updating user status"
      );
    } finally {
      setLoadingUserId(null);
    }
  };

  // =========================================
  // Empty State
  // =========================================

  if (!users || users.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-border p-12 text-center">
        <UserRound className="mx-auto size-10 text-muted-foreground" />

        <h3 className="mt-4 text-lg font-semibold">
          No users found
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          There are no users available.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-border/60 bg-background shadow-sm">
      {/* =========================================
          Header
      ========================================= */}

      <div className="border-b border-border/60 p-5">
        <h2 className="text-lg font-semibold">
          All Users
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage registered users.
        </p>
      </div>

      {/* =========================================
          Desktop Table
      ========================================= */}

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="px-5 py-4 text-left text-xs font-semibold text-muted-foreground">
                User
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold text-muted-foreground">
                Phone
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold text-muted-foreground">
                Role
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold text-muted-foreground">
                Status
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold text-muted-foreground">
                Joined
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold text-muted-foreground">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => {
              const isBanned =
                user.status === "BLOCKED";

              const isLoading =
                loadingUserId === user.id;

              const initials = user.name
                ?.split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              return (
                <tr
                  key={user.id}
                  className="border-b border-border/50 last:border-0 transition-colors hover:bg-muted/20"
                >
                  {/* =================================
                      User
                  ================================= */}

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}

                      <div className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary/10 font-semibold text-primary">
                        {user.profileImage ? (
                          <Image
                            src={user.profileImage}
                            alt={user.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        ) : (
                          initials || (
                            <UserRound className="size-4" />
                          )
                        )}
                      </div>

                      {/* Name + Email */}

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {user.name}
                        </p>

                        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                          <Mail className="size-3" />

                          <span className="truncate">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* =================================
                      Phone
                  ================================= */}

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="size-4" />

                      {user.phone || "Not provided"}
                    </div>
                  </td>

                  {/* =================================
                      Role
                  ================================= */}

                  <td className="px-5 py-4">
                    <Badge
                      variant="secondary"
                      className="rounded-full"
                    >
                      {user.role}
                    </Badge>
                  </td>

                  {/* =================================
                      Status
                  ================================= */}

                  <td className="px-5 py-4">
                    <Badge
                      variant="outline"
                      className={
                        isBanned
                          ? "rounded-full border-red-500/20 bg-red-500/10 text-red-600"
                          : "rounded-full border-emerald-500/20 bg-emerald-500/10 text-emerald-600"
                      }
                    >
                      {isBanned ? (
                        <Ban className="mr-1 size-3" />
                      ) : (
                        <CheckCircle2 className="mr-1 size-3" />
                      )}

                      {user.status}
                    </Badge>
                  </td>

                  {/* =================================
                      Joined
                  ================================= */}

                  <td className="px-5 py-4 text-sm text-muted-foreground">
                    {new Date(
                      user.createdAt
                    ).toLocaleDateString(
                      "en-US",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </td>

                  {/* =================================
                      Action
                  ================================= */}

                  <td className="px-5 py-4 text-right">
                    {isBanned ? (
                      <Button
                        size="sm"
                        disabled={isLoading}
                        onClick={() =>
                          handleUserStatus(
                            user.id,
                            "ACTIVE"
                          )
                        }
                        variant="default"
                        className="rounded-xl"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 size-4 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="mr-2 size-4" />
                            Unban
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        disabled={isLoading}
                        onClick={() =>
                          handleUserStatus(
                            user.id,
                            "BLOCKED"
                          )
                        }
                        variant="destructive"
                        className="rounded-xl"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 size-4 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          <>
                            <Ban className="mr-2 size-4" />
                            Ban
                          </>
                        )}
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* =========================================
          Mobile
      ========================================= */}

      <div className="divide-y md:hidden">
        {users.map((user) => {
          const isBanned =
            user.status === "BLOCKED";

          const isLoading =
            loadingUserId === user.id;

          return (
            <div
              key={user.id}
              className="p-5"
            >
              {/* User Header */}

              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <UserRound className="size-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">
                    {user.name}
                  </p>

                  <p className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </p>
                </div>

                <Badge
                  variant="outline"
                  className={
                    isBanned
                      ? "border-red-500/20 bg-red-500/10 text-red-600"
                      : "border-emerald-500/20 bg-emerald-500/10 text-emerald-600"
                  }
                >
                  {user.status}
                </Badge>
              </div>

              {/* User Info */}

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-muted/40 p-3">
                  <p className="text-xs text-muted-foreground">
                    Role
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {user.role}
                  </p>
                </div>

                <div className="rounded-xl bg-muted/40 p-3">
                  <p className="text-xs text-muted-foreground">
                    Phone
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {user.phone || "N/A"}
                  </p>
                </div>
              </div>

              {/* Action */}

              {isBanned ? (
                <Button
                  className="mt-4 w-full rounded-xl"
                  disabled={isLoading}
                  variant="default"
                  onClick={() =>
                    handleUserStatus(
                      user.id,
                      "ACTIVE"
                    )
                  }
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 size-4" />
                      Unban User
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  className="mt-4 w-full rounded-xl"
                  disabled={isLoading}
                  variant="destructive"
                  onClick={() =>
                    handleUserStatus(
                      user.id,
                      "BLOCKED"
                    )
                  }
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Ban className="mr-2 size-4" />
                      Ban User
                    </>
                  )}
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}