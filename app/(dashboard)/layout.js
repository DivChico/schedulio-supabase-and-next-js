import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboradLayout({ children }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if (!user) {
  //   return redirect("/login");
  // }
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
