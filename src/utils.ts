import { Asset } from "./types";

export function sortAssetsAlphaNumerically(a: Asset, b: Asset) {
  const fileAName = a.data.name.toLocaleUpperCase();
  const fileBName = b.data.name.toLocaleUpperCase();
  return fileAName.localeCompare(fileBName, "en", { numeric: true });
}
