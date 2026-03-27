import User from "../models/User.js"

export const getAllUsers = async (req, res) => {
  try {
    const { search } = req.query;

    let filter = { role: { $ne: "admin" } };

    if (search) {
      filter.$or = [
        { username: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ];
    }

    const users = await User.find(filter);

    res.json(users);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET user details
export const getUserById = async (req,res)=>{

  try{

    const user = await User
      .findById(req.params.id)
      .select("-password")

    if(!user){
      return res.status(404).json({message:"User not found"})
    }

    res.json(user)

  }catch(err){

    res.status(500).json({message:"Server error"})

  }

}