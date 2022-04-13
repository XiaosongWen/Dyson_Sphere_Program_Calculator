import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';

import {SearchGrid} from "../SearchGrid";


interface Props {
    open: boolean;
    closeSearchGrid:  (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function SelectDialog(props: Props) {
    const {open, closeSearchGrid} = props;


    return (
        <Dialog open ={open} onClose={closeSearchGrid} maxWidth='lg'>
            <DialogTitle>Select an item to produce
                <IconButton
                    aria-label="close"
                    onClick={closeSearchGrid}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <SearchGrid />
            </DialogContent>
        </Dialog>

    );
}