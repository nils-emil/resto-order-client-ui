import React from 'react';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Moment from "react-moment";
import Button from "@material-ui/core/Button";

export default function ServiceCallTableRow(props) {
    return (
        <TableRow>
            <TableCell align="left" component="th" scope="row">
                {props.serviceCall.tableCode}
            </TableCell>
            <TableCell align="center">
                <Moment format="hh:mm:ss">{props.serviceCall.callTime}</Moment>
            </TableCell>
            <TableCell align="right">
                <Button onClick={ev => props.markAsServiced(props.index)}
                        variant="contained"
                        size="small"
                        color="primary">
                    Mark as serviced
                </Button>
            </TableCell>
        </TableRow>

    );
}

