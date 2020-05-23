import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/auth-context'
import { withRouter } from 'react-router-dom'


import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Alert from '@material-ui/lab/Alert';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
    card: {
        marginTop: 40,
        maxWidth: 270,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
}));

const Login = props => {
    const authContext = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    const classes = useStyles();
    const [values, setValues] = React.useState({
        email: '',
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const resultLogin = await authContext.login(values.email, values.password);
        setIsLoading(false);
        resultLogin && props.history.push({ pathname: '/' });
    }

    const errorMessage = authContext.error === 'EMAIL_NOT_FOUND' ? 'Usuario no registrado.' :
        authContext.error === 'INVALID_PASSWORD' ? 'Password incorrecta.' :
            authContext.error === 'USER_DISABLED' ? 'Cuenta deshabilida.' : 'Error desconocido.'

    return (
        <Container style={{ display: 'flex', justifyContent: 'center' }}>

            <Card className={classes.card}>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <FormControl className={clsx(classes.margin, classes.textField)}>
                            <TextField
                                required
                                id="standard-required"
                                label="Email"
                                type="email"
                                value={values.email}
                                onChange={handleChange('email')} />
                        </FormControl>

                        <FormControl className={clsx(classes.margin, classes.textField)}>
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl className={clsx(classes.margin, classes.textField)}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isLoading}>
                                {!isLoading ? "Login" : "Cargando..."}
                            </Button>
                        </FormControl>
                    </form>

                    {
                        !authContext.error ? null :
                            <Alert severity="error">{errorMessage}</Alert>
                    }
                </CardContent>
            </Card>
        </Container>
    );
}

export default withRouter(Login);