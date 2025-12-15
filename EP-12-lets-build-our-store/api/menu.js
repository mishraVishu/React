export default async function handler(req, res) {
  const { resId } = req.query;

  if (!resId) {
    return res.status(400).json({ error: "restaurantId is required" });
  }

  try {
    const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.5759&lng=77.3345&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`;

    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
      },
    });

    const json = await response.json();
    res.setHeader('Access-Control-Allow-Origin','*')
    return res.status(200).json(json);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch Swiggy API", details: err });
  }
}
