import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, CssBaseline, Grid } from "@mui/material";

import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";

import { useSelector, useDispatch } from "react-redux";
import { useWeb3React } from "@web3-react/core";

import {
  GetEthBalanceAction,
  GetUserInfoAction,
} from "../../redux/actions/local.actions";
import {
  GetPhnxBalanceAction,
  GetPoolPositionAction,
  PhnxDaoContractInitAction,
  PhnxStakeContractInitAction,
  UniswapContractPairInitAction,
  UniswapContractRouterInitAction,
} from "../../redux/actions/contract.actions";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function DashboardLayout() {
  const web3context = useWeb3React();
  const dispatch = useDispatch();
  const contractPhnxDao = useSelector(
    (state) => state.contractReducer.contractPhnxDao
  );
  const contractPhnxStake = useSelector(
    (state) => state.contractReducer.contractPhnxStake
  );
  const contractUniswapPair = useSelector(
    (state) => state.contractReducer.contractUniswapPair
  );
  const balanceEth = useSelector((state) => state.localReducer.balanceEth);
  const balancePhnx = useSelector((state) => state.contractReducer.balancePhnx);
  const poolPosition = useSelector(
    (state) => state.contractReducer.poolPosition
  );

  useEffect(() => {
    dispatch(PhnxStakeContractInitAction(web3context));
    if (web3context.account && web3context.active) {
      dispatch(PhnxDaoContractInitAction(web3context));
      dispatch(UniswapContractPairInitAction(web3context));
      dispatch(UniswapContractRouterInitAction(web3context));
    }
  }, [web3context.active, web3context.account, web3context]);

  useEffect(() => {
    if ((contractPhnxDao, web3context.active, web3context.account)) {
      dispatch(GetEthBalanceAction(web3context));
      dispatch(GetPhnxBalanceAction(web3context, contractPhnxDao));
    }
  }, [contractPhnxDao, web3context.active, web3context.account, web3context]);

  useEffect(() => {
    if (contractUniswapPair && web3context.account) {
      dispatch(GetPoolPositionAction(web3context, contractUniswapPair));
    }
  }, [balanceEth, balancePhnx, contractUniswapPair, web3context.account]);

  useEffect(() => {
    if (web3context.active && web3context.account && contractPhnxStake) {
      dispatch(GetUserInfoAction(web3context, contractPhnxStake));
    }
  }, [web3context.active, contractPhnxStake, poolPosition, balancePhnx]);
  // contractPhnxStake?.methods && web3context.active && web3context.account;

  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <DashboardNavbar open={open} handleDrawerOpen={handleDrawerOpen} />

      <DashboardSidebar
        open={open}
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Box className="main-div">
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
