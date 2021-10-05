import YAML from "js-yaml";
import fs from "fs";

const schemaObj = YAML.load(String(fs.readFileSync("schema.yaml")));
export default schemaObj;
