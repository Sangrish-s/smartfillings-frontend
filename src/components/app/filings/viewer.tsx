/*
* Author:   Smart Filings
* Editor:   Illia Kurantsev (expresswebd3v@gmail.com)
* License:  Proprietary License
* */

import React, {FC, useState} from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, MenuItem, Select, Slider,
    Stack
} from "@mui/material";
import FolderLoading from "@/components/loader/folder-loading";
import ScanningLoader from "@/components/loader/scanning";
import ViewModal from "@/components/app/filings/modal";
import {promptApi} from "@/api";
import {WarningAmberOutlined} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import {useDispatch, useSelector} from "react-redux";
import {scannedAction, scanningAction} from "@/store/files/filese.action";

interface Payload {
    prompt_type: "key_points" | "summary" | "red_flags" | "1_click_analysis" | "activity" | "major_changes" | "contradictions";
    option?: "investors" | "competitors" | "banks" | "traders";
    form_type: string;
    url: string;
    sentences: {
        min: number;
        max: number;
    }
}


const AppFilingViewer: FC = () => {
    const file = useSelector((state: any) => state.file.file)
    const filing = useSelector((state: any) => state.file.filing)
    const fileLoading = useSelector((state: any) => state.file.fileLoading)
    const scanning = useSelector((state: any) => state.file.scanning)
    const [open, setOpen] = useState(false);
    const [inputOpen, setInputOpen] = useState(false);
    const [current, setCurrent] = useState("");
    const [string, setString] = useState<string>("");
    const [selectType, setSelectType] = useState<"key_points" | "summary" | "red_flags" | "1_click_analysis">("1_click_analysis")
    const [selectOption, setSelectOption] = useState<"investors" | "competitors" | "banks" | "traders">("traders")
    const [range, setRange] = useState<number[]>([3, 20])
    const dispatch = useDispatch();


    const promptHandle = async (type: "key_points" | "summary" | "red_flags" | "1_click_analysis" | "activity" | "major_changes" | "contradictions") => {
        dispatch(scanningAction())

        const payload: Payload = {
            prompt_type: type,
            option: selectOption,
            form_type: filing?.formType || "",
            url: filing?.linkToFilingDetails || "",
            sentences: {
                "min": range[0],
                "max": range[1]
            }
        }


        try {
            const {data} = await promptApi(payload);
            setOpen(true);
            setString(data);
        } catch (e) {
            console.warn(e)
        }

        dispatch(scannedAction())
    }

    const confirmPromptHandle = (type: "key_points" | "summary" | "red_flags" | "1_click_analysis" | "activity" | "major_changes" | "contradictions") => {
        setCurrent({
            "key_points": "Key Points",
            "summary": "Summarize",
            "red_flags": "Red Flags",
            "1_click_analysis": "1-Click Analysis",
            "activity": "activity",
            "major_changes": "Major Changes",
            "contradictions": "Contradictions",
        }[type])

        if (type === "key_points" || type === "summary") {
            setSelectType(type)
            setInputOpen(true);
        } else {
            promptHandle(type)
        }
    }

    const confirmedPromptHandle = () => {
        setInputOpen(false);
        promptHandle(selectType)
    }


    return (
        <Box sx={{
            height: "100%",
            width: "100%",
        }}>

            <Stack
                justifyContent="space-between"
                spacing={.3}
                direction="row">
                <Button
                    sx={{px: 2, py: 2}}
                    size="small"
                    disabled={
                        !filing?.id || scanning
                    }
                    onClick={() => {
                        confirmPromptHandle("1_click_analysis")
                    }}
                    color="info"
                    variant="contained">
                    1-Click Analysis
                </Button>
                <Button
                    sx={{px: 2, py: 2}}
                    size="small"
                    disabled={
                        !filing?.id || scanning
                    }
                    onClick={() => {
                        confirmPromptHandle("summary")
                    }}
                    color="info"
                    variant="contained">
                    Summarize
                </Button>
                <Button
                    sx={{px: 2, py: 2}}
                    size="small"
                    disabled={
                        !filing?.id || scanning
                    }
                    onClick={() => {
                        confirmPromptHandle("key_points")
                    }}
                    color="info"
                    variant="contained">
                    Key Points
                </Button>
                <Button
                    sx={{px: 2, py: 2}}
                    size="small"
                    disabled={
                        !filing?.id || scanning
                    }
                    onClick={() => {
                        confirmPromptHandle("activity")
                    }}
                    color="info"
                    variant="contained">
                    Activity
                </Button>
                <Button
                    sx={{px: 2, py: 2}}
                    size="small"
                    disabled={
                        !filing?.id || scanning
                    }
                    onClick={() => {
                        confirmPromptHandle("major_changes")
                    }}
                    color="info"
                    variant="contained">
                    Major Changes
                </Button>
                <Button
                    sx={{px: 2, py: 2}}
                    size="small"
                    disabled={
                        !filing?.id || scanning
                    }
                    onClick={() => {
                        confirmPromptHandle("contradictions")
                    }}
                    color="info"
                    variant="contained">
                    Contradictions
                </Button>

                <Button
                    sx={{px: 2, py: 2}}
                    size="small"
                    disabled={
                        !filing?.id || scanning
                    }
                    onClick={() => {
                        confirmPromptHandle("red_flags")
                    }}
                    color="info"
                    variant="contained">
                    Red Flags
                </Button>
            </Stack>
            <Box
                sx={{
                    backgroundColor: filing?.id ? "white" : "#ffffff3f",
                    width: "100%",
                    overflowY: "auto",
                    position: "relative"
                }}>
                <Box sx={{
                    height: "calc(100vh - 250px)",
                    overflowY: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    {
                        !fileLoading ? (
                            !Boolean(filing?.id) ? (
                                    <Box>
                                        <Stack
                                            sx={{color: "#9f9f9f"}}
                                            spacing={1}
                                            alignItems="center">
                                            <WarningAmberOutlined sx={{width: 60, height: 60}}/>
                                            <Typography
                                                fontSize={24}
                                                fontWeight={600}
                                                color="#6f6f6f">
                                                No Content
                                            </Typography>
                                        </Stack>
                                    </Box>
                                ) :
                                <iframe style={{width: "100%", height: "100%", padding: 2, border: "1px solid #0000c0"}}
                                        srcDoc={file || ""}></iframe>
                        ) : (
                            <FolderLoading/>
                        )
                    }

                </Box>
                {
                    scanning && (<ScanningLoader/>)
                }
            </Box>

            <ViewModal
                str={string}
                current={current}
                setOpen={setOpen}
                open={open}/>

            <Dialog
                slotProps={{
                    backdrop: {
                        sx: {
                            background: "#3333334f",
                            backdropFilter: "blur(4px)"
                        }
                    }
                }}
                open={inputOpen}
                PaperProps={{
                    sx: {
                        p: 3,
                        bgcolor: "background.paper",
                        backgroundImage: "none"
                    }
                }}>
                <DialogTitle>
                    {
                        selectType === "key_points" ?
                            "Select Key Stakeholders" :
                            "Generate Summary"
                    }
                </DialogTitle>
                <DialogContent sx={{minWidth: 500}}>
                    <DialogContentText>
                        {
                            selectType === "key_points" ?
                                "Select the key stakeholders that the generated key points should be important to." :
                                "Select the number of sentences for the summary."
                        }
                    </DialogContentText>

                    {
                        selectType === "summary" && (
                            <Slider
                                value={range}
                                onChange={(e, val) => {
                                    setRange(val as number[])
                                }}
                                sx={{mt: 3}}
                                min={3}
                                max={50}
                                getAriaLabel={() => 'Sentences'}
                                valueLabelDisplay="auto"
                            />
                        )
                    }

                    {
                        selectType === "key_points" && (
                            <Select
                                value={selectOption}
                                onChange={(e: any) => {
                                    setSelectOption(e.target.value)
                                }}
                                fullWidth
                                defaultValue="traders">
                                <MenuItem value="traders">That are important to Day Traders</MenuItem>
                                <MenuItem value="investors">That are important to Long Term Investors</MenuItem>
                                <MenuItem value="banks">That are important to Investment Banks</MenuItem>
                                <MenuItem value="competitors">That are important to Competitors</MenuItem>
                            </Select>
                        )
                    }
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={confirmedPromptHandle}
                        variant="contained"
                        color="info">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AppFilingViewer;