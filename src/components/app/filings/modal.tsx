/*
* Author:   Smart Filings
* Editor:   Illia Kurantsev (expresswebd3v@gmail.com)
* License:  Proprietary License
* */

import React, {FC} from 'react';
import {Box, Button, Fade, IconButton, Modal, Stack} from "@mui/material";
import {
    CloseOutlined,
    PictureAsPdfOutlined,
    PrintOutlined
} from "@mui/icons-material";
import Typography from "@mui/material/Typography";

interface Props {
    str: string;
    current: string;
    open: boolean;
    setOpen: (val: boolean) => void;
}

const ViewModal: FC<Props> = (props) => {
    const {open, setOpen, current, str} = props;

    return (
        <Modal
            slotProps={{
                backdrop: {
                    sx:{
                        backdropFilter: "blur(4px)",
                        background: "#3333334f",
                    }
                }
            }}
            open={open}>
            <Fade in={open}>
                <Box
                    sx={{
                        position: 'absolute' as 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 1000,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                    }}>
                    <Stack
                        sx={{mb: 2}}
                        justifyContent="space-between"
                        direction="row">
                        <Typography variant="h5" component="h3">
                            {current}
                        </Typography>
                        <Stack
                            spacing={2}
                            direction="row">
                            <IconButton disabled>
                                <PrintOutlined/>
                            </IconButton>
                            <IconButton disabled>
                                <PictureAsPdfOutlined/>
                            </IconButton>
                        </Stack>
                    </Stack>
                    <Box
                        sx={{
                            border: "1px solid #555",
                            p: 4,
                            maxHeight: 400,
                            overflowY: "auto"
                        }}>
                        <Typography
                            lineHeight={2}
                            sx={{whiteSpace: "break-spaces"}}>
                            {str}
                        </Typography>
                    </Box>
                    <Stack
                        justifyContent="flex-end"
                        direction="row">
                        <Button
                            onClick={()=>{setOpen(false)}}
                            disableElevation
                            startIcon={<CloseOutlined/>}
                            sx={{mt: 4}}
                            color="error"
                            variant="contained">
                            Close
                        </Button>
                    </Stack>
                </Box>
            </Fade>
        </Modal>
    );
};

export default ViewModal;