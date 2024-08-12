import { Button, Typography } from "@mui/material"

interface ListSecondaryProps{
    date: string
}
function CustomButton({children}:{
    children: React.ReactNode
}){
    return(
        <Button variant="outlined" sx={{
            padding: "1px 3px",
            borderRadius: "5px",
            textTransform:"none",
            fontWeight: "normal",
            marginRight: "10px",
        }}>{children}</Button>
    )
}
export default function ListSecondary({date}: ListSecondaryProps){
    return(
        <>
            <CustomButton>View</CustomButton>
            <Typography variant="body2" sx={{
                display: "inline-block", 
                marginRight: "15px",
                marginLeft: "40px"
            }}>{date}</Typography>
            <CustomButton>Summary</CustomButton>
            <CustomButton>Analyze</CustomButton>
        </>
    )
}