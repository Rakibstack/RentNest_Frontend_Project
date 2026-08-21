// "use client";
// import {
//   Bell,
//   ChevronDown,
//   ClipboardList,
//   Heart,
//   LayoutDashboard,
//   LogOut,
//   Settings,
//   User,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";

// import { Button } from "@/components/ui/button";
// import { navberProps } from "./navber";


// const accountItems = [
//   {
//     label: "Dashboard",
//     href: "/dashboard",
//     icon: LayoutDashboard,
//     roles: ["TENANT"],
//   },
//   {
//     label: "My Rental Requests",
//     href: "/dashboard/tenant/requests",
//     icon: ClipboardList,
//     roles: ["TENANT"],
//   },
//   {
//     label: "Saved Properties",
//     href: "/favorites",
//     icon: Heart,
//     roles: ["TENANT"],
//   },
//   {
//     label: "Profile",
//     href: "/profile",
//     icon: User,
//   },
//   {
//     label: "Settings",
//     href: "/settings",
//     icon: Settings,
//   },
// ];

// export default function UserMenu({ user }: navberProps) {
//   const [open, setOpen] = useState(false);

//   const menuRef = useRef<HTMLDivElement>(null);

//   const userData = user?.data;

//   const userName = userData?.name || "User";
//   const userEmail = userData?.email || "";
//   const profileImage = userData?.profileImage || '';
//   const userRole = userData?.role;

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         menuRef.current &&
//         !menuRef.current.contains(event.target as Node)
//       ) {
//         setOpen(false);
//       }
//     };

//     const handleEscape = (event: KeyboardEvent) => {
//       if (event.key === "Escape") {
//         setOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     document.addEventListener("keydown", handleEscape);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, []);

//   // -----------------------------------------
//   // Role-based menu items
//   // -----------------------------------------

//   const visibleMenuItems = accountItems.filter((item) => {
//     if (!item.roles) return true;

//     return userRole ? item.roles.includes(userRole) : false;
//   });

//   return (
//     <div ref={menuRef} className="relative">
//       {/* ======================================
//           User Menu Trigger
//       ====================================== */}

//       <Button
//         type="button"
//         variant="ghost"
//         onClick={() => setOpen((prev) => !prev)}
//         aria-expanded={open}
//         aria-haspopup="menu"
//         aria-label="Open user menu"
//         className="
//           group
//           h-11
//           gap-2
//           rounded-full
//           border
//           border-border/70
//           bg-background
//           px-2
//           pr-3
//           shadow-sm
//           transition-all
//           duration-200
//           hover:bg-muted
//         "
//       >
//         {/* Avatar */}

//         <div className="relative size-8 overflow-hidden rounded-full bg-primary/10">
//           {profileImage ? (
//             <Image
//               src={profileImage}
//               alt={`${userName}'s profile`}
//               fill
//               sizes="32px"
//               className="object-cover"
//             />
//           ) : (
//             <div className="flex size-full items-center justify-center">
//               <User className="size-4 text-muted-foreground" />
//             </div>
//           )}
//         </div>

//         {/* Chevron */}

//         <ChevronDown
//           className={`
//             size-4
//             text-muted-foreground
//             transition-transform
//             duration-200
//             ${open ? "rotate-180" : ""}
//           `}
//         />
//       </Button>

//       {/* ======================================
//           Dropdown Menu
//       ====================================== */}

//       <div
//         className={`
//           absolute
//           right-0
//           top-[calc(100%+0.75rem)]
//           z-50
//           w-64
//           origin-top-right
//           transition-all
//           duration-200
//           ease-out
//           ${
//             open
//               ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
//               : "pointer-events-none -translate-y-2 scale-95 opacity-0"
//           }
//         `}
//       >
//         <div
//           className="
//             overflow-hidden
//             rounded-2xl
//             border
//             border-border/70
//             bg-background
//             p-2
//             shadow-xl
//             shadow-black/5
//           "
//         >
//           {/* ==================================
//               User Information
//           ================================== */}

//           <div className="mb-1 flex items-center gap-3 rounded-xl px-3 py-3">
//             {/* Large Avatar */}

//             <div className="relative size-10 shrink-0 overflow-hidden rounded-full bg-primary/10">
//               {profileImage ? (
//                 <Image
//                   src={profileImage}
//                   alt={`${userName}'s profile`}
//                   fill
//                   sizes="40px"
//                   className="object-cover"
//                 />
//               ) : (
//                 <div className="flex size-full items-center justify-center">
//                   <User className="size-5 text-muted-foreground" />
//                 </div>
//               )}
//             </div>

//             {/* User Details */}

//             <div className="min-w-0 flex-1">
//               <p className="truncate text-sm font-semibold">
//                 {userName}
//               </p>

//               <p className="truncate text-xs text-muted-foreground">
//                 {userEmail}
//               </p>

//               {userRole && (
//                 <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">
//                   {userRole}
//                 </p>
//               )}
//             </div>
//           </div>

//           <div className="my-1 h-px bg-border" />

//           {/* ==================================
//               Account Menu
//           ================================== */}

//           <div className="space-y-1">
//             {visibleMenuItems.map((item) => {
//               const Icon = item.icon;

//               return (
//                 <Link
//                   key={item.href}
//                   href={item.href}
//                   onClick={() => setOpen(false)}
//                   className="
//                     flex
//                     items-center
//                     gap-3
//                     rounded-xl
//                     px-3
//                     py-2.5
//                     text-sm
//                     font-medium
//                     text-muted-foreground
//                     transition-all
//                     duration-150
//                     hover:bg-muted
//                     hover:text-foreground
//                   "
//                 >
//                   <Icon className="size-4 shrink-0" />

//                   <span>{item.label}</span>
//                 </Link>
//               );
//             })}
//           </div>

//           <div className="my-1 h-px bg-border" />

//           {/* ==================================
//               Notifications
//           ================================== */}

//           <Link
//             href="/notifications"
//             onClick={() => setOpen(false)}
//             className="
//               flex
//               items-center
//               gap-3
//               rounded-xl
//               px-3
//               py-2.5
//               text-sm
//               font-medium
//               text-muted-foreground
//               transition-all
//               duration-150
//               hover:bg-muted
//               hover:text-foreground
//             "
//           >
//             <Bell className="size-4 shrink-0" />

//             <span>Notifications</span>
//           </Link>

//           <div className="my-1 h-px bg-border" />

//           {/* ==================================
//               Logout
//           ================================== */}

//           <button
//             type="button"
//             onClick={() => {
//               setOpen(false);

//               // TODO:
//               // logoutAction();
//             }}
//             className="
//               flex
//               w-full
//               items-center
//               gap-3
//               rounded-xl
//               px-3
//               py-2.5
//               text-sm
//               font-medium
//               text-destructive
//               transition-colors
//               hover:bg-destructive/10
//             "
//           >
//             <LogOut className="size-4 shrink-0" />

//             <span>Logout</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }