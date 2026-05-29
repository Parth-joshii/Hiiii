export async function saveInquiry(payload) {
  try {
    const apiBaseUrl = import.meta.env.VITE_INQUIRY_API_BASE_URL?.replace(/\/$/, "") || "";
    const response = await fetch(`${apiBaseUrl}/api/inquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify({
        ...payload,
        page: window.location.href,
      }),
    });

    if (!response.ok) {
      return { ok: false };
    }

    return response.json();
  } catch {
    return { ok: false };
  }
}
