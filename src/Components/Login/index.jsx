import { useContext, useState } from "react";
import { AuthContext } from "../../Context/Auth";
import { When } from "react-if";
import { TextInput, Button, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
    form: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-evenly',
        gap: '10px',
        boxSizing: 'border-box',
    }
}))

function Login(){

    const { classes } = useStyles();
    const { login, logout, isLoggedIn } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password);
        e.target.reset();
    }

    return(
        <>  
                <When condition={isLoggedIn}>
                    <Button color='red' onClick={logout}>Logout</Button>
                </When>
                <When condition={!isLoggedIn}>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <TextInput placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
                        <TextInput placeholder='Password' type="password" onChange={(e) => setPassword(e.target.value)} />
                        <Button color='gray.8' type="submit">Login</Button>
                    </form>
                </When>
        </>
    )
}

export default Login;