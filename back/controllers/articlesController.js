import Article from "../models/articleModel.js"

export const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find()

        res.status(200).json(articles)

    } catch (error) {
        
        res.status(500).json({message: "Impossible de récupérer les articles"})
    }
}

export const getOneArticle = async (req, res) => {
    try {
        // Permet de récupérer le paramètre dynamique de l'URL
        const {id} = req.params

        const article = await Article.findById(id);

        // S'il n'y a pas d'article
        if(!article){
            return res.status(404).json({message:"Article non trouvé"})
        }

        res.status(200).json(article)

    } catch (error) {
        res.status(400).json({message: "Une erreur est survenue lors de la récupération de l'article"})
    }
}

export const addArticle =  async (req, res) => {
try {

    const {title, description, author} = req.body
    // Si l'utilisateur remplit
    if(title.trim() === "" || description.trim() === "" ||  author.trim() === ""){
        return res.status(401).json({message: "Veuillez remplir tous les champs"})
    }

    // S'il n'y a pas d'image
    let article;
    console.log(req.file)
    if(!req.file){
        article = new Article({
            title: title,
            description: description,
            author: author, 
            image: {
                src: "",
                alt: ""
            }
        })
    }else{
        article = new Article({
        title: title,
        description: description,
        author: author,
        image: {
            src: req.file.filename, // => 1558414-chat.jpg
            alt: req.file.originalname // chat.jpg
        }
    })
    }

    await article.save(); //  Je sauvegarde dans la BDD;
    
    res.status(200).json({message: "Article bien créé!"})

} catch (error) {
    res.status(500).json({message: "Impossible de créer un article"})
}

}

export const addComment = async (req, res) => {
    try {
        // Je récupère l'ID de l'article sur lequel je veux ajouter un commentaire.
        const {articleId} = req.params

        const {pseudo, rating, content} = req.body
        if(
        pseudo.trim() === "" ||
        rating < 0 ||
        rating > 5 ||
        content.trim() === ""
        ){
            return res.status(401).json({message: "Veuillez remplir tous les champs"})
        }
        const comment = {
            pseudo,
            rating,
            content,
            date: new Date() // Permet d'avoir la date actuelle du serveur
        }
        await Article.updateOne({_id: articleId}, {$push: {"comments": comment}})

        // $addToSet permet également d'ajouter un élément dans un tableau 
        // mais on ne peut pas écrire de DOUBLON
        res.status(200).json({message: "Le commentaire a bien été ajouté"})
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Impossible d'ajouter ce commentaire", error})
    }
}
