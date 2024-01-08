import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from 'react-redux';
import {useAppSelector} from "./components/store/hooks";
import CartModal from "./components/Cart/CartModal";
import WishlistModal from "./components/Wishlist/WishlistModal";
import {wishlistActions} from "./components/store/wishlist-slice";
import {cartActions} from "./components/store/cart-slice";


function App() {
    const dispatch = useDispatch();

    const cartIsVisible: boolean = useAppSelector(
        (state) => state.ui.cartIsVisible
    );

    const wishlistIsVisible: boolean = useAppSelector(
        (state) => state.ui.wishlistIsVisible
    );

    console.log(cartIsVisible, wishlistIsVisible)

    useEffect(() => {
        const getLocalStorageData = () => {
            dispatch(cartActions.initializeCartFromLocalStorage());
            dispatch(wishlistActions.initializeWishlistFromLocalStorage());
        };
        getLocalStorageData();
    }, []);

  return (
      <Layout>
          {cartIsVisible && <CartModal />}
          {wishlistIsVisible && <WishlistModal />}
        <Products />
      </Layout>
  );
}

export default App;
