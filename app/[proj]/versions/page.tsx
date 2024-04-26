import React from "react";
import { sql } from "@vercel/postgres";

async function getLinks(type: "jzql" | "lldh") {
  const { rows } = await sql<{
    date: string;
    link: string;
    type: "jzql" | "lldh";
  }>`select * From Links where type=${type} order by created_at desc`;
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
      <table className="table-auto">
        <thead className="text-gray-700 uppercase bg-gray-50">
          <tr>
            <th>date</th>
            <th>link</th>
            <th>type</th>
          </tr>
        </thead>
        <tbody>
          {rows?.map((link, index) => (
            <tr key={index}>
              <td className="px-2">{link.date}</td>
              <td className="px-4">
                <a className="underline text-blue-500" href={link.link}>
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
