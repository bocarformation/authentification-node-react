import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "../components/Comments";
import { useAuth } from "../context/AuthContext";

const OneArticle = () => {
    const [article, setArticle] = useState();
    const { id } = useParams();
    const [comments, setComments] = useState([])
    const auth = useAuth()
    useEffect(() => {
        // const fetchData = async () => {
        //     try {
        //         const data = await  axios.get(`http://localhost:9000/articles/${id}`)
        //      setArticle(data)

        //     } catch (error) {
        //         console.log(error)
        //     }
        // }

        axios.get(`http://localhost:9000/articles/${id}`)
            .then((res) => {
                console.log(res.data);
                setArticle(res.data)
                // setComments(res.data.comments)
            })
            .catch((res) => {
                console.log(res.data)
            })


    }, [comments])

    // Récupérer le commentaire inséré par l'utilisateur dans le composant ENFANTa
    const addComment = (newComment) => {
        setComments([...comments, newComment])
    }
    return (
        <main>
            {article &&
                <>
                    <h1>{article.title}</h1>
                    <em>{article.description}</em>
                    <p>{article.author}</p>
                    <img style={{ width: "200px" }} src={`http://localhost:9000/assets/img/${article.image.src}`} alt={article.image.alt} />

                    {auth.user && (
                        <>
                            <hr />
                            <Comments updateComment={addComment} />    
                            </>
                    )}
                    <hr />

                    {
                        article.comments.map((oneComment, i) => (
                            <>
                                <h2>{oneComment.pseudo}</h2>
                                <p>{oneComment.content}</p>
                                <p>Note: {oneComment.rating}</p>
                                <em>Posté le: {new Date(oneComment.date).toLocaleDateString()}</em>
                            </>
                        ))
                    }


                </>
            }

        </main>
    );
};

export default OneArticle;