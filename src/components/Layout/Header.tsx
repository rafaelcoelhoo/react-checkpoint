import classes from './Header.module.css';
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {uiActions} from "../store/ui-slice";

const Header = () => {
    const dispatch = useAppDispatch();
    const wishlistTotalItems = useAppSelector((state) => state.wishlist.totalItemsQuantity);
    const cartTotalItems = useAppSelector((state) => state.cart.totalCartQuantity);

    const toggleCartHandler = () => {
        console.log('ola')
        dispatch(uiActions.toggleCart());
    };

    const toggleWishlistHandler = () => {
        console.log('ola')
        dispatch(uiActions.toggleWishlist());
    };

    return (
        <header className={classes.header}>
            <h1>React</h1>
            <nav>
                <ul>
                    <li>
                        <button onClick={toggleWishlistHandler}>
                            Wishlist
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round" className="feather feather-heart">
                                <path
                                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                            </svg>
                            {wishlistTotalItems > 0 &&
                            <span className={classes.totalBadge} role={"status"}>
                                {wishlistTotalItems}
                                <span className={'visually-hidden'}>item in wishlist</span>
                            </span>
                            }
                        </button>
                    </li>
                    <li>
                        <button onClick={toggleCartHandler}>
                            Your Cart
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                 viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round" className="feather feather-shopping-cart">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                            {cartTotalItems > 0 &&
                            <span className={classes.totalBadge} role={"status"}>
                                {cartTotalItems}
                                <span className={'visually-hidden'}>item in cart</span>
                            </span>
                            }
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
