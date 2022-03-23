import React from 'react';
import { AppBar, IconButton, Typography, Toolbar, Box  } from '@mui/material';
export default function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Typography sx={{flexGrow: 1}} variant="h6" color="inherit" component="span">
                        Card system
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
