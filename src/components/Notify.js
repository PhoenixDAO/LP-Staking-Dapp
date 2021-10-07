import React from "react";
// import { explorerWithTX } from "../config/const";
import { Link } from "react-router-dom";

function Notify({ text, icon, error, link, color, createdEvent, url, hash }) {
	let titleURL = "";
	if (createdEvent) {
		let rawTitle = createdEvent.name;
		var titleRemovedSpaces = rawTitle;
		titleRemovedSpaces = titleRemovedSpaces.replace(/ /g, "-");

		var pagetitle = titleRemovedSpaces
			.toLowerCase()
			.split(" ")
			.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
			.join(" ");
		titleURL = "/event-stat/" + pagetitle + "/" + createdEvent.eventId;
	}
	if (true) {
		return (
			<div className="notify2">
				<div>
					<i
						className="fas fa-exclamation-circle fa-3x"
						style={{ color: "#F43C3C" }}
					></i>
				</div>
				<div>
					Transaction{" "}
					{error && error.code == 4001 ? "Rejected" : "failed"} {". "}😥Try
					again later.
				</div>
			</div>
		);
	} else {
		return (
			<div className="notify2">
				<div>
					<i className={icon} style={{ color: color }}></i>
				</div>
				{/* <a href={explorerWithTX + hash} title={hash} target="blank">
					<div style={{ whiteSpace: "break-spaces", justifyContent: "center", alignItems: "center" }}>{text}</div>
				</a> */}
				{url ?
					<Link to={url ? url : titleURL}>
						<p> {link}</p>
					</Link> : null
				}

			</div>
		);
	}
}

export default Notify;
