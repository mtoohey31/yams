import fs from "fs";

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get() {
  return {
    body: fs.readdirSync("recipes").filter((entry) => /^.*\.yaml$/.test(entry)).map((entry) => entry.replace(/\.yaml$/, "")
    )
  };
}
