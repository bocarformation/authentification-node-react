import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const OneProduct = () => {
    const [product, setProduct] = useState();
    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:9000/products/${id}`)
        .then((res)=>{
            setProduct(res.data)
        })
        .catch(res => console.log(res.data))
    },[])

    return (
       <main>
        {
            product && (
                <>
                {product.image && (
                <img src={`http://localhost:9000/assets/img/${product.image.src}`} alt={product.image.alt} />
                )}
                <h1>{product.name}</h1>
                <p>Couleur: {product.color}</p>
                <p>Référence: {product.ref}</p>
                <p>Catégorie: {product.category}</p>
                <p>Stock disponible: {product.quantity}</p>
                <p>Prix: {product.price.toFixed(2)} € </p>
                </>
            )
        }
       </main>
    );
};

export default OneProduct;