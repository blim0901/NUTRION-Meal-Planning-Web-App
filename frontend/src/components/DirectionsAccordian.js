import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { grey } from "@material-ui/core/colors";
import { withStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

const BlackCheckbox = withStyles({
  root: {
    color: grey[900],
    '&$checked': {
      color: grey[900],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const StyledFormControlLabel = withStyles({
  label: {
      fontFamily: "Abhaya Libre",
  },
})(FormControlLabel)

export default function ActionsInAccordionSummary(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checked1: false,
    checked2: false,
    checked3: false,
    checked4: false,
    checked5: false,
    checked6: false,
    checked7: false,
  });
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header"
        >
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={<BlackCheckbox />}
            label={props.instruction.step}
          />
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="textSecondary">
            {
              props.instruction.ingredients.map((ingredient) =>
              (
                <StyledFormControlLabel
                  control={<BlackCheckbox style={{ fontFamily: 'Abhaya Libre' }} />}
                  label={ingredient} />
              ))
            }
          </Typography>
        </AccordionDetails>
      </Accordion>

    </div>
  );
}
