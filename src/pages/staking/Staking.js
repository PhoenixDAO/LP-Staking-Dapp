import React from "react";
import { Typography, Button } from "@mui/material";
import LiquidityModal from "../../components/LiquidityModal";

const Staking = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const handleClickOpen = () => {
    setIsVisible(true);
  };
  const handleClose = () => {
    setIsVisible(false);
  };
  return (
    <div>
      <h1>Staking</h1>
      <Typography paragraph>
        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
        ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar elementum
        integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi
        lacus sed viverra tellus. Purus sit amet volutpat consequat mauris.
        Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
        vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra
        accumsan in. In hendrerit gravida rutrum quisque non tellus orci ac.
        Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique
        senectus et. Adipiscing elit duis tristique sollicitudin nibh sit.
        Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra
        maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin
        aliquam ultrices sagittis orci a.
      </Typography>
      <Button onClick={handleClickOpen} variant="contained">
        Hello
      </Button>
      <LiquidityModal
        componentName="addLiquidity"
        isVisible={isVisible}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Staking;
