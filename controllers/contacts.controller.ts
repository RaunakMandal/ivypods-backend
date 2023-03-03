import { Request, Response } from "express";
import { Error } from "mongoose";
import Contact from "../models/contacts.model";

const addContact = async (req: Request, res: Response) => {
    const { fullname, email, phone, message } = req.body;
    if (!fullname || !phone) {
        return res.status(400).json({
            error: true,
            message: "All fields are required",
        });
    }
    const contact = new Contact({
        fullname,
        email,
        phone,
        message,
        owner: req.auth._id,
    });
    await contact
        .save()
        .then((contact) => {
            return res.status(200).json({
                error: false,
                message: "Contact created successfully",
            });
        })
        .catch((err: Error) => {
            return res.status(500).json({
                error: true,
                message: err.message,
            });
        });
}

const updateContact = async (req: Request, res: Response) => {
    const { fullname, email, phone, message } = req.body;

    await Contact.findOneAndUpdate({ _id: req.params.id, owner: req.auth._id }, {
        fullname,
        email,
        phone,
        message,
    }, { new: true })
    .then((contact) => {
        if (!contact) {
            return res.status(404).json({
                error: true,
                message: "Contact not found or user not authorized",
            });
        }
        
        return res.status(200).json({
            error: false,
            message: "Contact updated successfully",
        });
    })
    .catch((err: Error) => {
        return res.status(500).json({
            error: true,
            message: err.message,
        });
    });
};

const getContactsByUser = async (req: Request, res: Response) => {
    const { _id } = req.auth;
    const { per_page, page } = req.query;
    await Contact.find({ owner: _id }).limit(per_page).skip(per_page * (page -1))
        .then((contacts) => {
            return res.status(200).json({
                error: false,
                contacts,
            });
        })
        .catch((err: Error) => {
            return res.status(500).json({
                error: true,
                message: err.message,
            });
        });
}

export { addContact, getContactsByUser, updateContact };