import User from "../models/userModel.js";


// create api
export const create = async(req,res)=> {
    try{
        const userData = new User(req.body);

        if(!userData){
            return res.status(404).json({msg: "user data not found"});
        }

        const saveData = await userData.save();
        // res.status(200).json(saveData);
        res.status(200).json({ msg: "User created successfully", data: saveData });

    }catch(error){
        res.status(500).json({error: error});
    }
}

// dusri api fetch krne ke liye
export const getAll = async(req,res)=> {
    try{
        const userData = await User.find();
        if(!userData){
            return res.status(404).json({msg: "user data not found"});
        }

        // agar data mil gya to 
        res.status(200).json(userData);

    }catch(error){
        res.status(500).json({error: error});
    }
}

export const getOne = async(req,res) => {
    try{

        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({msg: "user not found"})
        }
        res.status(200).json(userExist);

    }catch(error){
        res.status(500).json({error: error});
    }
}

// upgrade api : through id
export const update = async(req,res) => {
    try{

        const id = req.params.id;
        const userExist = await User.findById(id);

        if(!userExist){
            return res.status(401).json({msg: "user not found"});
        }

        const updatedData = await User.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json({msg: "user updated successfully!"});

    }catch(error){
        res.status(500).json({error: error});
    }
}

// last api : delete
export const deleteUser = async(req,res) => {
    try{

        const id = req.params.id;
        // check kr rhe h jo delete kr rhe h vo exist kr bhi rha h ya nhi 
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({msg: "user not exist"});
        }

        
        await User.findByIdAndDelete(id);
        res.status(200).json({msg: "user deleted successfully"});

    }catch{
        res.status(500).json({error: error});
    }
}