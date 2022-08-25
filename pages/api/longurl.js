var request = require("request");
async function handler(req, res) {
	const { method } = req;
	switch (method) {
		case "POST":
			try {
				const { shorturl } = req.body;
				const uri = shorturl;
				request(
					{
						uri: uri,
						followRedirect: false,
					},
					function (err, httpResponse) {
						if (err) {
							return res.json({
								error: err,
							});
						}
						return res.json({
							longurl: httpResponse.headers.location || uri,
						});
					}
				);
			} catch (error) {
				return res.json({
					error,
				});
			}
			break;
		default:
			return res.status(400).json({ success: false });
			break;
	}
}
export default handler;
