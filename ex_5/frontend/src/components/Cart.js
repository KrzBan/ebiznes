
import Product from "./Product";
import Payment from "./Payment";
import {useEffect, useState} from "react";
import Server from "./Server";

export default function Cart() {

    const [products, setProducts] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        Server.FetchProducts()
            .then((products) => {
                setProducts(products);

                const totalPrice = products.reduce((accumulator, product)=> accumulator + product.price, 0);
                setTotalAmount(totalPrice);
            }).catch(err=>{
                console.log(err);
            })
    }, []);

    return (
        <div>
            <p>Products:</p>
            {products.map((product)=>{
                return (<Product key={product} name={product.name} price={product.price}/>)
            })}
            <br/>
            <p>Payment info:</p>
            <Payment amount={totalAmount}/>
        </div>
    );
}