import {createStyles} from "@mantine/core"

const Product=()=>{
    const {classes}= useStyles();
    return(
        <div className={classes.product_container}>
        <p>Create Product</p>
        
        </div>
    )
}

export default Product;

const useStyles= createStyles(()=>{
    return{
        product_container:{
            display:"flex",
            justifyContent:"center",
            marginTop:"3rem"
        }
    }
})
