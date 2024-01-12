import Product from "../models/productModel.js"

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json(products)
        
    } catch (error) {
        res.status(400).json({message: "Impossible de récupérer les produits !"})
    }

}

export const getOneProduct = async (req, res) => {
    try {

        const {id} = req.params

        const product = await Product.findById(id) 

        if(!product){
            return res.status(404).json({message:"Produit non trouvé"})
        }

        res.status(200).json(product)
        
    } catch (error) {
        res.status(500).json({message: "Impossible de récupérer le produit"})
    }
}

export const addProduct = async (req, res) => {
    try {
        const {name, ref, color, quantity, category, price} = req.body
        
        if(
        name.trim() === "" 
        || ref.trim() === "" 
        || color.trim() === "" 
        || quantity <= 0 
        || category.trim() === "" 
        || price <= 0 ){
            return res.status(401).json({message: "Veuillez remplir tous les champs"})
        }

        let product; 
        // S'il n'y a pas d'images
        if(!req.file){
            product = new Product({
                name: name,
                ref: ref,
                category: category,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                color: color,

            })
        }else {
            product = new Product({
                name: name,
                ref: ref,
                category: category,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                color: color,
                image: {
                    src: req.file.filename,
                    alt: req.file.originalname
                }
            })
        }
        

        await product.save();

        res.status(200).json({message: "Votre produit a bien été ajouté"})

    } catch (error) {
        res.status(400).json({message: "Impossible d'ajouter un produit !"})
    }
}


