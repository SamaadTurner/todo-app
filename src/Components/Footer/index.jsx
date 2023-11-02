import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
    footer: {
      textAlign: 'right',
      width: '80%',
      margin: 'auto',
    //   fontFamily: 'apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
    }
  }));

function Footer(){
    const { classes } = useStyles();

    return(
        <footer className={classes.footer} data-testid="footer">
           ©2023 Ike Steoger
        </footer>
    )
}

export default Footer;