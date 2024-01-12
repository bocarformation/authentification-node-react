import express from 'express';
import { addArticle, addComment, getAllArticles, getOneArticle } from '../controllers/articlesController.js';
import upload from '../middlewares/multer.js';
import { isAuthorized, isLogged } from '../middlewares/auth.js';

const articleRouter = express.Router();


articleRouter.get("/articles", getAllArticles);

articleRouter.get("/articles/:id", getOneArticle)

articleRouter.post("/articles/new",isLogged,isAuthorized(["admin"]), upload.single("image"),addArticle);

articleRouter.put("/articles/:articleId/new-comment", isLogged,addComment)

export default articleRouter;