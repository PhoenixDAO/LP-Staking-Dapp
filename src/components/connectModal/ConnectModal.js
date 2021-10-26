import React, { useState, useEffect } from "react";
import "./ConnectModal.css";
import Logo from "../../assets/Logo.png";
import CloseIcon from "@mui/icons-material/Close";
import PhnxLogo from "../../assets/PhnxLogo1.png";
import EthLogo from "../../assets/ETH1.png";

import Modal from "@mui/material/Modal";
import Web3 from "web3";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { useSelector, useDispatch } from "react-redux";
import { fixedWithoutRounding } from "../../utils/formatters";

const ConnectModal = ({
  transactionConfirmModal,
  _handleSupply,
  setTxModalClose,
  phnxValue,
  ethValue,
  poolShare,
  phnxPerEth,
  ethPerPhnx,
  slippageValue,
}) => {
  // const [open, setOpen] = useState(transactionConfirmModal);
  // const handleClose = () => {setOpen(false)};

  const [lp, setlp] = useState(0);

  useEffect(() => {
    calculateLpToken(ethValue, phnxValue);
  }, [phnxValue, ethValue]);

  // useEffect(()=>{
  //   console.log('asdasdasd')
  //   setOpen(transactionConfirmModal)
  // },[transactionConfirmModal]);
  const web3context = useWeb3React();
  const uniswapV2PairContract = useSelector(
    (state) => state.contractReducer.contractUniswapPair
  );
  // const slippageTolerance = useSelector(
  //   (state) => state.localReducer.slippageTolerance
  // );

  const calculateLpToken = async (amount0, amount1) => {
    console.log(amount0, amount1);

    if (!uniswapV2PairContract || !amount0 || !amount1) {
      return;
    }

    const getReserves = await uniswapV2PairContract.methods
      .getReserves()
      .call();
    const _totalSupply = await uniswapV2PairContract.methods
      .totalSupply()
      .call();

    const _reserve0 = getReserves._reserve0;
    const _reserve1 = getReserves._reserve1;

    amount0 = Web3.utils.toWei(amount0.toFixed(4).toString());
    amount1 = Web3.utils.toWei(amount1.toFixed(4).toString());

    const liquidity = Math.min(
      (amount0 * _totalSupply) / _reserve0,
      (amount1 * _totalSupply) / _reserve1
    );
    setlp(Web3.utils.fromWei(parseInt(liquidity).toString(), "ether"));
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <div>
        {/* <Button onClick={handleOpen}>Connect Modal</Button> */}
        <Modal
          open={transactionConfirmModal}
          onClose={setTxModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="add-liq-div">
            <div className="displayFlex">
              <div className="phnxDeposite">
                <img className="add-liq-Logo" style={{visibility:"hidden"}} src={Logo}></img>
              </div>
              <div className="closeModalIcon">
                <span className="cursorPointer">
                  <CloseIcon onClick={setTxModalClose} />
                </span>
              </div>
            </div>
             {/* <CloseIcon className="icon-btn" onClick={setTxModalClose} sx={{transform:"scale(1.2)", marginRight:"10px",cursor:"pointer"}} /> */}
            <div className="add-liq-heading">YOU WILL RECEIVE</div>

            <div
              className="add-liq-ps-div"
              style={{ display: "flex", alignItems: "center" }}
            >
              {fixedWithoutRounding(lp,7)}
              {/* <span className="iconMargin"> */}
              <img
                src={PhnxLogo}
                className="add-liq-phnx-eth-img"
                style={{ height: "25px", width: "25px", marginLeft: "5px" }}
              ></img>
              <img
                src={EthLogo}
                className="add-liq-phnx-eth-img iconLeftMargin"
                style={{ height: "25px", width: "25px", marginLeft: "5px" }}
              ></img>
              {/* </span> */}
            </div>

            <div className="textRecieve" style={{ marginBottom: "15px" }}>
              PHNX/ETH Pool tokens
            </div>
            <div className="add-liq-divider"></div>
            <div className="priceContainer">
              <div className="addPrice">
                <div className="displayFlex">
                  <div className="phnxDeposite">PHNX Deposited</div>
                  <div className="phnxDepositePrice fontWeight500 displayFlex">
                    <div>
                      <img
                        src={PhnxLogo}
                        className="phnxDepositePriceImage"
                      ></img>
                    </div>
                    <div>{phnxValue}</div>
                  </div>
                </div>
              </div>
              <div className="addPrice">
                <div className="displayFlex">
                  <div className="phnxDeposite">ETH Deposited</div>
                  <div className="phnxDepositePrice fontWeight500 displayFlex">
                    <div>
                      <img
                        src={EthLogo}
                        className="phnxDepositePriceImage"
                      ></img>
                    </div>
                    <div>{ethValue}</div>
                  </div>
                </div>
              </div>
              <div className="addPrice">
                <div className="displayFlex">
                  <div className="phnxDeposite">Rates</div>
                  <div className="phnxDepositePrice fontWeight400 displayInlineGrid ratesFontColor">
                    <div className="justifySelfEnd ratesFontColor">
                      {"1 PHNX = " + ethPerPhnx + " ETH"}
                    </div>
                    <div className="justifySelfEnd ratesFontColor">
                      {"1 ETH = " + phnxPerEth + " PHNX"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="addPrice">
                <div className="displayFlex">
                  <div className="phnxDeposite">Pool Share</div>
                  <div className="phnxDepositePrice displayFlex">
                    {poolShare}%
                  </div>
                </div>
              </div>
            </div>

            <div className="add-liq-phnx-eth-det-div">
              Output is estimated. if the price changes by more than{" "}
              {slippageValue}% your transaction will revert
            </div>

            {/* <div className="add-liq-phnx-eth-con-div">
        <div className="add-liq-phnx-eth-con">1 PHNX = 0.2335 ETH</div>
        <div className="add-liq-phnx-eth-con">1 ETH = 0.3456665 PHNX</div>
      </div> */}

            <button
              className="add-liq-btn cursorPointer"
              onClick={() => {
                _handleSupply();
              }}
            >
              Add Liquidity
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ConnectModal;
