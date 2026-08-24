
"use client";

import { useState } from "react";

import {
  Camera,
  Loader2,
  Mail,
  Pencil,
  Phone,
  Save,
  UserRound,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Image from "next/image";
import { updateProfile } from "../../_action/updateProfile";

type EditProfileDialogProps = {
  user: {
    name: string;
    email: string;
    phone?: string | null;
    profileImage?: string | null;
  };
};

export default function EditProfileDialog({
  user,
}: EditProfileDialogProps) {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState(user.name || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [profileImage, setProfileImage] = useState(
    user.profileImage || "",
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("Name is required.");
      return;
    }

    try {
      setLoading(true);

      const result = await updateProfile({
        name: name.trim(),
        phone: phone.trim(),
        profileImage: profileImage.trim(),
      });

      if (!result.success) {
        setError(
          result.message || "Failed to update profile.",
        );

        return;
      }

      setOpen(false);

      // Refresh Server Component data
      window.location.reload();
    } catch (error) {
      console.error(error);

      setError(
        "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Edit Button */}

      <Button
        type="button"
        onClick={() => setOpen(true)}
        variant="outline"
        className="mt-5 w-full rounded-xl"
      >
        <Pencil className="mr-2 size-4" />
        Edit Profile
      </Button>

      {/* Modal */}

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={() => !loading && setOpen(false)}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-3xl border border-border/70 bg-background shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {/* Header */}

            <div className="relative overflow-hidden border-b border-border/60 bg-muted/20 px-6 py-5">
              <div className="pointer-events-none absolute -right-20 -top-20 size-40 rounded-full bg-primary/10 blur-3xl" />

              <div className="relative flex items-start justify-between">
                <div>
                  <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <UserRound className="size-5" />
                  </div>

                  <h2 className="text-xl font-bold tracking-tight">
                    Edit Profile
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Update your personal information.
                  </p>
                </div>

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setOpen(false)}
                  className="rounded-xl p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >
              {/* Profile Image */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Profile Image
                </label>

                <div className="flex items-center gap-4">
                  <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-muted">
                    {profileImage ? (
                      <Image
                        src={profileImage}
                        alt="Profile preview"
                        height={500}
                        width={500}
                        className="size-full object-cover"
                      />
                    ) : (
                      <Camera className="size-6 text-muted-foreground" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <Input
                      value={profileImage}
                      onChange={(event) =>
                        setProfileImage(
                          event.target.value,
                        )
                      }
                      placeholder="https://example.com/profile.jpg"
                      className="h-11 rounded-xl"
                    />

                    <p className="mt-1.5 text-xs text-muted-foreground">
                      Paste a public image URL.
                    </p>
                  </div>
                </div>
              </div>

              {/* Name */}

              <div>
                <label
                  htmlFor="profile-name"
                  className="mb-2 block text-sm font-medium"
                >
                  Full Name
                </label>

                <div className="relative">
                  <UserRound className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="profile-name"
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value)
                    }
                    placeholder="Enter your full name"
                    className="h-11 rounded-xl pl-10"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Email - readonly */}

              <div>
                <label
                  htmlFor="profile-email"
                  className="mb-2 block text-sm font-medium"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="profile-email"
                    value={user.email}
                    readOnly
                    disabled
                    className="h-11 rounded-xl bg-muted/50 pl-10"
                  />
                </div>

                <p className="mt-1.5 text-xs text-muted-foreground">
                  Email address cannot be changed here.
                </p>
              </div>

              {/* Phone */}

              <div>
                <label
                  htmlFor="profile-phone"
                  className="mb-2 block text-sm font-medium"
                >
                  Phone Number
                </label>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="profile-phone"
                    value={phone}
                    onChange={(event) =>
                      setPhone(event.target.value)
                    }
                    placeholder="Enter your phone number"
                    className="h-11 rounded-xl pl-10"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Error */}

              {error && (
                <div className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              {/* Actions */}

              <div className="flex flex-col-reverse gap-2 border-t border-border/60 pt-5 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  disabled={loading}
                  onClick={() => setOpen(false)}
                  className="rounded-xl"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 size-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}