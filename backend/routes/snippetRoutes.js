import express from "express"

import {
  createSnippet,
  getSnippets,
  // getOneSnippet,
  // getSnippetDetails,
  deleteSnippet,
  updateSnippet,
  getSnippetUser,
  addSnippetToCollection,
  getPublicSnippets,
  toggleSnippetLike,
} from "../controllers/snippetController.js"

const router = express.Router()

router.post("/createSnippet", createSnippet)
router.post("/getSnippets", getSnippets)
router.post("/deleteSnippet", deleteSnippet)
// router.post("/getOneSnippet", getOneSnippet)
router.get("/getPublicSnippets", getPublicSnippets)
router.get("/snippetUser", getSnippetUser)

router.post("/likeSnippet", toggleSnippetLike)

router.put("/updateSnippet", updateSnippet)

router.post("/addSnippetToCollection", addSnippetToCollection)

export default router
