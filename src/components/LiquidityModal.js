import React, { useState } from "react";
import {
	Button,
	Typography,
	styled,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	DialogContentText,
} from "@mui/material";

const LiquidityModal = ({ isVisible, handleClose }) => {
	// const [open, setOpen] = useState(true);
	const [scroll, setScroll] = useState("body");

	return (
		<Dialog
			open={isVisible}
			onClose={handleClose}
			scroll={"body"}
			aria-labelledby="scroll-dialog-title"
			aria-describedby="scroll-dialog-description"
		>
			<DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
			<DialogContent dividers={scroll === "body"}>
				<DialogContentText
					id="scroll-dialog-description"
					// ref={descriptionElementRef}
					tabIndex={-1}
				>
					{[...new Array(50)]
						.map(
							() => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
						)
						.join("\n")}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleClose}>Subscribe</Button>
			</DialogActions>
		</Dialog>
	);
};

export default LiquidityModal;
