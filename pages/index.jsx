import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
	const [shorturl, setShorturl] = useState("");
	const [longurl, setLongurl] = useState("");
	const [asin, setAsin] = useState("");
	const [loading, setLoading] = useState(false);
	const [title, setTitle] = useState("");

	useEffect(() => {
		if (longurl != "") {
			var url = longurl;
			var regex = RegExp("(?:[/dp/]|$)([A-Z0-9]{10})");
			var m = url.match(regex);
			if (m) {
				setAsin(m[1]);
			}
			axios
				.post(
					`${process.env.NEXT_PUBLIC_API}/get-product-data`,
					{ longurl }
				)
				.then(({ data }) => {
					setTitle(data.title);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [longurl]);

	const handleSubmit = async () => {
		setLoading(true);
		try {
			const { data } = await axios.post(
				`${process.env.NEXT_PUBLIC_API}/longurl`,
				{ shorturl }
			);
			if (data.error) {
				alert(data.error);
				setLoading(false);
			} else {
				setLongurl(data.longurl);
				setLoading(false);
			}
		} catch (error) {
			console.log("Getting long url exception");
			setLoading(false);
		}
	};
	return (
		<div>
			<h1 style={{ textAlign: "center" }}>
				Expand Short Urls
			</h1>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
				}}
			>
				<div className="search">
					<input
						type="text"
						className="searchTerm"
						placeholder="Paste Short Urls Here"
						value={shorturl}
						onChange={(e) => setShorturl(e.target.value)}
					/>
					<button
						onClick={handleSubmit}
						className="searchButton"
					>
						{loading ? "Processing..." : "Expand"}
					</button>
				</div>
			</div>
			{longurl != "" && (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
					}}
				>
					<h5
						style={{
							textAlign: "center",
							width: "50%",
							border: "2px solid green",
							wordWrap: "break-word",
							padding: "20px",
						}}
					>
						{longurl}
					</h5>
				</div>
			)}
			{asin != "" && (
				<>
					<h4
						style={{
							textAlign: "center",
						}}
					>
						ASIN:
					</h4>
					<h4
						style={{
							textAlign: "center",
						}}
					>
						{asin}
					</h4>
				</>
			)}
			{title != "" && (
				<>
					<h4
						style={{
							textAlign: "center",
						}}
					>
						Title:
					</h4>
					<h4
						style={{
							textAlign: "center",
						}}
					>
						{title}
					</h4>
				</>
			)}
		</div>
	);
}
