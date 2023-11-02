import { createStyles, Header, Group, Navbar } from "@mantine/core";
import { Link } from "react-router-dom";
import Login from "../Login";

const useStyles = createStyles((theme) => ({
    navbar: {
    backgroundColor: theme.colors.blue[6],
    height: '100%',
    margin: '0',
    color: theme.colors.gray[0],
    display: 'flex',
    padding: theme.spacing.sm,
    fontSize: theme.fontSizes.md,
    },
    link: {
        // padding: theme.spacing.sm,
    }
}));

function HeaderComponent(){
    const { classes } = useStyles();
    return(
        <Header data-testid="header">
            <Navbar className={classes.navbar} >
                <Group position="apart">
                    <Group>
                        <Link className={classes.link} to='/'>Home</Link>
                        <Link className={classes.link} to='/settings'>Settings</Link>
                    </Group>
                    <Login />
                </Group>
            </Navbar>
        </Header>
    )
}

export default HeaderComponent;