import React from "react";
import { Link } from "react-router-dom";
import { createStyles } from "@mantine/core";
import ProductList from "../product/ProductList";

const Home: React.FC = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.homeContainer}>
      <p>This is a Home page</p>
      <Link to="/product">Product</Link>
      <ProductList /> 
    </div>
  );
};

export default Home;

const useStyles = createStyles(() => {
  return {
    homeContainer: {
      marginTop: "3rem",
      textAlign: "center",
    },
  };
});
