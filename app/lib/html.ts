import parse from "html-react-parser";

export function parseHtmlToReact(html?: string | null) {
  if (!html) return "";
  return parse(html);
}
