import User from "../models/User.js";
// Read

// for get request of ('/:id')
export const getUser = async (req,res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
    } catch (error) {
        res.statu(404).json({ message: error.message })
    }
}

// for get request of ('/:id/frienda/')
export const getUserFriends = async(req,res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        
        const friends = await Promise.all(
            user.friends.map ((id)=>{
                user.friends.map((id)=> User.findById(id));
            })
        )
        const formattedFriends = friends.map(
            ({ _id, firstName,lastName,occupation,location,picturePath}) =>{
                return { _id,firstName, lastName, occupation , location, picturePath }
            }
        )
        res.status(200).json(formattedFriends)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// for patch request of ('/:id/:friendId/')
export const addRemoveFriend = async (req,res)=>{
    try {
        const { id,friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
        if (user.friends.includes(friendId)) {  
            user.friends = user.friends.filter((id)=> id !== friendId);
            friend.friends = friend.friends.filter((id)=> id!== id);
        }
        else{
            user.friends.push(friendId)           ;
            friend.friends.push(id)
        }
        await user.save()
        await friend.save()

        const friends = await Promise.all(
            user.friends.map ((id)=>{
                user.friends.map((id)=> User.findById(id));
            })
        )
        const formattedFriends = friends.map(
            ({ _id, firstName,lastName,occupation,location,picturePath}) =>{
                return { _id,firstName, lastName, occupation , location, picturePath }
            }
        )

        res.status(200).json(formattedFriends)
    } catch (error) {
        res.send(404).json({ message: error.message })
    }
}