export default function getTextColor(backgroundColor: string) {
  const r = parseInt(backgroundColor.substring(0, 2), 16);
  const g = parseInt(backgroundColor.substring(2, 4), 16);
  const b = parseInt(backgroundColor.substring(4, 6), 16);

  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return luminance > 127.5 ? "black" : "white";
}
