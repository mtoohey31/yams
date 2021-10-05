import fs from "fs";
import path from "path";
import YAML from "js-yaml";
import Ajv from "ajv";
import schemaObj from "$lib/schema-obj"
import imageToBase64 from "image-to-base64";
import type { Recipe as SchemaType } from "$lib/schema-type";
const ajv = new Ajv();
const validate = ajv.compile(schemaObj);

export const prerender = true;

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params }) {
  const { slug } = params;

  const article = YAML.load(String(fs.readFileSync(`recipes/${slug}.yaml`))) as SchemaType;

  if (validate(article)) {
    if (article.image) {
      if (path.isAbsolute(article.image)) {
        article.image = await imageToBase64(`/${article.image}`);
      } else {
        article.image = "data:image/png;base64," + await imageToBase64(`recipes/${article.image}`);
      }
    }

    return {
      body: article
    };
  } else {
    return {
      code: 500,
      body: {
        errors: validate.errors
      }
    };
  }
}
