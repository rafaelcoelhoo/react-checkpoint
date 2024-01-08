import {ReactNode} from "react";
import classes from "./ProductItem.module.css"
import Card from "../UI/Card";
import {Product} from "../../models/Product";
import {useAppDispatch} from "../store/hooks";
import {wishlistActions} from "../store/wishlist-slice";
import {cartActions} from "../store/cart-slice";

const ProductItem = ({id, title, image, price, isWishlisted}: Product) => {
    const dispatch = useAppDispatch();

    const addToWishlistHandler = () => {
        dispatch(
            wishlistActions.addItemToWishlist({
                id,
                title,
                price,
                image,
            })
        );
    };

    const removeFromWishlistHandler = () => {
        dispatch(wishlistActions.removeProductFromWishlist(id));
    };

    const addToCartHandler = () => {
        dispatch(
            cartActions.addItemToCart({
                id,
                title,
                price,
                image,
                quantity: 1,
                totalItemPrice: price
            })
        );
    };
    return <li className={classes.productItem} role={"listitem"}>
        <Card>
            <div className={classes.imgContainer}>
                <img src={image} alt=""/>
            </div>

            <div>
                <p>{title}</p>
                <div className={classes.footer}>
                    <strong>€ {price.toFixed(2)}</strong>
                    <button className={classes.wishlist} aria-label={"Add to wishlist"} aria-pressed={isWishlisted}
                            onClick={
                                isWishlisted ? removeFromWishlistHandler : addToWishlistHandler
                            }
                            type={'button'}>
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                             viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                             strokeLinecap="round" strokeLinejoin="round" className={`${classes.icon} feather feather-heart`}>
                            <path
                                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                </div>

            </div>

        </Card>
        <button className={classes.addToCart} onClick={addToCartHandler} type={'button'}>Add to Cart</button>

    </li>;
};

export default ProductItem;
