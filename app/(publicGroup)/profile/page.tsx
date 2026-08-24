import {
  CalendarDays,
  CheckCircle2,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { getUser } from "@/service/getUser";
import EditProfileDialog from "../_components/profile/EditProfileDialog";

const ProfilePage = async () => {
  const user = await getUser();
  console.log(user,'user Data........');
  
  const userData = user?.data;
  

  if (!userData) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Unable to load profile</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Please try again later.
          </p>
        </div>
      </main>
    );
  }

  const { name, email, phone, profileImage, role, status, createdAt } =
    userData;

  const initials = name
    ?.split(" ")
    .map((word: string) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const joinedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "N/A";

  return (
    <main className="min-h-screen bg-background">
      {/* =========================================
          Page Background
      ========================================= */}
      <div className="relative overflow-hidden border-b border-border/60 bg-muted/20">
        <div className="pointer-events-none absolute -left-32 -top-32 size-80 rounded-full bg-primary/10 blur-3xl" />

        <div className="pointer-events-none absolute -right-32 top-10 size-96 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
              <Sparkles className="size-3.5" />
              Account Overview
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Welcome back,{" "}
              <span className="text-primary">{name.split(" ")[0]}</span>
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Manage your RentNest profile and keep your account information up
              to date.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================
          Profile Content
      ========================================= */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
          {/* =====================================
              Profile Card
          ===================================== */}
          <Card className="relative overflow-hidden rounded-3xl border-border/60 shadow-sm">
            {/* Gradient Header */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent" />

            <CardContent className="relative p-6">
              <div className="flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="relative mt-5">
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl" />

                  <Avatar className="relative size-32 border-4 border-background shadow-xl sm:size-36">
                    {profileImage && (
                      <AvatarImage
                        src={profileImage}
                        alt={name}
                        className="object-cover"
                        sizes="144px"
                      />
                    )}

                    <AvatarFallback className="bg-primary/10 text-3xl font-bold text-primary">
                      {initials || <UserRound className="size-10" />}
                    </AvatarFallback>
                  </Avatar>

                  {status === "ACTIVE" && (
                    <span className="absolute bottom-2 right-2 flex size-6 items-center justify-center rounded-full border-4 border-background bg-emerald-500">
                      <span className="size-2 rounded-full bg-white" />
                    </span>
                  )}
                </div>

                {/* Name */}
                <h2 className="mt-5 text-2xl font-bold tracking-tight">
                  {name}
                </h2>

                <p className="mt-1 max-w-full truncate px-4 text-sm text-muted-foreground">
                  {email}
                </p>

                {/* Role + Status */}
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Badge
                    variant="secondary"
                    className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide"
                  >
                    {role}
                  </Badge>

                  <Badge
                    variant="outline"
                    className="rounded-full border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-[11px] font-semibold text-emerald-600"
                  >
                    <CheckCircle2 className="mr-1.5 size-3.5" />
                    {status}
                  </Badge>
                  <EditProfileDialog
                    user={{
                      name,
                      email,
                      phone,
                      profileImage,
                    }}
                  />
                </div>

                <Separator className="my-6" />

                {/* Member Since */}
                <div className="w-full rounded-2xl border border-border/60 bg-muted/30 p-4 text-left transition-colors hover:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-background shadow-sm">
                      <CalendarDays className="size-5 text-primary" />
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Member since
                      </p>

                      <p className="mt-0.5 text-sm font-semibold">
                        {joinedDate}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Account Status */}
                <div className="mt-3 flex w-full items-center gap-3 rounded-2xl border border-emerald-500/15 bg-emerald-500/5 p-4 text-left">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                    <ShieldCheck className="size-5 text-emerald-600" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Account status
                    </p>

                    <p className="mt-0.5 text-sm font-semibold text-emerald-600">
                      Your account is active
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* =====================================
              Right Content
          ===================================== */}
          <div className="space-y-6">
            {/* Personal Information */}
            <Card className="rounded-3xl border-border/60 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10">
                    <UserRound className="size-5 text-primary" />
                  </div>

                  <div>
                    <CardTitle className="text-lg">
                      Personal Information
                    </CardTitle>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Basic information associated with your account.
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <ProfileInfo
                    icon={<UserRound className="size-4" />}
                    label="Full Name"
                    value={name}
                  />

                  <ProfileInfo
                    icon={<Mail className="size-4" />}
                    label="Email Address"
                    value={email}
                  />

                  <ProfileInfo
                    icon={<Phone className="size-4" />}
                    label="Phone Number"
                    value={phone || "Not provided"}
                  />

                  <ProfileInfo
                    icon={<ShieldCheck className="size-4" />}
                    label="Account Role"
                    value={role}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact Section */}
            <Card className="rounded-3xl border-border/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Contact Details</CardTitle>

                <p className="text-sm text-muted-foreground">
                  Your primary contact information.
                </p>
              </CardHeader>

              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Email */}
                  <div className="group rounded-2xl border border-border/60 bg-muted/20 p-5 transition-all hover:border-primary/20 hover:bg-primary/[0.03]">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                        <Mail className="size-5 text-primary" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">Email</p>

                        <p className="mt-1 truncate text-sm font-semibold">
                          {email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="group rounded-2xl border border-border/60 bg-muted/20 p-5 transition-all hover:border-primary/20 hover:bg-primary/[0.03]">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                        <Phone className="size-5 text-primary" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">Phone</p>

                        <p className="mt-1 truncate text-sm font-semibold">
                          {phone || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security / Account Card */}
            <Card className="overflow-hidden rounded-3xl border-border/60 shadow-sm">
              <CardContent className="relative p-6">
                <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-primary/10 blur-3xl" />

                <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                      <ShieldCheck className="size-5 text-primary" />
                    </div>

                    <div>
                      <h3 className="font-semibold">Secure RentNest Account</h3>

                      <p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">
                        Your account information is protected and managed
                        securely through RentNest.
                      </p>
                    </div>
                  </div>

                  <Badge
                    variant="outline"
                    className="w-fit rounded-full border-primary/20 bg-primary/5 px-3 py-1 text-primary"
                  >
                    <CheckCircle2 className="mr-1.5 size-3.5" />
                    Verified
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;

type ProfileInfoProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function ProfileInfo({ icon, label, value }: ProfileInfoProps) {
  return (
    <div className="group rounded-2xl border border-border/60 bg-background p-5 transition-all duration-200 hover:border-primary/20 hover:bg-primary/[0.02] hover:shadow-sm">
      <div className="mb-3 flex items-center gap-2 text-muted-foreground">
        <span className="transition-colors group-hover:text-primary">
          {icon}
        </span>

        <span className="text-xs font-medium">{label}</span>
      </div>

      <p className="truncate text-sm font-semibold">{value}</p>
    </div>
  );
}
