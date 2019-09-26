import React, {useEffect, useState} from 'react';
import './styles.scss'
import {getOpenTabs} from "../../../services/clientService";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DeleteIcon from "@material-ui/core/SvgIcon/SvgIcon";

function Bartab() {

    const [openTable, setOpenTable] = useState([]);
    useEffect(() => {
            let tableCode = localStorage.getItem('tableInfo');
            getOpenTabs(tableCode).subscribe(e => (
                setOpenTable(e.data)
            ))
        }, []
    );

    return (
        <List>
            {openTable.map(tab => (
                <ListItem
                    key={tab._id}
                    className="drawer-text">
                    <ListItemText primary={tab.name}/>
                        Join bill
                </ListItem>
            ))}
            <button> Tee uus arve</button>
        </List>
    )
}

export default Bartab;
