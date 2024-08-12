/*
* Author:   Smart Filings
* Editor:   Illia Kurantsev (expresswebd3v@gmail.com)
* License:  Proprietary License
* */

import React, {FC, useEffect} from 'react';
import {Box, List, ListItemSecondaryAction, Pagination, Stack} from "@mui/material";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {DocumentScanner, DocumentScannerOutlined, OpenInNew} from "@mui/icons-material";
import FileLoadingLoader from "@/components/loader/file-loading";
import Link from "next/link";
import dayjs from "dayjs";
import {fileApi, filingsApi} from "@/api";
import Typography from "@mui/material/Typography";
import {useDispatch, useSelector} from "react-redux";
import {
    allFilesLoadedAction, changeFileAction,
    changeFilingAction, changeFilingsAction, fileLoadedAction,
    fileLoadingAction,
    filesLoadingAction
} from "@/store/files/filese.action";
import {RootState} from "@/store/files/store";
import filingList from "@/utils/json/filings-list.json";
import ListSecondary from './list-secondary';


const AppFilingsList: FC = () => {
    const filesLoading = useSelector((state: RootState) => state.file.filesLoading)
    const filings = useSelector((state: RootState) => state.file.filings || [])
    const files = useSelector((state: RootState) => state.file)
    const dispatch = useDispatch()

    const getFilingsHandler = async (page: number) => {
        dispatch(filesLoadingAction())
        const payload = {
            ticker: files.company?.ticker || "",
            formType: filingList,
            page: page,
            size: 10
        }

        try {
            const {data} = await filingsApi(payload);
            dispatch(changeFilingsAction(data))

            selectFileHandle(data.data[0])
        } catch (e) {
            console.warn("Error in getFilingsHandler", e);
        }

        dispatch(allFilesLoadedAction())
    }

    const selectFileHandle = async (fl: any) => {
        dispatch(changeFilingAction(fl))
        dispatch(fileLoadingAction())
        try {
            const {data} = await fileApi(fl.linkToFilingDetails)
            dispatch(changeFileAction(data));
        } catch (e) {
            console.warn(e)
        }
        dispatch(fileLoadedAction())
    }

    useEffect(() => {
        getFilingsHandler(1)
    }, [])

    return (
        <Box sx={{height: "100%"}}>
            {
                filesLoading ? (
                    <FileLoadingLoader/>
                ) : (
                    filings.length > 0 ? (
                        <Box>
                            <List sx={{pt: 0}}>
                                {
                                    filings.map((filing: any, index: number) => (
                                        <ListItem
                                            onClick={() => {selectFileHandle(filing)}}
                                            disablePadding
                                            key={`filing-${index}`}>
                                            <ListItemButton sx={{
                                                border: "1px solid #1f1f1f",
                                                '& .MuiListItemText-primary': {
                                                    display: "inline-block",
                                                    width: "40px"
                                                },
                                                '& .MuiListItemText-secondary': {
                                                    display: "inline-block",
                                                    width: "390px",
                                                    textAlign: "right"
                                                }  
                                            }}>
                                                <ListItemText primary={`${filing?.formType}`} secondary={<ListSecondary date={dayjs(filing?.filedAt).format('YYYY-MM-DD')} />}/>
                                                <ListItemSecondaryAction>
                                                    <Link href={filing?.linkToFilingDetails || "/"} target="_blank">
                                                        <OpenInNew
                                                            sx={{
                                                                width: 30,
                                                                height: 30,
                                                                mt: 1,
                                                                color: "#ffffff"
                                                            }}/>
                                                    </Link>
                                                </ListItemSecondaryAction>
                                            </ListItemButton>
                                        </ListItem>
                                    ))
                                }
                            </List>
                            <Stack
                                sx={{mt: 1}}
                                alignItems="center">
                                <Pagination
                                    page={files.pagination.page}
                                    onChange={(e, v) => {
                                        getFilingsHandler(v)
                                    }}
                                    count={parseInt(String(files.pagination.total / 10)) + 1}
                                />
                            </Stack>
                        </Box>
                    ) : (
                        <Box style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100%"}}>
                            <Stack
                                sx={{color: "#9f9f9f"}}
                                spacing={1}
                                alignItems="center">
                                <DocumentScannerOutlined sx={{width: 60, height: 60}}/>
                                <Typography
                                    fontSize={24}
                                    fontWeight={600}
                                    color="#6f6f6f">
                                    No List
                                </Typography>
                            </Stack>
                        </Box>
                    )
                )
            }
        </Box>
    );
};

export default AppFilingsList;