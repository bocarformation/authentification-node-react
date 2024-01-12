import axios from "axios";
import { useState } from "react";
import { token } from "../context/token";

const AddArticle = () => {
    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        author: "", 
        image: "",
    })
    const [err, setErr] = useState();
    const [message, setMessage] = useState()



    const handleChange = (e) =>{
        const {name, value} = e.target
        if(name === "image"){
            
            setInputs({...inputs, image: e.target.files[0] })
        }else{

            setInputs({...inputs, [name]: value})
        }
        setErr(""); // Pour vider le message d'erreur
        setMessage("");
        // console.log(e.target.files[0])
        // Equivalent:  mais beaucoup plus répétitif, à éviter
        // À condition que les inputs soient du même type et récupère le même type de data

        // if(name === "title"){
        //     setInputs({...inputs, title: value})
        // }else if(name === "description"){
        //     setInputs({...inputs, description: value})
        // }else if(name === "author"){
        //     setInputs({...inputs, author: value})
        // }
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        if(inputs.title.trim() === "" || inputs.description.trim() === "" || inputs.author.trim() === "") {
            return setErr("Veuillez remplir tous les champs !");
        }

        const formData = new FormData(); 

        formData.append("title", inputs.title);
        formData.append("description", inputs.description);
        formData.append("author", inputs.author);
        formData.append("image", inputs.image)
        
        axios.post("http://localhost:9000/articles/new", formData, {headers: token()})
        .then((res) =>{
            setMessage(res.data.message)
            // Pour vider les champs une fois les données envoyées 
            setInputs({...inputs, title: "", description: "", author: "", image: null}) 

        })
        .catch((err) => {  
          setErr(err);
        })
    }
    return (
        <main>
            {message && <span>{message}</span>}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label htmlFor="title" />
            <input onChange={handleChange} value={inputs.title} type="text" id="title"name="title" placeholder="Titre"/>
            <label htmlFor="description" />
            <input onChange={handleChange} value={inputs.description} type="text" id="description"name="description" placeholder="Description"/>
            <label htmlFor="author" />
            <input onChange={handleChange} value={inputs.author} type="text" id="author" name="author" placeholder="Auteur"/>
            <label htmlFor="image" />
            <input onChange={handleChange} type="file" id="image" name="image" />
            <button>Envoyer</button>
            </form>
            {
                err && (
                    <span>{err}</span>
                )
            }
            
        </main>
    );
};

export default AddArticle;