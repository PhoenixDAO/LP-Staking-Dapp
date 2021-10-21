import React, { useRef, useState, useEffect } from "react";
// import Header from "./common/Header";
import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	termsHeader: {
		display: "flex",
		justifyContent: "space-between",
		paddingTop: "40px",
		alignItems: "center",
	},
	sticky: {
		position: "sticky",
		zIndex: 1,
		top: 0,

		background: `#FCFCFD !important`,
		opacity: `1 !important`,
		paddingBottom: "10px",
	},
	menu: {
		padding: "10px",
	},
	menuMainHeading: {
		color: "#413AE2",
		fontSize: "24px",
		fontWeight: "600",
		marginBottom: "24px",
		marginTop:"0px",
	},
	menuHeading: {
		fontSize: "20px",
		fontWeight: "600",
		marginTop: "0px",
		marginBottom: "20px",
		"@media (min-width:950px)":{
			fontSize:"18px",
		},
	},
	menuSubHeading: {
		fontSize: "17px",
		color: "#4E4E55",
		margin:"0px"
	},
	hideScroll: {
		"&::-webkit-scrollbar": {
			// display: "none",
		},
		overflowY: "scroll",
		padding: "20px",
		
	},
	leftColumn:{
		"@media (min-width: 950px)":{
			marginRight: "15px",
			marginLeft: "-15px",
		}	
	},
	leftColumnPaper:{
		height: "89%", 
		"@media (max-width: 900px)":{
			marginTop:"30px",
		},
		position: "sticky", 
		top:"0px",
	},
	sideMenuHeading:{
		fontSize:"1.5rem",
	},
	sideSubMenuHeading:{
		fontSize:"1.3rem",
	},
	hideScroll1: {
		"@media (min-width:1200px)": {
			maxWidth: "65.66667% !important",
			flexBasis: "65.66667% !important",
		},
	},
	hideScroll2: {
		"@media (min-width:1200px)": {
			marginLeft: "1%",
		},
	},
	definition:{
		textAlign:"justify",
		lineHeight:"1.6rem",
		fontSize:"15px"
	},
	gridContainer: {
		marginTop: "20px",
	},
	termsPage:{
		paddingInline:"10px",
	}
}));
const Terms = (props) => {
	const classes = useStyles();
	const pageRefs = useRef({});
	const [prevPath, setPrevPath] = useState(-1);

	// useEffect(() => {
	// 	if (prevPath == -1) {
	// 		props.executeScroll();
	// 	}
	// }, []);
	function scrollIntoView(type) {
		pageRefs.current[type].scrollIntoView({
			behavior: "smooth",
			block: "center",
		});
	}
	console.log("hello")
	return (
		// test comment
		<div className={`event-page-wrapper ${classes.termsPage}`}>
			{/* <Header title="Terms and Conditions" phnxButton={true} /> */}
			<Grid container className={classes.gridContainer}>
				<Grid
					item
					className={`${classes.hideScroll} ${classes.hideScroll1}`}
					style={{ height: '90vh', marginBottom:"10px" }}
					lg={8}
					md={8}
					sm={12}
					xs={12}
				>
					<p>Last updated: September 20th, 2021</p>
					<p>
						Please read these terms and conditions carefully before
						using Our Service.
					</p>
					<h3
					className={classes.sideMenuHeading}
						ref={(el) =>
						(pageRefs.current = {
							...pageRefs.current,
							InterpretationAndDefinitions: el,
						})
						}
					>
						Interpretation and Definitions
					</h3>

					<h6 className={classes.definition}>
						<strong>
							{" "}
							NB: This product from PhoenixDAO is
							opensource/decentralized, meaning the project has
							little to no control on its use (though it will
							continue to make sure security of users remains a
							high priority). Make sure as a user/event creator,
							this is only used for social good as deemed fit by
							all legal jurisdiction across the world. PhoenixDAO
							cannot be held liable if a user uses the product for
							any activity that breaches legality in
							region/jurisdiction.{" "}
						</strong>{" "}
					</h6>
					<h4
						ref={(el) =>
						(pageRefs.current = {
							...pageRefs.current,
							Interpretation: el,
						})
						}
					>
						Interpretation
					</h4>
					<p>
						The words of which the initial letter is capitalized
						have meanings defined under the following conditions.
						The following definitions shall have the same meaning
						regardless of whether they appear in singular or in
						plural.
					</p>
					<h4
						ref={(el) =>
						(pageRefs.current = {
							...pageRefs.current,
							Definitions: el,
						})
						}
					>
						Definitions
					</h4>
					<p>For the purposes of these Terms and Conditions:</p>
					<ul>
						<li>
							<p>
								<strong>Affiliate</strong>  means any entity (individual/formal or informal organization) that uses the service/product.
							</p>
						</li>
						<li>
							<p>
								<strong>Country</strong> refers to: Your location
							</p>
						</li>
						<li>
							<p>
								<strong>Company</strong> (referred to as either
								&quot;the Company&quot;, &quot;We&quot;,
								&quot;Us&quot; or &quot;Our&quot; in this
								Agreement) refers to PhoenixDAO.
							</p>
						</li>
						<li>
							<p>
								<strong>Device</strong> means any device that
								can access the Service such as a computer, a
								cellphone or a digital tablet.
							</p>
						</li>
						<li>
							<p>
								<strong>Service</strong> refers to the Website (particular link to the dApp in this case).
							</p>
						</li>
						<li>
							<p>
								<strong>Terms and Conditions</strong> (also referred as "Terms") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service.{" "}
								.
							</p>
						</li>
						<li>
							<p>
								<strong>
									Third-party Social Media Service
								</strong>{" "}
								means any services or content (including data, information, products or services) provided by a third-party that may be displayed, included or made available by the Service.
							</p>
						</li>
						<li>
							<p>
								<strong>Website</strong> refers to PhoenixDAO,
								accessible from{" "}
								<a
									href="http://www.phoenixdao.io/"
									rel="external nofollow noopener"
									target="_blank"
								>
									http://www.phoenixdao.io/
								</a>
							</p>
						</li>
						<li>
							<p>
								<strong>You</strong> mean the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.
							</p>
						</li>
					</ul>
					<h3
					className={classes.sideMenuHeading}
						ref={(el) =>
						(pageRefs.current = {
							...pageRefs.current,
							Acknowledgment: el,
						})
						}
					>
						Acknowledgment
					</h3>
					<p>
					These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.
					</p>
					<p>
					Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.
					</p>
					<p>
					By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.
					</p>
					<p>
					You represent that you are over the age that allows the use of such service in your jurisdiction. The Company does not permit those under acceptable legal age in the respective jurisdictions to use this Service.
					</p>
					<p>
					Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company. Our Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your personal information when You use the Application or the Website and tells You about Your privacy rights and how the law protects You. Please read Our Privacy Policy carefully before using Our Service.
					</p>
					<h3
						ref={(el) =>
						(pageRefs.current = {
							...pageRefs.current,
							Websites: el,
						})
						}
					>
						Links to Other Websites
					</h3>
					<p>
					Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company.
					</p>
					<p>
					The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.
					</p>
					<p>
					We strongly advise You to read the terms and conditions and privacy policies of any third-party web sites or services that You visit.
					</p>
					<h3
					className={classes.sideMenuHeading}
						ref={(el) =>
						(pageRefs.current = {
							...pageRefs.current,
							Termination: el,
						})
						}
					>
						Termination
					</h3>
					<p>
					We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.
					</p>
					<p>
					Upon termination, Your right to use the Service will cease immediately.
					</p>
					<h3
					className={classes.sideMenuHeading}
						ref={(el) =>
						(pageRefs.current = {
							...pageRefs.current,
							Limitation: el,
						})
						}
					>
						Limitation of Liability
					</h3>
					<p>
					Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.
					</p>
					<p>
					To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of this Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.
					</p>
					<p>
					NB: PhoenixDAO suite of products are opensource/decentralized, meaning, that you’re responsible for whatever happens with its use.
					</p>
					<h3
					className={classes.sideMenuHeading}
						ref={(el) =>
						(pageRefs.current = {
							...pageRefs.current,
							Disclaimer: el,
						})
						}
					>
						&quot;AS IS&quot; and &quot;AS AVAILABLE&quot;
						Disclaimer
					</h3>
					<p>
					The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice. Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.
					</p>
					<p>
					Without limiting the foregoing, neither the Company nor any of the company's provider makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Service, or the information, content, and materials or products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Service; or (iv) that the Service, its servers, the content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.
					</p>
					<p>
					Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You. But in such a case the exclusions and limitations set forth in this section shall be applied to the greatest extent enforceable under applicable law.
					</p>
					<h3
					className={classes.sideMenuHeading}
						ref={(el) =>
						(pageRefs.current = {
							...pageRefs.current,
							Governing: el,
						})
						}
					>
						Governing Law
					</h3>
					<p>
					The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.
					</p>
					<h3
						ref={(el) =>
						(pageRefs.current = {
							...pageRefs.current,
							Disputes: el,
						})
						}
					>
						Disputes Resolution
					</h3>
					<p>
					If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.
					</p>
					<h3
					className={classes.sideMenuHeading}
						ref={(el) =>
						(pageRefs.current = {
							...pageRefs.current,
							European: el,
						})
						}
					>
						For European Union (EU) Users
					</h3>
					<p>
					If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which you are resident in.
					</p>
					<h3
					className={classes.sideMenuHeading}
						ref={(el) =>
						(pageRefs.current = {
							...pageRefs.current,
							United: el,
						})
						}
					>
						United States Legal Compliance
					</h3>
					<p>
					You represent and warrant that (i) You are not located in a country that is subject to the United States government embargo, or that has been designated by the United States government as a "terrorist supporting" country, and (ii) You are not listed on any United States government list of prohibited or restricted parties.
					</p>
					<h3
					className={classes.sideMenuHeading}
						ref={(el) =>
						(pageRefs.current = {
							...pageRefs.current,
							SeverabilityAndWaiver: el,
						})
						}
					>
						Severability and Waiver
					</h3>
					<h4
						ref={(el) =>
						(pageRefs.current = {
							...pageRefs.current,
							Severability: el,
						})
						}
					>
						Severability
					</h4>
					<p>
					If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.
					</p>
					<h4
						ref={(el) =>
						(pageRefs.current = {
							...pageRefs.current,
							Waiver: el,
						})
						}
					>
						Waiver
					</h4>
					<p>
					Except as provided herein, the failure to exercise a right or to require performance of an obligation under this Terms shall not effect a party's ability to exercise such right or require such performance at any time thereafter nor shall be the waiver of a breach constitute a waiver of any subsequent breach.
					</p>
					<h3
					className={classes.sideMenuHeading}
						ref={(el) =>
						(pageRefs.current = {
							...pageRefs.current,
							Translation: el,
						})
						}
					>
						Translation Interpretation
					</h3>
					<p>
					These Terms and Conditions may have been translated if We have made them available to You on our Service. You agree that the original English text shall prevail in the case of a dispute.
					</p>
					<h3
					className={classes.sideMenuHeading}
						ref={(el) =>
						(pageRefs.current = {
							...pageRefs.current,
							Changes: el,
						})
						}
					>
						Changes to These Terms and Conditions
					</h3>
					<p>
					We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.
					</p>
					<p>
					By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the website and the Service.
					</p>
					<h3
					className={classes.sideMenuHeading}
						ref={(el) =>
						(pageRefs.current = {
							...pageRefs.current,
							Contact: el,
						})
						}
					>
						Contact Us
					</h3>
					{/* <ul> */}
					<p>
					If you have any questions about these Terms and Conditions, You can contact us:
						<ul>
							<li>
								By email:{" "}
								<a
									href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=hello@phoenixdao.io"
									target="_blank"
								>
									hello@phoenixdao.io
								</a>
							</li>
							<li>
								{" "}
								By visiting this page on our website: {" "}
								<a
									href="https://phoenixdao.io/contact"
									target="_blank"
									style={{overflowWrap:"break-word"}}
								>
									http://www.phoenixdao.io/contact	
																</a>
							</li>
						</ul>
					</p>

					{/* <li>	
					<p>
						By visiting this page on our website:{" "}
						<a
							href="https://phoenixdao.io/"
							rel="external nofollow noopener"
							target="_blank"
						>
					https://phoenixdao.io/
						</a>
					</p>
				</li> */}
					{/* </ul> */}
				</Grid>
				<Grid
					item
					className={`${classes.hideScroll} ${classes.hideScroll2}`}
					style={{ height: "90vh" }}
					lg={4}
					md={4}
					sm={12}
					xs={12}
				>
					<div className={classes.menu}>
						<h5 className={classes.menuMainHeading}>Menu</h5>
						<Divider light />

						<h5
							className={classes.menuHeading}
							onClick={() =>
								scrollIntoView("InterpretationAndDefinitions")
							}
						>
							Interpretation and Definitions
						</h5>
						<h6
							className={classes.menuSubHeading}
							onClick={() => scrollIntoView("Interpretation")}
						>
							Interpretation
						</h6>
						<h6
							className={classes.menuSubHeading}
							onClick={() => scrollIntoView("Definitions")}
						>
							Definitions
						</h6>
						<h5
							className={classes.menuHeading}
							onClick={() => scrollIntoView("Acknowledgment")}
						>
							Acknowledgment
						</h5>
						<h5
							className={classes.menuHeading}
							onClick={() => scrollIntoView("Websites")}
						>
							Links to Other Websites
						</h5>
						<h5
							className={classes.menuHeading}
							onClick={() => scrollIntoView("Termination")}
						>
							Termination
						</h5>
						<h5
							className={classes.menuHeading}
							onClick={() => scrollIntoView("Limitation")}
						>
							Limitation of Liability
						</h5>
						<h5
							className={classes.menuHeading}
							onClick={() => scrollIntoView("Disclaimer")}
						>
							"AS IS" and "AS AVAILABLE" Disclaimer
						</h5>
						<h5
							className={classes.menuHeading}
							onClick={() => scrollIntoView("Governing")}
						>
							Governing Law
						</h5>
						<h5
							className={classes.menuHeading}
							onClick={() => scrollIntoView("Disputes")}
						>
							Disputes Resolution
						</h5>
						<h5
							className={classes.menuHeading}
							onClick={() => scrollIntoView("European")}
						>
							For European Union (EU) Users
						</h5>
						<h5
							className={classes.menuHeading}
							onClick={() => scrollIntoView("United")}
						>
							United States Legal Compliance
						</h5>
						<h5
							className={classes.menuHeading}
							onClick={() =>
								scrollIntoView("SeverabilityAndWaiver")
							}
						>
							Severability and Waiver
						</h5>
						<h6
							className={classes.menuSubHeading}
							onClick={() => scrollIntoView("Severability")}
						>
							Severability
						</h6>
						<h6
							className={classes.menuSubHeading}
							onClick={() => scrollIntoView("Waiver")}
						>
							Waiver
						</h6>
						<h5
							className={classes.menuHeading}
							onClick={() => scrollIntoView("Translation")}
						>
							Translation Interpretation
						</h5>
						<h5
							className={classes.menuHeading}
							onClick={() => scrollIntoView("Changes")}
						>
							Changes to These Terms and Conditions
						</h5>
						<h5
							className={classes.menuHeading}
							onClick={() => scrollIntoView("Contact")}
						>
							Contact Us
						</h5>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default Terms;
