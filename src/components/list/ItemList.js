import React from 'react';
import { withRouter } from 'react-router-dom'


import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: 350,
        margin: 8,
    },
    details: {
        display: 'flex',
        flexDirection: 'row',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 120,
        height:120
    },
    button: {
        paddingTop: 0,
        paddingBottom: 0
    }
}));

const ItemList = props => {
    const classes = useStyles();
    const user = props.user;

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={_=>{
                props.history.push({
                    pathname: `user/${user.login.uuid}`,
                    state:user
                })
            }}>
                <div className={classes.details}>
                    <CardMedia
                        className={classes.cover}
                        image={user.picture.large}
                        title="picture"
                    />
                    <CardContent className={classes.content}>
                        <Typography component="h6" variant="h6">
                            {user.name.first} {user.name.last}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {user.location.country}
                        </Typography>
                    </CardContent>
                </div>
            </CardActionArea>
        </Card>
    );
}
export default withRouter(ItemList);