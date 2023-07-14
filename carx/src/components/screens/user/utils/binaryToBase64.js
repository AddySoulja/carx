export const convertByteArrayToBase64 = (data) => {
  const uint8Array = new Uint8Array(data);
  let binary = "";
  for (let i = 0; i < uint8Array.length; i++) {
    binary += String.fromCharCode(uint8Array[i]);
  }
  const base64String = btoa(binary);
  return base64String;
};
