import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";

async function getLatestLink(type: "jzql" | "lldh") {
  const { rows } = await sql<{
    date: string;
    link: string;
    type: "jzql" | "lldh";
  }>`select * From Links where type=${type} order by created_at desc limit 1`;

  const { link } = rows[0];
  console.log("link", rows[0]);
  return redirect(link);
}
export default async function Page({ params }: { params: { proj: string } }) {
  const { proj } = params;
  await getLatestLink(proj as "jzql" | "lldh");
}
