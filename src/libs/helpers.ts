export function validateEventUrl(url: string): {
  success: boolean;
  error?: string;
  id?: string;
} {
  try {
    const regex =
      /^https:\/\/client-event-registeration-portal-[\w-]+\.vercel\.app\/([A-Za-z0-9+/=]+)$/;

    const match = url.match(regex);
    if (!match) {
      throw new Error("URL does not match the expected pattern.");
    }

    const encodedId = match[1];

    // Decode using base64
    let decodedId;
    try {
      decodedId = atob(encodedId);
    } catch {
      throw new Error("Failed to decode the token using base64.");
    }

    // Validate decodedId as a 24-character hex string
    const hexRegex = /^[a-fA-F0-9]{24}$/;
    if (!hexRegex.test(decodedId)) {
      throw new Error(
        "Decoded token is not a valid 24-character hexadecimal ID."
      );
    }

    return { success: true, id: encodedId };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
