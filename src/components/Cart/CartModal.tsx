import {Fragment, ReactNode, useEffect, useRef} from 'react';
import Modal from "../UI/Modal";
import classes from "./CartModal.module.css";
import classesWishlist from "./../Wishlist/WishlistModal.module.css";
import {uiActions} from "../store/ui-slice";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {wishlistActions} from "../store/wishlist-slice";
import {cartActions} from "../store/cart-slice";
import {Product} from "../../models/Product";
import {useSelector} from "react-redux";

const CartModal = () => {
    const dispatch = useAppDispatch();

    const cartData = useAppSelector((state) => state.cart);
    const { cartIsVisible } = useAppSelector((state) => state.ui);

    const focusRef = useRef<HTMLDivElement>(null); // Create a ref for the element you want to focus on

    useEffect(() => {
        if (cartIsVisible && focusRef.current) {
            focusRef.current.focus(); // Set focus on the element when the modal opens
        }
    }, [cartIsVisible]);
    const toggleCartHandler = () => {
        dispatch(uiActions.toggleCart());
    };

    const removeItemCartHandler = (itemId: number) => {
        dispatch(cartActions.removeItemFromCart(itemId));
    };

    const addItemToCartHandler = ({id, title, price, image}: Product) => {
        dispatch(
            cartActions.addItemToCart({
                id,
                title,
                price,
                image,
                quantity: 1,
                totalItemPrice: price,
            })
        );
    };

    const clearCart = () => {
        dispatch(cartActions.clearCart())

    }
    return (
        <Modal>
            <div className={classesWishlist.header}>
                <div>
                    <h1 ref={focusRef} tabIndex={-1}>Your Cart</h1>
                    <span>({cartData.totalCartQuantity})</span>
                </div>

                <button aria-label={'Close'} className={'btn-transparent'} onClick={toggleCartHandler}>
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
                {cartData.items.length === 0 ? (
                    <p>No items in cart</p>
                ) : (
                    <ul className={classesWishlist.wishlist}>
                        {cartData.items.map((item) => (
                            <li key={item.id}>
                                <img src={item.image} alt="" />
                                <div className={classesWishlist.productContainer}>
                                    <div className={classesWishlist.productInformation}>
                                        <span>{item.title}</span>
                                        <span>Quantity: {item.quantity}</span>
                                        <span>
              Price: <strong>{item.totalItemPrice.toFixed(2)}€</strong>
            </span>
                                    </div>
                                    <div className={classesWishlist.productActions}>
                                        <button className={'btn-primary'} onClick={() => removeItemCartHandler(item.id)}>
                                            -
                                        </button>
                                        <button className={'btn-primary'} onClick={() => addItemToCartHandler(item)}>
                                            +
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

            </div>
            <p className={classesWishlist.totalPrice}>Total price: <strong>{cartData.totalCartPrice.toFixed(2)}€</strong></p>
            <div className={classesWishlist.footer}>
                <button className={'btn-primary'} onClick={clearCart}>Clear cart</button>
            </div>
        </Modal>
    );
};

export default CartModal;
