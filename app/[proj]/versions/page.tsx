import React from "react";
import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

async function getLinks(type: "jzql" | "lldh") {
  noStore();
  const { rows } = await sql<{
    date: string;
    link: string;
    type: "jzql" | "lldh";
  }>`select * From Links where type=${type} order by created_at desc`;
  console.log("rows", rows);
  return rows;
}
export default async function Versions({
  params,
}: {
  params: { proj: string };
}) {
  const { proj } = params;
  const rows = await getLinks(proj as "jzql" | "lldh");
  return (
    <div>
      <table className="table-fixed max-w-full">
        <thead className="text-gray-700 uppercase bg-gray-50">
          <tr>
            <th>date</th>
            <th>link</th>
            <th>type</th>
          </tr>
        </thead>
        <tbody>
          {rows?.map((link, index) => (
            <tr key={index} className="border-b">
              <td className="">{link.date}</td>
              <td className="px-2 py-2 break-all">
                <a className="underline text-blue-500 w-10" href={link.link}>
                  {link.link}
                </a>
              </td>
              <td>{link.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
