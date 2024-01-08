import {ReactNode, useEffect, useState} from "react";
import classes from "./Products.module.css"
import ProductItem from "./ProductItem";
import {Product} from "../../models/Product";
import loading from "../UI/Loading";
import Loading from "../UI/Loading";
import Errors from "./Errors";
import {useAppSelector} from "../store/hooks";

const DUMMY = [
    {
        "id": 1,
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        "rating": {
            "rate": 3.9,
            "count": 120
        }
    },
    {
        "id": 2,
        "title": "Mens Casual Premium Slim Fit T-Shirts ",
        "price": 22.3,
        "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        "rating": {
            "rate": 4.1,
            "count": 259
        }
    },
    {
        "id": 3,
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        "rating": {
            "rate": 3.9,
            "count": 120
        }
    },
    {
        "id": 4,
        "title": "Mens Casual Premium Slim Fit T-Shirts ",
        "price": 22.3,
        "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        "rating": {
            "rate": 4.1,
            "count": 259
        }
    },
    {
        "id": 5,
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        "rating": {
            "rate": 3.9,
            "count": 120
        }
    },
    {
        "id": 62,
        "title": "Mens Casual Premium Slim Fit T-Shirts ",
        "price": 22.3,
        "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        "rating": {
            "rate": 4.1,
            "count": 259
        }
    }];
const Products = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [errorStatus, setError] = useState({message: ''});
    const [isLoading, setIsLoading] = useState(false);
    const wishlistItems = useAppSelector((state) => state.wishlist.items);


    useEffect(() => {
        async function fetchProducts() {
            setIsLoading(true);
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const responseData: Product[] = await response.json();

                setProducts(responseData)
            } catch (err: any) {
                setError({message: err.message || "Could not fetch the products"})
            } finally {
                setIsLoading(false);
            }
        }

        fetchProducts();
    }, [])

    if (errorStatus && errorStatus.message) {
        console.log(errorStatus)
        console.log(errorStatus.message)
        return <Errors message={errorStatus.message}></Errors>
    }

    return <section className={classes.products}>
        <h2>Products</h2>
        {isLoading && <Loading/>}
        {!errorStatus && <Loading/>}
        {!isLoading &&
            <ul role={"list"}>
                {products.map((item) => {
                    const isInWishlist = wishlistItems.some((wItem) => wItem.id === item.id);
                      return <ProductItem
                            key={item.id}
                            id={item.id}
                            price={item.price}
                            title={item.title}
                            image={item.image}
                            isWishlisted={isInWishlist}
                        />
                    }
                )}

            </ul>}


    </section>;


};

export default Products;


