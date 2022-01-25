import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../../assets/Logo.png";
import Check from "../../assets/tick.png";
import Share from "../../assets/share.png";
import { conciseAddress, fixedWithoutRounding } from "../../utils/formatters";
import Modal from "@mui/material/Modal";
import "./ConfirmModal.css";
import "./transactionsModal.css";
import { TX_LINK_MAINNET, TX_LINK_RINKEBY } from "../../contract/constant";
import { EmojiPeople } from "@mui/icons-material";

function TransactionsModal({ status, changeStatus, transactions }) {
  useEffect(() => {
    // console.log("tra", transactions);
  }, [transactions]);

  return (
    <Modal
      open={status}
      onClose={() => changeStatus(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="rm-liq-div">
        <img
          className="rm-liq-Logo"
          style={{ visibility: "hidden" }}
          src={Logo}
        ></img>{" "}
        <br></br>
        <div className="rm-liq-heading" style={{ fontSize: "30px" }}>
          Recent Transactions
        </div>
        <div
          style={{
            cursor: "pointer",
            position: "absolute",
            right: "25px",
            top: "25px",
            padding: "5px",
          }}
        >
          <span>
            <CloseIcon onClick={() => changeStatus(false)} />
          </span>
        </div>
        <div className="transactions-div">
          {transactions && transactions.length > 0 ? (
            transactions.map((e, i) => {
              return (
                <div key={i}>
                  <div className="trans-div-child">
                    <div>
                      <img
                        alt=""
                        src={Check}
                        style={{ height: "fit-Content" }}
                      ></img>
                    </div>

                    <div>
                      {/* {e.type}
                      <br></br>
                      amount0: &nbsp;
                      {e.amount0 * 0.0000000000000000001}
                      <br></br>
                      amount1: &nbsp;
                      {e.amount1 * 0.0000000000000000001} */}
                      {/* {console.log( */}
                        {/* "hello e.type",
                        e.type,
                        typeof e.type,
                        " e.amount: ",
                        e.amount0,
                        typeof e.amount0
                      )} */}
                      {e.type == "Deposit" && e.amount0 == "0"
                        ? "Unstaked! Your earnings has been harvested to your wallet"
                        : e.type == "Deposit" && e.amount0 != "0"
                        ? "Your funds has been staked in the farm"
                        : e.type == "Withdraw"
                        ? "Your funds has been unstaked"
                        : e.type == "addLiquidity"
                        ? `Added ${fixedWithoutRounding(
                            e.amount0 * 0.000000000000000001,
                            6
                          )}PHNX and ${fixedWithoutRounding(
                            e.amount1 * 0.000000000000000001,
                            6
                          )}Eth`
                        : e.type == "removeLiquidity"
                        ? `Removed ${fixedWithoutRounding(
                            e.amount0 * 0.000000000000000001,
                            6
                          )}PHNX and ${fixedWithoutRounding(
                            e.amount1 * 0.000000000000000001,
                            6
                          )}Eth`
                        : ""}
                    </div>

                    <div style={{ marginLeft: "auto" }}>
                      <a
                        href={TX_LINK_RINKEBY + e.id}
                        target="_blank"
                        rel="noreferrer"
                        style={{ textDecoration: "none", color: "#413AE2" }}
                      >
                        <img
                          alt=""
                          src={Share}
                          style={{ height: "fit-Content" }}
                        ></img>
                      </a>
                    </div>
                  </div>

                  <div className="trans-divider"></div>
                </div>
              );
            })
          ) : (
            <div>
              <div className="trans-div-child">
                {/* {console.log("hello No transaction")} */}
                <div>
                  <img
                    alt=""
                    src={Check}
                    style={{ height: "fit-Content" }}
                  ></img>
                </div>

                <div>No Transactions Yet!</div>
              </div>
            </div>
          )}

          <div style={{ height: "30px", width: "100%" }}></div>
        </div>
      </div>
    </Modal>
  );
}

export default TransactionsModal;
