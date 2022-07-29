import * as React from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Button, ButtonGroup, ClickAwayListener, Grow, IconButton, MenuItem, MenuList, Popper, Typography } from '@material-ui/core';
import { Logo } from '../Logo';
import { useRef } from 'react';
import { Paper } from '@mui/material';
import { Item } from '../../../model/Model';

type Props = {
    choose: (index: number) => void;
    itemList: Item[];
    selectedIdx: number;
};
export function ChooseItem(props: Props) {
    const anchorRef = useRef(null);
    const {choose, itemList, selectedIdx} = props;
    const [open, setOpen] = React.useState(false);

    
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const chooseByIndex = (index: number) => {
        choose(index);
        setOpen(false);
    }
    return (
    <>
        <ButtonGroup variant="contained" color="primary" ref={anchorRef}>
            <IconButton >
                <Logo icon={itemList[selectedIdx].icon} />
            </IconButton>
            <Button
                color="primary"
                size="small"
                aria-label="select factory"
                aria-haspopup="menu"
                onClick={handleToggle}
            >
                <ArrowDropDownIcon />
            </Button>
        </ButtonGroup>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
                <Grow
                {...TransitionProps}
                style={{
                    transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                }}
                >
                <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                    <MenuList id="split-button-menu">
                        {itemList.map((option, index) => (
                            <MenuItem
                                key={index}
                                selected={index === selectedIdx}
                                onClick={()=>chooseByIndex(index)}
                            >
                                
                                <Logo icon={option.icon}   />
                            </MenuItem>
                        ))}
                    </MenuList>
                    </ClickAwayListener>
                </Paper>
                </Grow>
            )}
            </Popper>
    </>
    );
};