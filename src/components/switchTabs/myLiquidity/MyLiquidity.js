import React, { useState, useEffect } from "react";
import "./myLiquidity.css";
import PhnxLogo from "../../../assets/phnxLogo.png";
import EthLogo from "../../../assets/ETH1.png";
import SettingsLogo from "../../../assets/settings.png";
import { useWeb3React } from "@web3-react/core";
import { Modal } from "@mui/material";
import RemoveLiquidityModal from "../../removeLiquidityComponent/RemoveLiquidityModal";
import ConnectWallet from "../../ConnectWallet";
import {
  Button,
  // InputAdornment,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  GetPoolPositionAction,
  GetPhnxBalanceAction,
  CheckApprovalPhnxStakingAction,
  CheckApprovalUniswapPairAction,
} from "../../../redux/actions/contract.actions";
import SlippingTolerance from "../../connectModal/SlippingTolerance";
import { GetEthBalanceAction } from "../../../redux/actions/local.actions";
import * as POOL_SERVICES from "../../../services/pool.services";

function MyLiquidity({ ChangeTab }) {
  const web3context = useWeb3React();
  const dispatch = useDispatch();

  const poolPosition = useSelector(
    (state) => state.contractReducer.poolPosition
  );
  const contractUniswapPair = useSelector(
    (state) => state.contractReducer.contractUniswapPair
  );
  const slippageRemoveLiquidity = useSelector(
    (state) => state.localReducer.slippageRemoveLiquidity
  );

  const [allowance, setAllowance] = useState(0);

  const [slippageModal, setSlippageModal] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);

  const [ConnectWalletModalStatus, setConnectWalletModalStatus] =
    useState(false);

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const contractPhnxDao = useSelector(
    (state) => state.contractReducer.contractPhnxDao
  );

  const handleGetPoolPositionAction = () => {
    dispatch(GetPoolPositionAction(web3context, contractUniswapPair));
  };
  const handleGetEthBalanceAction = () => {
    dispatch(GetEthBalanceAction(web3context));
  };
  const handleGetPhnxBalanceAction = () => {
    dispatch(GetPhnxBalanceAction(web3context, contractPhnxDao));
  };

  const handleGiveApprovalUniswapPair = async (setApproveStatus) => {
    await POOL_SERVICES.giveApprovalUniswapPair(
      web3context,
      contractUniswapPair,
      handleGetPoolPositionAction,
      handleGetEthBalanceAction,
      handleGetPhnxBalanceAction,
      handleCheckApprovalUniswapPairAction,
      setAllowance,
      setApproveStatus
    );
  };

  useEffect(() => {
    // console.log(poolPosition.lp,'aaa');
    if (contractUniswapPair) {
      console.log("asdasdasdasdasdasdads");
      handleCheckApprovalUniswapPairAction(setAllowance);
      dispatch(GetPoolPositionAction(web3context, contractUniswapPair));
    }
  }, [web3context.active, contractUniswapPair]);

  const handleCheckApprovalUniswapPairAction = async (
    setAllowance,
    setApproveStatus
  ) => {
    console.log("coming to handleCheckApprovalUniswapPairAction");
    POOL_SERVICES.checkApprovalUniswapPair(
      web3context,
      contractUniswapPair,
      setAllowance,
      setApproveStatus
    );
    console.log(allowance, "999999999");
  };

  return (
    <div className="my-liquidity-div">
      <div className="my-liq-head">My Liquidity</div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="my-liq-sub-head">
          Remove Liquidity to receive tokens back
        </div>
        <img
          onClick={() => setSlippageModal(!slippageModal)}
          src={SettingsLogo}
          style={{
            marginLeft: "auto",
            height: "20px",
            width: "20px",
            cursor: "pointer",
          }}
        ></img>
      </div>

      <div className="divider"></div>

      {!web3context.account ? (
        <div>
          <br></br>
          <br></br>

          <div className="phnx-eth">
            <p
              className="phnx-eth-no"
              style={{
                width: "100%",
                textAlign: "center",
                fontWeight: "400",
                fontSize: "23px",
              }}
            >
              Connect Wallet.
            </p>
          </div>

          <br></br>

          <Button
            variant="contained"
            size="small"
            fullWidth={true}
            style={{
              backgroundColor: "#413AE2",
              margin: "25px 0px 30px 0px",
              height: "55px",
              borderRadius: 12,
              textTransform: "capitalize",
              fontSize: "18px",
            }}
            onClick={() =>
              setConnectWalletModalStatus(!ConnectWalletModalStatus)
            }
          >
            {"Connect Wallet"}
          </Button>

          <br></br>
          <br></br>
          <br></br>

          <ConnectWallet
            justModal={true}
            openModal={ConnectWalletModalStatus}
          ></ConnectWallet>
        </div>
      ) : poolPosition == null ? (
        <div>
          <br></br>
          <br></br>

          <div className="phnx-eth">
            <p
              className="phnx-eth-no"
              style={{
                width: "100%",
                textAlign: "center",
                fontWeight: "400",
                fontSize: "23px",
              }}
            >
              No Liquidity Found 😔.
            </p>
          </div>

          <br></br>

          <Button
            variant="contained"
            size="small"
            fullWidth={true}
            style={{
              backgroundColor: "#413AE2",
              margin: "25px 0px 30px 0px",
              height: "55px",
              fontSize:"18px",
              textTransform:"capitalize",
              borderRadius: "9px",
            }}
            onClick={() => {
              ChangeTab("addLiquidity");
            }}
          >
            {"Add Liquidity"}
          </Button>

          <br></br>
          <br></br>
          <br></br>

          <ConnectWallet
            justModal={true}
            openModal={ConnectWalletModalStatus}
          ></ConnectWallet>
        </div>
      ) : // poolPosition !== null ?
      parseFloat(poolPosition.lp) <= 0.00001 ? (
        <div>
          <br></br>
          <br></br>

          <div className="phnx-eth">
            <p
              className="phnx-eth-no"
              style={{
                width: "100%",
                textAlign: "center",
                fontWeight: "400",
                fontSize: "23px",
              }}
            >
              No Liquidity Found 😔.
            </p>
          </div>
          <br></br>
          <Button
            variant="contained"
            size="small"
            fullWidth={true}
            style={{
              backgroundColor: "#413AE2",
              margin: "25px 0px 30px 0px",
              height: "55px",
              fontSize:"18px",
              textTransform:"capitalize",
              borderRadius: "9px",
            }}
            onClick={() => {
              ChangeTab("addLiquidity");
            }}
          >
            {"Add Liquidity"}
          </Button>

          <br></br>
          <br></br>
          <br></br>

          <ConnectWallet
            justModal={true}
            openModal={ConnectWalletModalStatus}
          ></ConnectWallet>
        </div>
      ) : (
        <div>
          <br></br>
          <div className="phnx-eth">
            <p className="phnx-eth-no">
              {parseFloat(poolPosition.lp).toFixed(5)}
            </p>
            <img src={PhnxLogo} className="phnx-eth-logo"></img>
            <img src={EthLogo} className="phnx-eth-logo"></img>
          </div>

          <div className="phnx-eth-txt">PHNX/ETH</div>

          <br />

          <div className="pooled-item">
            <div className="pooled-item-txt">pooled phnx</div>

            <div
              style={{
                display: "flex",
                marginLeft: "auto",
                alignItems: "center",
              }}
            >
              <img src={PhnxLogo} className="phnx-eth-logo"></img> &nbsp;
              <div className="pooled-item-txt">
                <span style={{ fontSize: "18px" }}>
                  {parseFloat(poolPosition.phnx).toFixed(5)}
                </span>
              </div>
            </div>
          </div>

          <br />

          <div className="pooled-item">
            <div className="pooled-item-txt">pooled eth</div>

            <div
              style={{
                display: "flex",
                marginLeft: "auto",
                alignItems: "center",
              }}
            >
              <img src={EthLogo} className="phnx-eth-logo"></img> &nbsp;
              <div className="pooled-item-txt">
                <span style={{ fontSize: "18px" }}>
                  {parseFloat(poolPosition.eth).toFixed(5)}
                </span>
              </div>
            </div>
          </div>

          <br />

          <div className="pooled-item">
            <div className="pooled-item-txt">pool share</div>

            <div
              style={{
                display: "flex",
                marginLeft: "auto",
                alignItems: "center",
              }}
            >
              <div className="pooled-item-txt">
                <span style={{ fontSize: "18px" }}>
                  {parseFloat(poolPosition.poolPerc).toFixed(5)}%
                </span>
              </div>
            </div>
          </div>

          <button
            className="remove-btn"
            onClick={() => {
              handleModalOpen();
            }}
          >
            Remove
          </button>

          <button
            className="add-liquidity-btn"
            onClick={() => {
              ChangeTab("addLiquidity");
            }}
          >
            Add Liquidity
          </button>
        </div>
      )}
      {isModalVisible ? (
        <Modal
          open={isModalVisible}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <RemoveLiquidityModal
            slippageValue={slippageRemoveLiquidity}
            allowance={allowance}
            giveApproval={handleGiveApprovalUniswapPair}
            handleClose={handleModalClose}
          />
        </Modal>
      ) : null}
      <SlippingTolerance
        status={slippageModal}
        handleClose={setSlippageModal}
        slippageValue={slippageRemoveLiquidity}
        slippageType="remove"
      />
      
    </div>
  );
}

export default MyLiquidity;
