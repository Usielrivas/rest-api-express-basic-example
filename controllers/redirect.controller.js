import { Link } from "../models/Link.js";

export const redirect= async (req,res)=>{
  try {
    const { nanolink } = req.params;
    const link = await Link.findOne({nanolink})
    if (!link) return res.status(400).json({ error: "no existe el link " });
    // return res.json({ longLink: link.longLink }); para redirect desde el frontend
      return res.redirect(link.longLink) // redirect desde backend
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
}
