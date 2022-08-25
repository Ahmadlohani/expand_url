const scrapeIt = require("scrape-it");
async function handler(req, res) {
	const { method } = req;
	switch (method) {
		case "POST":
			try {
				const { longurl } = req.body;
				const product = await scrapeIt(longurl, {
					title: {
						selector: "#productTitle",
					},
				});
				const title = product.data;
				return res.json(title);
			} catch (err) {
				return res.json({
					error: err,
				});
			}
			break;
		default:
			return res
				.status(400)
				.json({ error: "Only GET, POST, DELETE, PUT" });
			break;
	}
}
export default handler;
