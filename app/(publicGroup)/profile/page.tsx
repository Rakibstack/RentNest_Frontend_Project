import {
  CalendarDays,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getUser } from "@/service/getUser";


const ProfilePage = async () => {
  const user = await getUser();

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

  const {
    name,
    email,
    phone,
    profileImage,
    role,
    status,
    createdAt,
  } = userData;

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
    <main className="min-h-screen bg-muted/20">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-primary">
            Account
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Your Profile
          </h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            Manage your personal information and account details.
          </p>
        </div>

        {/* Main Profile */}
        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          {/* Left Profile Card */}
          <Card className="overflow-hidden rounded-3xl border-border/60 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="relative">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Avatar className="size-36 border-4 border-background shadow-xl">
                      {profileImage && (
                        <AvatarImage
                          src={profileImage}
                          alt={name}
                          className="object-cover"
                        />
                      )}

                      <AvatarFallback className="bg-primary/10 text-3xl font-bold text-primary">
                        {initials || <UserRound className="size-10" />}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  {/* Online status */}
                  {status === "ACTIVE" && (
                    <span className="absolute bottom-3 right-3 size-5 rounded-full border-4 border-background bg-emerald-500" />
                  )}
                </div>

                {/* Name */}
                <h2 className="mt-5 text-2xl font-bold tracking-tight">
                  {name}
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  {email}
                </p>

                {/* Role */}
                <div className="mt-4 flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                  >
                    {role}
                  </Badge>

                  <Badge
                    variant="outline"
                    className="rounded-full px-3 py-1 text-xs"
                  >
                    <CheckCircle2 className="mr-1 size-3.5 text-emerald-500" />
                    {status}
                  </Badge>
                </div>

                <Separator className="my-6" />

                {/* Member Since */}
                <div className="flex w-full items-center gap-3 rounded-2xl bg-muted/50 p-4 text-left">
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
            </CardContent>
          </Card>

          {/* Right Content */}
          <div className="space-y-6">
            {/* Personal Information */}
            <Card className="rounded-3xl border-border/60 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                    <UserRound className="size-5 text-primary" />
                  </div>

                  <div>
                    <CardTitle className="text-lg">
                      Personal Information
                    </CardTitle>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Your basic account information.
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Name */}
                  <ProfileInfo
                    icon={<UserRound className="size-4" />}
                    label="Full Name"
                    value={name}
                  />

                  {/* Email */}
                  <ProfileInfo
                    icon={<Mail className="size-4" />}
                    label="Email Address"
                    value={email}
                  />

                  {/* Phone */}
                  <ProfileInfo
                    icon={<Phone className="size-4" />}
                    label="Phone Number"
                    value={phone || "Not provided"}
                  />

                  {/* Role */}
                  <ProfileInfo
                    icon={<ShieldCheck className="size-4" />}
                    label="Account Role"
                    value={role}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Account Status */}
            <Card className="rounded-3xl border-border/60 shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                      <ShieldCheck className="size-5 text-emerald-600" />
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        Account Status
                      </h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Your RentNest account is currently active.
                      </p>
                    </div>
                  </div>

                  <Badge className="w-fit rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-600 hover:bg-emerald-500/10">
                    <CheckCircle2 className="mr-1.5 size-3.5" />
                    {status}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="rounded-3xl border-border/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">
                  Contact Information
                </CardTitle>

                <p className="text-sm text-muted-foreground">
                  Information connected to your RentNest account.
                </p>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 rounded-2xl border border-border/60 p-4">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
                      <Mail className="size-5 text-muted-foreground" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">
                        Email
                      </p>

                      <p className="truncate text-sm font-medium">
                        {email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-2xl border border-border/60 p-4">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
                      <Phone className="size-5 text-muted-foreground" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">
                        Phone
                      </p>

                      <p className="truncate text-sm font-medium">
                        {phone || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;

/* ---------------------------------------------
   Reusable Profile Info
--------------------------------------------- */

type ProfileInfoProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function ProfileInfo({
  icon,
  label,
  value,
}: ProfileInfoProps) {
  return (
    <div className="rounded-2xl border border-border/60 bg-background p-4 transition-colors hover:bg-muted/30">
      <div className="mb-3 flex items-center gap-2 text-muted-foreground">
        {icon}

        <span className="text-xs font-medium">
          {label}
        </span>
      </div>

      <p className="truncate text-sm font-semibold">
        {value}
      </p>
    </div>
  );
}