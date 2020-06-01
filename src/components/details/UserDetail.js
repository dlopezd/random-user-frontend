import React from 'react'
import { withRouter } from 'react-router-dom'

import Error from '../Error'


import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import EmailIcon from '@material-ui/icons/Email';



const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: 10
    },
    card: {
        marginTop: 10,
    },
    cover: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
        height: 250
    },
    details: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 4
    },
    icon: {
        marginRight: 10
    },
    title: {
        marginBottom: 20
    },
    avatar: {
        height: 150,
        width: 150
    }
}));

const UserDetail = props => {
    const classes = useStyles();
    const user = props.location.state;

    return (
        !user ? <Error msg="Error al cargar la información del usuario" /> :
            <Container className={classes.container}>
                <Button
                    color="primary"
                    onClick={(event) => {
                        event.preventDefault();
                        props.history.push("/");
                    }}>Volver</Button>
                <Card className={classes.card} variant="outlined">
                    <div className={classes.details}>
                        <div className={classes.cover}>
                            <Avatar
                                className={classes.avatar}
                                alt={`${user.name.first} ${user.name.last}`}
                                src={user.picture.large} />
                        </div>
                        <CardContent className={classes.content}>
                            <Typography component="h4" variant="h4" className={classes.title}>
                                {user.name.title} {user.name.first} {user.name.last}
                            </Typography>
                            <div className={classes.item}>
                                <EmailIcon className={classes.icon} color="action" />
                                <Typography color="textSecondary">
                                    {user.email}
                                </Typography>
                            </div>
                            <div className={classes.item}>
                                <PhoneIcon className={classes.icon} color="action" />
                                <Typography color="textSecondary">
                                    {user.phone}
                                </Typography>
                            </div>
                            <div className={classes.item}>
                                <PhoneIphoneIcon className={classes.icon} color="action" />
                                <Typography color="textSecondary">
                                    {user.cell}
                                </Typography>
                            </div>
                            <div className={classes.item}>
                                <LocationOnIcon className={classes.icon} color="action" />
                                <Typography color="textSecondary">
                                    {user.location.street.name} {user.location.street.number}, {user.location.city}, {user.location.country}
                                </Typography>
                            </div>
                        </CardContent>
                    </div>
                </Card>
            </Container>
    );
}

export default withRouter(UserDetail);