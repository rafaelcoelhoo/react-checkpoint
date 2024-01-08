import {ReactNode} from "react";
import classes from "./ProductItem.module.css"
import Card from "../UI/Card";
import {Product} from "../../models/Product";

const Errors = ({message}: {message: string}) => {
    return <div>
        <p>An error occurred!</p>
        <p>{message} please try again later.</p>
    </div>;
};

export default Errors;
