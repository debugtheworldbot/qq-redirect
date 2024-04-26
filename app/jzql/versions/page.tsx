import React from "react";
import { sql } from "@vercel/postgres";

export default async function Versions() {
  const { rows } = await sql<{
    date: string;
    link: string;
  }>`select * From Links`;
  return (
    <div>
      <table className="table-auto">
        <thead className="text-gray-700 uppercase bg-gray-50">
          <tr>
            <th>date</th>
            <th>link</th>
          </tr>
        </thead>
        <tbody>
          {rows?.map((link) => (
            <tr key={link.link}>
              <td className="px-2">{link.date}</td>
              <td>
                <a className="underline text-blue-500" href={link.link}>
                  {link.link}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
