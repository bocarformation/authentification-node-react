import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";


const Articles = () => {

    const [articles, setArticles] = useState([]); // DOM VIRTUEL
    
    useEffect( ()=>{
         axios.get("http://localhost:9000/articles")
        .then((res) => {
            console.log(res);
            setArticles(res.data)
        })
        .catch((res) => {
            console.log(res)
           
        })

        
    },[])

    return (
        <main>
            <section>
                {articles.map((oneArticle, i) => (
                    <>
                    <article key={i}>
                    <NavLink to={`/article/${oneArticle._id}`}>{oneArticle.title}</NavLink>
                    <p>{oneArticle.description}</p>
                    <p>{oneArticle.author}</p>
                    <img style={{width: "200px"}} src={`http://localhost:9000/assets/img/${oneArticle.image.src}`} alt={oneArticle.image.alt}/>
                    <span>Article créé le : {new Date(oneArticle.createdAt).toLocaleDateString()}</span>
                    
                    </article>
                    </>
                ))}
            </section>
        </main>
    );
};

export default Articles;