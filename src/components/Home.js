import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: 60
    },
    grid: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    }
}));
const Home = props => {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Grid container justify="center" className={classes.grid}>
                <Typography component="h4" variant="h4" align="center">
                    Bienvenidos
                </Typography>
                <Typography variant="subtitle1" align="center">
                    Inicia sesión para acceder al contenido.
                </Typography>
            </Grid>
        </Container>
    );
}

export default Home;