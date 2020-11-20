// @ts-ignore
import React from "react";
import { SvgIcon, Box, makeStyles, Theme } from "@material-ui/core";
import { CheckCircle } from "../../assets";
import { DISABLED, SUCCESS } from '../../util/colors';

/**
 * @typedef {object} Props
 * @prop {Component}  ValidateString  
 * 
 * @customProps
 * @prop {boolean} active - Active string
 * @prop {string} label - Label to display
 * @return {Component}
*/

const useStyles = makeStyles((theme: Theme) => ({
  root: (props: any) => ({
    display: "flex", 
    alignItems: "center",
    marginBottom: props && props.gutter ? theme.spacing(2.3) : "initial",
    '& svg': {
        fontSize: theme.typography.pxToRem(14),
        marginRight: theme.spacing(1.5)
    }
  })
}));


const ValidateString = (props: any) => {
  const { active, label } = props;  
  const { root } = useStyles(props);

  return (
    <Box className={root}>
      <SvgIcon htmlColor={active ? SUCCESS : DISABLED } component={CheckCircle} />
      <p>{label}</p>
    </Box>
  );
};

ValidateString.defaultProps = {
  active: false,
  label: "string",
  gutter: true
};

export default ValidateString;
