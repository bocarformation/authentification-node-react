import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get("http://localhost:9000/products")
            .then((res) => {
                setProducts(res.data)
            })
            .catch((res) => {
                console.log(res)
            })
    }, [])


    return (
        <main>
            <section>
                {products.map((oneProduct) => (
                    <>
                        <article key={oneProduct._id}>
                           {oneProduct.image  && (
                             <img src={`http://localhost:9000/assets/img/${oneProduct.image.src}`} alt={oneProduct.image.alt} />
                           )}
                            <h2><NavLink to={`/produit/${oneProduct._id}`}>Nom du produit: {oneProduct.name}</NavLink> </h2>
                            <p>Référence: {oneProduct.ref}</p>
                            <p>Prix: {oneProduct.price.toFixed(2)}€</p>
                            <p>Quantité: {oneProduct.quantity}</p>
                            <p>Couleur: {oneProduct.color}</p>
                            <p>Catégorie: {oneProduct.category}</p>
                        </article>
                    </>
                ))}
            </section>
        </main>
    );
};

export default Products;