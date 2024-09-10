import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/account");
  }
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
