import {Fragment, ReactNode, useEffect, useRef} from 'react';
import Modal from "../UI/Modal";
import classes from "./WishlistModal.module.css";
import {uiActions} from "../store/ui-slice";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import wishlistSlice, {wishlistActions} from "../store/wishlist-slice";

const WishlistModal = () => {
    const dispatch = useAppDispatch();

    const wishlistData = useAppSelector((state) => state.wishlist);
    const { wishlistIsVisible } = useAppSelector((state) => state.ui);
    const focusRef = useRef<HTMLDivElement>(null);

    const toggleWishlistHandler = () => {
        dispatch(uiActions.toggleWishlist());
    };

    const removeItemWishlistHandler = (itemId: number) => {
        dispatch(wishlistActions.removeProductFromWishlist(itemId));
    };

    useEffect(() => {
        if (wishlistIsVisible && focusRef.current) {
            focusRef.current.focus(); // Set focus on the element when the modal opens
        }
    }, [wishlistIsVisible]);

    return (
        <Modal>
            <div className={classes.header}>
                <div>
                    <h1 ref={focusRef} tabIndex={-1}>Your Wishlist</h1>
                    <span>({wishlistData.totalItemsQuantity})</span>
                </div>

                <button aria-label={'Close'} className={'btn-transparent'} onClick={toggleWishlistHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                         className="feather feather-x-circle" aria-hidden={true}>
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                </button>
            </div>
            <div>
                {wishlistData.items.length === 0 ? (
                    <p>No items in wishlist</p>
                ) : (
                <ul className={classes.wishlist}>
                    {wishlistData.items.map(item =>
                        <li key={item.id}>
                            <img src={item.image} alt=""/>
                            <div className={classes.productContainer}>
                                <div className={classes.productInformation}>
                                    <span>{item.title}</span>
                                    <span>Price: <strong>{item.price.toFixed(2)}€</strong></span>
                                </div>
                                <div className={classes.productActions}>
                                    <button className={'btn-primary'} onClick={()=> removeItemWishlistHandler(item.id)}>
                                        Remove
                                    </button>
                                    <button className={'btn-primary'}>
                                        Add
                                    </button>
                                </div>
                            </div>
                        </li>
                    )}

                </ul> ) }
            </div>
            {/*<p className={classes.totalPrice}>Total price: <strong>{wishlistData.totalItemsQuantity}</strong></p>
            <div className={classes.footer}>
                <button className={'btn-primary'}>Clear cart</button>
            </div>*/}
        </Modal>
    );
};

export default WishlistModal;
