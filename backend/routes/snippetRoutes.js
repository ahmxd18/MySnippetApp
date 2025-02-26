import express from "express"

import {
  createSnippet,
  getSnippets,
  getOneSnippet,
  deleteSnippet,
  updateSnippet,
  addSnippetToCollection,
} from "../controllers/snippetController.js"

const router = express.Router()

router.post("/createSnippet", createSnippet)
router.post("/getSnippets", getSnippets)
router.post("/getOneSnippet", getOneSnippet)
router.post("/deleteSnippet", deleteSnippet)

router.put("/updateSnippet/:id", updateSnippet)

router.post("/addSnippetToCollection", addSnippetToCollection)

export default router
