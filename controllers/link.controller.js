import { nanoid } from "nanoid";
import { Link } from "../models/Link.js";

export const getLinks = async (req, res) => {
  try {
    const links = await Link.find({ uid: req.uid });
    return res.json({ links });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

export const createLink = async (req, res) => {
  try {
    const { longLink } = req.body;
    const link = new Link({ longLink, nanoLink: nanoid(6), uid: req.uid });
    const newLink = await link.save();
    return res.json(newLink);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

export const getSingleLink = async (req, res) => {
  try {
    const { id } = req.params;
    const link = await Link.findById(id);
    if (!link) return res.status(400).json({ error: "no existe el link " });
    if (!link.uid.equals(req.uid))
      return res.status(404).json({ error: "link no le pertenece" });
    return res.json({ link });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};


export const removeLink = async (req, res) => {
  try {
    const { id } = req.params;
    const link = await Link.findById(id);
    if (!link) return res.status(400).json({ error: "no existe el link " });
    if (!link.uid.equals(req.uid))
      return res.status(404).json({ error: "link no le pertenece" });
      await link.remove()
    return res.json({ link: "link eliminado" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};


export const updateLink = async (req, res) => {
  try {
    const { id } = req.params;
    const {longLink} = req.body
    const link = await Link.findById(id);
    if (!link) return res.status(400).json({ error: "no existe el link " });
    if (!link.uid.equals(req.uid))
      return res.status(404).json({ error: "link no le pertenece" });
      link.longLink= longLink
      await link.save()
    return res.json({ link });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};
