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
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

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
			style={styles.dialogStyle}
		>
			<DialogTitle id="scroll-dialog-title">
				<div style={styles.divTopHeading}>
					<Typography style={styles.heading} variant="h6">
						Add Liquidity
					</Typography>
					<Typography variant="caption">
						Add liquidity to the ETH/PHNX pool <br /> and receive LP tokens
					</Typography>
				</div>
				<IconButton
					aria-label="close"
					onClick={handleClose}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<div style={styles.dialogStyle}>
				<DialogContent dividers={scroll === "body"}>
					<div style={styles.containerTip}>
						<Typography style={styles.txtTipParagraph}>
							Tip: By adding liquidity, you'll earn 0.25% of all trades on this
							pair proportional to your share of the pool. Fees are added to the
							pool, accrue in real time and can be claimed by withdrawing your
							liquidity.
						</Typography>
					</div>
					<DialogContentText
						id="scroll-dialog-description"
						// ref={descriptionElementRef}
						tabIndex={-1}
					>
						Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
						dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
						ac consectetur ac, vestibulum at eros. Praesent commodo cursus
						magna, vel scelerisque nisl consectetur et
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						fullWidth={true}
						style={styles.btnAddLiquidity}
						onClick={handleClose}
					>
						Add Liquidity
					</Button>
				</DialogActions>
			</div>
		</Dialog>
	);
};

export default LiquidityModal;

const styles = {
	heading: {
		color: "#413AE2",
	},
	dialogStyle: {
		padding: "10px 30px 30px 30px",
	},
	divTopHeading: {
		display: "flex",
		flexDirection: "column",
	},
	containerTip: {
		display: "flex",
		padding: "15px 10px 15px 15px",
		background:
			"linear-gradient(90deg, rgba(56, 16, 255, 0.55) 0%, rgba(255, 0, 245, 0.55) 143.12%)",
		borderRadius: 15,
		// margin: "0px 30px 0px 30px",
	},
	txtTipParagraph: {
		// fontWeight: "bold",
		fontSize: 12,
		lineHeight: "150%",
		color: "#FFFFFF",
	},
	btnAddLiquidity: {
		backgroundColor: "#413AE2",
		color: "#fff",
		margin: "10px 0px 0px 0px",
	},
};
