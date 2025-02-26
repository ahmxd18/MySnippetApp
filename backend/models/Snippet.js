import mongoose from "mongoose"

const SnippetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [String],
  isPublic: { type: Boolean, default: false },
  likes: { type: Number, default: 0 },
  inCollections: [String],
  language: String,
  createdOn: { type: Date, default: Date.now },
  lastEditedOn: { type: Date, default: Date.now },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
})

const Snippet = mongoose.model("Snippet", SnippetSchema)
export default Snippet
