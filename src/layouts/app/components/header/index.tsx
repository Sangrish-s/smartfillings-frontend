/*
* Author:   Smart Filings
* Editor:   Illia Kurantsev (expresswebd3v@gmail.com)
* License:  Proprietary License
* */


import React, {FC, useEffect, useState} from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Autocomplete, InputAdornment, TextField} from "@mui/material";
import {SearchOutlined} from "@mui/icons-material";
import {fileApi, filingsApi, searchApi} from "@/api";
import {useDispatch} from "react-redux";
import {
    allFilesLoadedAction, changeFileAction, changeFilingAction,
    changeFilingsAction, fileLoadedAction, fileLoadingAction,
    filesLoadingAction,
    selectBusinessAction
} from "@/store/files/filese.action";
import filingList from "@/utils/json/filings-list.json";


const AppHeader: FC = () => {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [keyword, setKeyword] = useState("");

    const dispatch = useDispatch();

    const searchHandle = async (k: string) => {
        try {
            const {data} = await searchApi(k)
            setResult(data);
        } catch (e) {
            console.warn(e);
        }
        setLoading(false)
    }

    const changeHandle = (e: any, v: any) => {
        setKeyword(v);
    };


    const selectHandle = async (e: any, v: any) => {
        dispatch(filesLoadingAction())

        const payload = {
            ticker: v?.ticker || "",
            formType: filingList,
            page: 1,
            size: 10
        }

        try {
            const {data} = await filingsApi(payload);
            selectFileHandle(data.data?.[0])
            dispatch(changeFilingsAction(data))
        } catch (e) {
            console.warn("Error in getFilingsHandler", e);
        }

        dispatch(allFilesLoadedAction())
        dispatch(selectBusinessAction(v))
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
        setLoading(true);
        let timer = setTimeout(() => {
            if (keyword.length > 0) {
                searchHandle(keyword)
            }
        }, 1500)

        return () => clearTimeout(timer)
    }, [keyword]);


    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar elevation={0} position="static">
                <Toolbar sx={{alignItems: "center"}}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{display: {xs: 'none', sm: 'block'}}}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            style={{
                                objectFit: "contain",
                                marginTop: 8
                            }}
                            src="/logo.png"
                            alt="SmartFilings Logo"
                            width={250}
                            height={40}/>
                    </Typography>
                    <Autocomplete
                        open={open}
                        onOpen={() => {
                            setOpen(true);
                        }}
                        onClose={() => {
                            setOpen(false);
                        }}
                        autoHighlight={true}
                        onInputChange={changeHandle}
                        onChange={selectHandle}
                        getOptionLabel={(option: any) => `${option.name} (${option.ticker})`}
                        getOptionKey={(option: any) => option.id}
                        loading={loading}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                InputProps={{
                                    ...params.InputProps,
                                    sx: {
                                        width: 500,
                                        backgroundColor: "#ffffff1f",
                                        "& fieldset": {border: 'none'},
                                    },
                                    style: {
                                        paddingLeft: 20,
                                        borderRadius: "0",
                                        border: "1px solid #fff"
                                    },
                                    placeholder: "Search Companies, People, Funds, and More...",
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchOutlined/>
                                        </InputAdornment>
                                    )
                                }}
                                size="small"/>
                        )}
                        options={result}/>
                    <Box sx={{flexGrow: 1}}/>
                    <Box sx={{display: {xs: 'none', md: 'flex'}}}>

                    </Box>
                    <Box sx={{display: {xs: 'flex', md: 'none'}}}>

                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default AppHeader