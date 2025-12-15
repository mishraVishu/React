export const config = {
  runtime: "nodejs", // ✅ CRITICAL
};

export default async function handler(req, res) {
  try {
    const { resId } = req.query;

    if (!resId) {
      return res.status(400).json({ error: "Missing resId parameter" });
    }

    const swiggyURL = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.57590&lng=77.33450&restaurantId=${resId}`;

    const response = await fetch(swiggyURL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        Accept: "application/json",
      },
    });

    const text = await response.text();

    // Swiggy block detection
    if (!text || text.startsWith("<")) {
      return res.status(403).json({
        error: "Blocked by Swiggy",
        raw: text.slice(0, 200),
      });
    }

    const data = JSON.parse(text);

    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: "Server error",
      message: error.message,
    });
  }
}
