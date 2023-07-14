export function generateBaseImage(base64Img) {
  if (base64Img) {
    const base64Data = base64Img.replace(/^data:image\/\w+;base64,/, "");
    const contentType = base64Img.match(/^data:image\/\w+;base64,/);
    const buffer = Buffer.from(base64Data, "base64");
    const type = contentType?.[0];
    return { data: buffer, contentType: type };
  }
  return { data: "", contentType: "" };
}
