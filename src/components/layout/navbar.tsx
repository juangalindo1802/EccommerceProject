import { isSupabaseConfigured } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";

import { NavbarClient } from "./navbar-client";

export async function Navbar() {
  if (!isSupabaseConfigured()) return <NavbarClient />;

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  let isAdmin = false;
  if (data.user) {
    try {
      const dbUser = await prisma.user.findUnique({
        where: { id: data.user.id },
        select: { isAdmin: true },
      });
      isAdmin = Boolean(dbUser?.isAdmin);
    } catch {
      isAdmin = false;
    }
  }

  return <NavbarClient userEmail={data.user?.email} isAdmin={isAdmin} />;
}
