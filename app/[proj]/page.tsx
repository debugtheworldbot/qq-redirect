import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function getLatestLink(type: "jzql" | "lldh") {
  noStore();
  const { rows } = await sql<{
    date: string;
    link: string;
    type: "jzql" | "lldh";
  }>`select * From Links where type=${type} order by created_at desc limit 1`;

  if (rows.length === 0) {
    redirect("/");
  }
  const { link } = rows[0];
  return redirect(link);
}
export default async function Page({ params }: { params: { proj: string } }) {
  const { proj } = params;
  await getLatestLink(proj as "jzql" | "lldh");
}
