import { fromByteArray, toByteArray } from "base64-js";

export type Secret = {
  keyBase64String: string;
  counterBase64String: string;
};

const buildAesCtrParams = (counter: Uint8Array): AesCtrParams => ({
  name: "AES-CTR",
  counter,
  length: 128,
});

const buildKey = (key: Uint8Array): Promise<CryptoKey> =>
  crypto.subtle.importKey("raw", key.buffer, "AES-CTR", false, [
    "encrypt",
    "decrypt",
  ]);

export const createSecret = async (): Promise<Secret> => {
  const key = crypto.getRandomValues(new Uint8Array(16));
  const counter = crypto.getRandomValues(new Uint8Array(16));
  return {
    keyBase64String: fromByteArray(key),
    counterBase64String: fromByteArray(counter),
  };
};

export const encrypt = async (
  data: string | undefined,
  secret: Secret | undefined
): Promise<string | undefined> => {
  if (data == null) return;
  if (secret == null) return data;

  const key = toByteArray(secret.keyBase64String);
  const counter = toByteArray(secret.counterBase64String);

  const encryptedData = (await crypto.subtle.encrypt(
    buildAesCtrParams(counter),
    await buildKey(key),
    new TextEncoder().encode(data)
  )) as ArrayBuffer;

  return fromByteArray(new Uint8Array(encryptedData));
};

export const decrypt = async (
  data: string,
  secret: Secret
): Promise<string | undefined> => {
  if (data == null) return;
  if (secret == null) return data;

  const key = toByteArray(secret.keyBase64String);
  const counter = toByteArray(secret.counterBase64String);

  const decodedData = new TextDecoder().decode(
    await crypto.subtle.decrypt(
      buildAesCtrParams(counter),
      await buildKey(key),
      toByteArray(data)
    )
  );

  return decodedData;
};
