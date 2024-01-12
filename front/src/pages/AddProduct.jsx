import axios from "axios";
import { useState } from "react";
import { token } from "../context/token";

const AddProduct = () => {

    const [inputs, setInputs] = useState({
        name: "",
        ref: "",
        color: "",
        category: "",
        quantity: 0,
        price: 0,
        image: null

    })
    const [err, setErr] = useState();
    const [message, setMessage] = useState(); 

    const handleChange = (e) => {

        const {name, value, files} = e.target

        if(name === "image"){
            setInputs({...inputs, image: files[0]})
        }else {
            setInputs({...inputs, [name]: value})
        }
    
        setErr("")
        setMessage("")
        
    }

    const handleSubmit = (e) => {
        e.preventDefault(); 
        // On va vérifier que les champs ne sont pas vides et que les quantités et les prix ne sont pas inférieur
        // ou égal à 0
        if (inputs.name.trim() === "" ||
        inputs.ref.trim() === "" ||
        inputs.quantity <= 0 ||
        inputs.color.trim() === "" ||
        inputs.price <= 0 ||
        inputs.category.trim() === "" 
        ){
            return setErr("Veuillez remplir tous les champs !")
        }

        const formData = new FormData();

        formData.append("name", inputs.name);
        formData.append("ref", inputs.ref);
        formData.append("quantity", inputs.quantity);
        formData.append("color", inputs.color);
        formData.append("price", inputs.price);
        formData.append("image", inputs.image);
        formData.append("category", inputs.category);

        axios.post("http://localhost:9000/products/new", formData, {headers: token()})
        .then((res) => {
            setInputs({...inputs, name: "", ref: "", quantity: "", color: "", price: "", category: ""})
            setMessage(res.data.message)
        })
        .catch((err) => {
            console.log(err)
        })

    }

    return (
        <main>
            {
                message && (
                    <span>{message}</span>
                )
            }
            <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label htmlFor="name" />
            <input onChange={handleChange} type="text" value={inputs.name} id="name" name="name" placeholder="Nom du produit"/>
            <label htmlFor="ref" />
            <input onChange={handleChange} type="text"  value={inputs.ref} id="ref"name="ref" placeholder="Référence du produit"/>
            <label htmlFor="color" />
            <input onChange={handleChange} type="text"  value={inputs.color} id="color" name="color" placeholder="Couleur"/>
            <label htmlFor="quantity" />
            <input onChange={handleChange} type="number"  value={inputs.quantity} id="quantity" name="quantity" placeholder="Quantité"/>
            <label htmlFor="price" />
            <input onChange={handleChange} type="number"  value={inputs.price} id="price" name="price" placeholder="Prix"/>
            <label htmlFor="category" />
            <input onChange={handleChange} type="text"  value={inputs.category} id="category" name="category" placeholder="Catégorie"/>
            <input onChange={handleChange} type="file" name="image"/>
            <button>Envoyer</button>
            </form>
            { err && (
                <span>{err}</span>
            ) }
            
        </main>
    );
};

export default AddProduct;