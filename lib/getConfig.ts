import config from "../config";
import defaultConfig from "@/config/default";

const getConfig: any = (path: string) => {
  let currentConfig: any = config,
    currentDefaultConfig: any = defaultConfig;
  path.split(".").forEach((value) => {
    currentConfig = currentConfig[value] ?? currentDefaultConfig[value];
    currentDefaultConfig = currentDefaultConfig[value];
    if (currentDefaultConfig === undefined) {
      throw TypeError(`No config found with path ${path} .`);
    }
  });
  return currentConfig;
};

export default getConfig;
