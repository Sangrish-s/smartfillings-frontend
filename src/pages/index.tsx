/*
* Author:   Smart Filings
* Editor:   Illia Kurantsev (expresswebd3v@gmail.com)
* License:  Proprietary License
* */

import React, {Fragment, useEffect, useState} from 'react';
import {NextPage} from "next";
import {
    Box,
    Divider,
    Stack
} from "@mui/material";
import AppLayout from "@/layouts/app";
import {SeoProps} from "@/utils/type/layout.type";
import Grid from "@mui/system/Unstable_Grid";
import Typography from "@mui/material/Typography";
import AppFilingsList from "@/components/app/filings/list";
import AppFilingViewer from "@/components/app/filings/viewer";
import {ApartmentOutlined} from "@mui/icons-material";
import {BusinessType} from "@/utils/type/business.type";
import {useSelector} from "react-redux";
import AppSettings from "@/components/app/settings";

const AppPage: NextPage = () => {

    const [business, setBusiness] = useState<BusinessType | null>(null);

    const pageSeo: SeoProps = {
        title: "SmartFilings - Your Instant Solution for SEC Filing Analysis",
        ogTitle: "SmartFilings - Your Instant Solution for SEC Filing Analysis",
        description: "Gain instant insights into SEC filings with SmartFilings. Streamline your analysis process and stay ahead of the curve with our intuitive platform.",
        keywords: [
            "SmartFilings",
            "SEC filing analysis",
            "Instant insights",
            "Financial analysis",
            "Regulatory compliance",
            "Reporting efficiency",
            "Data analytics",
            "Securities and Exchange Commission",
            "Filing intelligence",
            "Streamlined process",
        ],
        url: "https://app.smartfilings.com/",
        image: {
            url: "https://www.smartfilings.com/images/cover.jpg",
            width: "1000px",
            height: "667px",
        },
    }

    const selectedBusiness = useSelector((state: any) => state.file.company);

    useEffect(() => {
        setBusiness(selectedBusiness);
    }, [selectedBusiness])


    return (
        <AppLayout
            seo={pageSeo}>
            <Box
                sx={{px: 6, pt: 3}}>
                <Stack
                    justifyContent="space-between"
                    direction="row">
                    <Stack
                        sx={{mb: 1}}
                        alignItems="center"
                        spacing={1}
                        direction="row">
                        <ApartmentOutlined
                            style={{
                                fontSize: 32,
                                color: "#00f0f0"
                            }} />
                        <Typography
                            textTransform="capitalize"
                            color="#00f0f0"
                            variant="h5"
                            component="h2">
                            {
                                business?.name ?
                                    <Fragment>
                                        {business?.name}.
                                        <Typography
                                            fontWeight={600}
                                            color="#a0a0a0"
                                            fontSize={12}>
                                            {business?.exchange}: {business?.ticker}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            CIK: {business?.cik}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            CUSIP: {business?.cusip}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            CATEGORY: {business?.category}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            INDUSTRY: {business?.industry}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            LOCATION: {business?.location}&nbsp;&nbsp;&nbsp;
                                        </Typography>
                                    </Fragment> :
                                    "No Business Selected"
                            }
                        </Typography>
                    </Stack>
                </Stack>
                <Divider
                    orientation="horizontal"
                    flexItem/>
                <Grid
                    sx={{
                        mt: 2,
                        opacity: selectedBusiness ? 1 : .3,
                        pointerEvents: selectedBusiness ? "all" : "none"
                    }}
                    justifyContent="space-between"
                    spacing={3}
                    container>
                    <Grid xs={3.4}>
                        <AppFilingsList/>
                    </Grid>
                    <Divider
                        orientation="vertical"
                        flexItem/>
                    <Grid
                        xs={5.8}>
                        <AppFilingViewer/>
                    </Grid>
                    <Divider
                        orientation="vertical"
                        flexItem/>
                    <Grid xs={2.6}>
                        <AppSettings/>
                    </Grid>
                </Grid>
            </Box>
        </AppLayout>
    );
};

export default AppPage;