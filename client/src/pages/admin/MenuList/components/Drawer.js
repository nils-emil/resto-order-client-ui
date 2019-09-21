import React, {useState} from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import './styles.scss'
import Input from "@material-ui/core/Input";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

export default function TemporaryDrawer(props) {
    const [inputActive, setInputActive] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const handleClickAway = () => {
        setInputActive(false);
    };

    const handleSubmit = () => {
        props.createNewCategory(inputValue);
        setInputValue("");
    };

    const input = inputActive ? (
        <ListItem button>
            <ListItemIcon>
                <AddIcon onClick={() => handleSubmit()}/></ListItemIcon>
            <Input value={inputValue}
                   onChange={e => setInputValue(e.target.value)}
                   onKeyPress={event => event.key === 'Enter' ? handleSubmit() : null}/>
        </ListItem>
    ) : (
        <ListItem button onClick={() => setInputActive(true)}>
            <ListItemIcon><AddIcon onClick={() => setInputActive(true)}/></ListItemIcon>
            <ListItemText primary="Add new category"/>
        </ListItem>
    );

    return (
        <div>
            <Drawer variant="permanent" className="drawer">
                <div className="padding-top">
                    <List>
                        {props.categories.map((category, index) => (
                            <ListItem
                                key={category._id}
                                className="drawer-text"
                                onClick={() => props.selectCategory(category._id)}>
                                <ListItemText primary={category.name}/>
                                <ListItemIcon>
                                    <DeleteIcon onClick={() => props.deleteCategory(category._id, index)}/>
                                </ListItemIcon>
                            </ListItem>
                        ))}
                    </List>
                    <Divider/>
                    <List>
                        <ListItem button onClick={() => props.selectCategory("")}>
                            <ListItemText primary="Unsorted items"/>
                        </ListItem>
                        <ClickAwayListener onClickAway={handleClickAway}>
                            {input}
                        </ClickAwayListener>
                    </List>
                </div>
            </Drawer>
        </div>
    );
}
