import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  const body = await request.json();
  console.log("body", body);
  const { date, link, type, secret } = body;

  if (secret !== process.env.SECRET) {
    return new Response("invalid secret", { status: 403 });
  }

  await sql`INSERT INTO Links (date, link, type ) VALUES (${date}, ${link}, ${type} )`;
  return new Response("POST OK", { status: 200 });
}
