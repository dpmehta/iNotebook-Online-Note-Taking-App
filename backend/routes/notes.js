const express = require("express");
const fetchuser = require("../middleware/fetchUser");
const Note = require("../models/Note");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// fetching all notes using "/fetchallnotes"

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Note.find({ user: req.user.id });

  res.json(notes);
});

//routes to add notes POST method with "/addnote"

router.post(
  "/addnote",
  fetchuser,
  [
    check("title").isLength({ min: 3 }),
    check("description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      //handling validation errors
      const result = validationResult(req);

      if (!result.isEmpty()) {
        res.json(result);
      }

      //adding new note

      const note = new Note({ title, description, tag, user: req.user.id });

      const savedNote = await note.save();

      res.send(savedNote);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        sucess: false,
        message: " error in adding note ",
        error,
      });
    }
  }
);

//creating route for updating note PUT method with "/updatenote/:id"

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //create new note
    const newNote = {};

    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).send(" note doesnt exist");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("unauthorized access");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json({ note });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: " error in updating note ",
      error,
    });
  }
});

//creating routefor deleting note

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //find note to be deleted and delete it
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).send(" note doesnt exist");
    }

    //allow only user whose note it is

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("unauthorized access");
    }

    note = await Note.findByIdAndDelete(req.params.id);

    res.status(200).send({ message: "Note deleted successfully ", note: note });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: " error in deleting note ",
      error,
    });
  }
});

module.exports = router;
