import React, {FC} from 'react';
import {
    Box,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    MenuItem,
    Paper,
    Select, Slider,
    Stack,
    TextField
} from "@mui/material";
import Typography from "@mui/material/Typography";
import {CheckBox} from "@mui/icons-material";

const AppSettings: FC = () => {
    return (
        <Box sx={{
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
            height: "calc(100vh - 200px)", overflowY: "auto", pr: 1}}>
            <Stack spacing={4}>
                <Paper sx={{p: 3}}>
                    <Stack spacing={3}>
                        <Typography
                            textAlign="center"
                            variant="h6" component="h6">
                            Configuration Panel
                        </Typography>

                        <FormControl>
                            <FormLabel>
                                Embedding Model:
                            </FormLabel>
                            <Select
                                defaultValue="bert"
                                size="small">
                                <MenuItem value="bert">BERT</MenuItem>
                                <MenuItem value="gpt3">GPT 3</MenuItem>
                                <MenuItem value="gpt3">XLNet</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel>
                                Embedding Size:
                            </FormLabel>
                            <TextField
                                type="number"
                                defaultValue={300}
                                size="small"/>
                        </FormControl>

                        <FormControl>
                            <FormLabel>
                                Embedding Layer:
                            </FormLabel>
                            <TextField
                                type="number"
                                defaultValue={6}
                                size="small"/>
                        </FormControl>

                        <FormControlLabel control={<CheckBox sx={{mr: 1}}/>} label="Fine-tuning"/>

                        <Divider>
                            <Typography variant="body2">
                                Sentence Compression with Transformer Models
                            </Typography>
                        </Divider>



                        <FormControl>
                            <FormLabel>
                                Compression Model:
                            </FormLabel>
                            <Select
                                defaultValue="bert"
                                size="small">
                                <MenuItem value="bert">BERT</MenuItem>
                                <MenuItem value="gpt3">GPT 3</MenuItem>
                                <MenuItem value="gpt3">XLNet</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel>
                                Compression Ratio:
                            </FormLabel>
                            <Box sx={{px: 1.5, py: 1}}>
                                <Slider/>
                            </Box>
                        </FormControl>

                        <FormControl>
                            <FormLabel>
                                Compression Strategy:
                            </FormLabel>
                            <TextField
                                multiline
                                rows={3}
                                type="number"
                                defaultValue={300}
                                size="small"/>
                        </FormControl>

                        <Divider>
                            <Typography variant="body2">
                                Graph Neural Networks for Text Classification
                            </Typography>
                        </Divider>



                        <FormControl>
                            <FormLabel>
                                Graph Convolution Layers:
                            </FormLabel>
                            <TextField
                                type="number"
                                defaultValue={3}
                                size="small"/>
                        </FormControl>

                        <FormControl>
                            <FormLabel>
                                Graph Pooling Method:
                            </FormLabel>
                            <Select
                                defaultValue="maxpooling"
                                size="small">
                                <MenuItem value="maxpooling">Max Pooling</MenuItem>
                                <MenuItem value="averagepooling">Average Pooling</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel>
                                Graph Activation Function:
                            </FormLabel>
                            <Select
                                defaultValue="relu"
                                size="small">
                                <MenuItem value="relu">ReLU</MenuItem>
                                <MenuItem value="leaky">Leaky ReLU</MenuItem>
                                <MenuItem value="elu">ELU</MenuItem>
                            </Select>
                        </FormControl>

                        <Divider>
                            <Typography variant="body2">
                                Latent Dirichlet Allocation for Topic Modeling
                            </Typography>
                        </Divider>

                        <FormControl>
                            <FormLabel>
                                Number of Topics:
                            </FormLabel>
                            <TextField
                                type="number"
                                defaultValue={20}
                                size="small"/>
                        </FormControl>

                        <FormControl>
                            <FormLabel>
                                Topic Keywords:
                            </FormLabel>
                            <TextField
                                defaultValue={20}
                                size="small"/>
                        </FormControl>

                        <FormControl>
                            <FormLabel>
                                Topic Threshold:
                            </FormLabel>
                            <Box sx={{px: 1.5, py: 1}}>
                                <Slider/>
                            </Box>
                        </FormControl>
                    </Stack>
                </Paper>
            </Stack>
        </Box>
    );
};

export default AppSettings;