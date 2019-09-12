import React from 'react';
import io from "socket.io-client";
import ServiceCallTableRow from "./ServiceCallTableRow";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

class ServiceCallTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableCodes: []
        };

        this.socket = io(process.env.REACT_APP_BACKEND_URL);
        this.socket.on('SERVICE_CALLED', function (data) {
            addMessage(data);
        });

        const addMessage = data => {
            this.setState({tableCodes: [...this.state.tableCodes, data]});
        };

        this.socket.on('ALL_UNSERVICED_TABLES', (data) => {
            this.setState({tableCodes: data});
        });

        this.socket.emit('GET_ALL_UNSERVICED_TABLES');

        this.markRequestServicedHandler = (index) => {
            let copy = [...this.state.tableCodes];
            let splice = copy.splice(index, 1);
            if (splice) {
                this.setState({tableCodes: copy});
                this.socket.emit('MARK_TABLE_SERVICED', {
                    _id: splice[0]._id
                })
            }
        }
    }

    componentWillUnmount() {
        this.socket.removeAllListeners();
    }

    render() {
        let serviceCallRows;
        let tableContent;
        if (this.state.tableCodes && this.state.tableCodes.length !== 0) {
            serviceCallRows = this.state.tableCodes.map((message, index) => {
                return (
                    <ServiceCallTableRow
                        key={message._id}
                        serviceCall={message}
                        index={index}
                        markAsServiced={this.markRequestServicedHandler}/>
                )
            });
            tableContent = <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Table code</b></TableCell>
                            <TableCell align="center"><b>Call time</b></TableCell>
                            <TableCell align="right"><b>Action</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {serviceCallRows}
                    </TableBody>
                </Table>
            </Paper>;
        } else {
            tableContent = "No pending service calls"
        }
        return (
            <Container maxWidth="md" style={{paddingTop: 20}}>
                {tableContent}
            </Container>

        );
    }
}

export default ServiceCallTable;