import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

import { AiFillDelete, AiOutlineMonitor } from "react-icons/ai";
import { MdExpandMore } from "react-icons/md";
import '../styles/PlannerCard.css'

import { generalContext } from '../contexts';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 120,
        maxWidth: 120,
        background: "#EEEEEE"
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    title: {
        fontSize: 14
    },
    remark: {
        fontSize: 11,
        textAlign: "left"
    }
}));



function PlannerCard(props) {
    const general = useContext(generalContext);

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title}>
                    {props.recipe.title}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="delete" size="small"
                    onClick={props.deleteItem}>
                    <AiFillDelete />
                </IconButton>
                <Link to={{ pathname: '/recipe' }} className="dish-anchor">
                    <IconButton size="small"
                        onClick={() => {
                            general.setGeneralState({ ...general.generalState, selectedDish: props.recipe });
                        }}>
                        <AiOutlineMonitor />
                    </IconButton>
                </Link> 
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    // aria-expanded={expanded}
                    aria-label="show more"
                    size="small"
                >
                    <MdExpandMore />
                </IconButton>
            </CardActions>
            {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
             
                <CardContent>
                    <Typography variant="body2" color="textSecondary" className={classes.remark}>
                    This impressive paella is a perfect party dish and a fun meal to cook together with your
                    guests. Add 1 cup of frozen peas along with the mussels, if you like.
                </Typography>
                </CardContent>
          
                <CardActions disableSpacing>
                <IconButton aria-label="edit" size="small">
                    <AiFillEdit />
                </IconButton>
            </CardActions>
            </Collapse> */}
        </Card>
    );
}

export default PlannerCard;
