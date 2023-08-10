import express from "express";
import USER from "../models/model.js";
const router = express.Router()



//APIs

//--- GET 1 record ---
router.get("/user/:userId", (req, res) => {
    const userId = req.params.userId;

    USER.findById(userId)
        .then(user => {
            if (user) {
                res.status(200).json(user);
                
            } else {
                res.status(404).json();
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json();
        });
});

//--- GET all records ---
router.get("/user", (req, res) => {
    USER.find()
        .then(users => {
            if (users.length > 0) {
                res.status(200).json(users);
                
            } else {
                res.status(404).json();
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json();
        });
});

//--- POST ---
router.post("/user",(req,res)=>{

    const {name,age,height} = req.body;

    const user = new USER({
        name,
        age,
        height
    })

    user.save()
    .then(user => {res.status(201).json()})
    .catch(err => {console.log(err);
                    res.status(500).json();})

})


//--- PUT ---
router.put("/user/:userId", (req, res) => {
    const userId = req.params.userId;
    const { name, age, height } = req.body;

    USER.findByIdAndUpdate(userId, { name, age, height }, { new: true })
        .then(updatedUser => {
            if (updatedUser) {
                res.status(200).json();
            } else {
                res.status(404).json();
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json();
        });
});

//--- DELETE ---
router.delete("/user/:userId", (req, res) => {
    const userId = req.params.userId;

    USER.findByIdAndDelete(userId)
        .then(deletedUser => {
            if (deletedUser) {
                res.status(204).json();
            } else {
                res.status(404).json();
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json();
        });
});


export default router;