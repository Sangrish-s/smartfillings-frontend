/*
* Author:   Smart Filings
* Editor:   Illia Kurantsev (expresswebd3v@gmail.com)
* License:  Proprietary License
* */

import React, {FC, useEffect} from 'react';
import {
    Box,
    Button, Checkbox, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select,
    Stack
} from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";
import categoriesJson from "@/utils/json/categories.json";
import ownershipFilings from "@/utils/json/ownershipFilings.json";
import {FilingCategoryType} from "@/utils/type/filings.type";
import {CheckOutlined, CloseOutlined} from "@mui/icons-material";
import {filingsApi} from "@/api";
import {useDispatch, useSelector} from "react-redux";
import {
    allFilesLoadedAction,
    changeFilingsAction,
    changeFilingTypesAction,
    filesLoadingAction,
} from "@/store/files/filese.action";


const AppFilter: FC = () => {
    const files = useSelector((state: any) => state.file)
    const selectedFilingTypes = files?.filingTypes;

    const dispatch = useDispatch();

    const [categories] = React.useState<FilingCategoryType[]>(categoriesJson || []);
    const [selectedCategory, setSelectedCategory] = React.useState('999');
    const [ownershipOption, setOwnershipOption] = React.useState<string|undefined>();

    const changeCategoryHandle = (event: any) => {
        setOwnershipOption(undefined);
        setSelectedCategory(event.target.value);
        dispatch(changeFilingTypesAction(categories.find((i) => i.id === event.target.value)?.data || []))
    }

    const selectAllHandle = () => {
        dispatch(changeFilingTypesAction(categories.find((i) => i.id === selectedCategory)?.data || []))
    }

    const removeAllHandle = () => {
        dispatch(changeFilingTypesAction([]))
    }

    const getFilingsHandler = async () => {
        dispatch(filesLoadingAction())
        const payload = {
            ticker: files.company?.ticker || "",
            formType: files.filingTypes,
            page: 1,
            size: 10
        }

        try {
            const {data} = await filingsApi(payload);
            dispatch(changeFilingsAction(data))
        } catch (e) {
            console.warn("Error in getFilingsHandler", e);
        }

        dispatch(allFilesLoadedAction())
    }

    const ownershipChangeHandle = (event: any, value: string) => {
        setOwnershipOption(value);
    }
    
    useEffect(()=>{
        if (ownershipOption === "exclude") {
            dispatch(changeFilingTypesAction(selectedFilingTypes?.filter((i: string) => !ownershipFilings.includes(i))))
        } else if (ownershipOption === "include") {
            dispatch(changeFilingTypesAction([...selectedFilingTypes, ...ownershipFilings]))
        } else if (ownershipOption === "only") {
            dispatch(changeFilingTypesAction([...ownershipFilings]))
        }
    },[ownershipOption])

    useEffect(()=>{
        setOwnershipOption("include")
    },[])

    return (
        <Box>
            <Stack
                sx={{position: "relative"}}
                spacing={2}>
                <FormControl fullWidth>
                    <InputLabel id="category-select">Filing Types</InputLabel>
                    <Select
                        value={selectedCategory}
                        onChange={changeCategoryHandle}
                        labelId="category-select"
                        id="dcategory-select-input"
                        label="Filing Types">
                        {
                            categoriesJson.map((category, index) => (
                                <MenuItem key={`category-${index}`} value={category.id}>
                                    {category.val}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>

                <Stack
                    sx={{
                        zIndex: 1,
                        top: 50,
                        right: 0,
                        width: "100%",
                    }}
                    justifyContent="flex-end"
                    spacing={2}
                    direction="row">
                    <Button
                        onClick={removeAllHandle}
                        startIcon={<CloseOutlined/>}
                        variant="outlined"
                        color="error"
                        size="small">
                        Clear All
                    </Button>
                    <Button
                        onClick={selectAllHandle}
                        startIcon={<CheckOutlined/>}
                        variant="outlined"
                        color="secondary"
                        size="small">
                        Select All
                    </Button>
                </Stack>

                <Box
                    sx={{
                        height: "calc(100vh - 460px)",
                        px: 2,
                        pt: 2,
                        pb: 2,
                        position: "relative",
                        overflowY: "auto",
                        background: "#f0f0f009",
                        "::-webkit-scrollbar": {
                            width: "8px"
                        },
                        "::-webkit-scrollbar-track": {
                            background: "#606060"
                        },
                        "::-webkit-scrollbar-thumb": {
                            background: "#000080"
                        },
                        "::-webkit-scrollbar-thumb:hover": {
                            background: "#0000c0"
                        },
                    }}>

                    <Grid container spacing={2}>
                        {
                            categories
                                .find((i) => i.id === selectedCategory)
                                ?.data?.map((filingType, index) => (
                                <Grid key={`category-${index}`} xs={12} xl={4} lg={6} sm={12}>
                                    <FormControlLabel
                                        onChange={(event, checked) => {
                                            const updatedArr: string[] = checked ?
                                                [...selectedFilingTypes, filingType] :
                                                selectedFilingTypes.filter((i: string) => i !== filingType)
                                                    dispatch(changeFilingTypesAction(
                                                        updatedArr
                                                    ))
                                        }}
                                        checked={selectedFilingTypes?.includes(filingType)}
                                        value="end"
                                        control={<Checkbox/>}
                                        label={filingType}
                                        labelPlacement="end"
                                    />
                                </Grid>
                            ))
                        }
                    </Grid>
                </Box>

                <Stack direction="row">
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Ownership?</FormLabel>
                        <RadioGroup
                            defaultValue="include"
                            onChange={ownershipChangeHandle}
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group">
                            <FormControlLabel checked={ownershipOption === "include"} value="include" control={<Radio/>} label="Include"/>
                            <FormControlLabel checked={ownershipOption === "exclude"} value="exclude" control={<Radio/>} label="Exclude"/>
                            <FormControlLabel checked={ownershipOption === "only"} value="only" control={<Radio/>} label="Only"/>
                        </RadioGroup>
                    </FormControl>
                </Stack>

                <Button
                    onClick={getFilingsHandler}
                    disabled={selectedFilingTypes.length < 1}
                    variant="contained"
                    color="info"
                    size="large"
                    fullWidth>
                    Get Filings ({selectedFilingTypes.length} selected)
                </Button>
            </Stack>
        </Box>
    );
};

export default AppFilter;