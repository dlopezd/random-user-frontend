import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { AuthContext } from '../../context/auth-context';
import ItemList from './ItemList';
import Error from '../Error'
import Loader from '../Loader'

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: 20
    },
    griptop: {
        flexGrow: 1,
    }
}));

const Content = props => {
    const [spacing, setSpacing] = useState(2);
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const authContext = useContext(AuthContext)

    useEffect(() => {
        const getData = async _ => {
            try {
                setIsLoading(true);
                var urlApi = "http://localhost:2000/";
                const headers = { token_id: authContext.token }
                const response = await axios.get(urlApi, { headers });

                setUsers(response.data.data);
                setIsLoading(false);
            }
            catch (error) {
                setIsLoading(false);
                setError("No se pudo cargar la información.")
            }
        }

        getData();
    }, []);

    return (
        isLoading ? <Loader /> :
            error ? <Error msg="Error al cargar la información." /> :
                <Container className={classes.container}>
                    <Grid container className={classes.griptop} spacing={2}>
                        <Grid item >
                            <Grid container justify="space-around" spacing={spacing}>
                                {
                                    users.map(u => {
                                        return (
                                            <ItemList
                                            key={u.email}
                                            user={u} />
                                        );
                                    })
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
    );
}

export default Content;