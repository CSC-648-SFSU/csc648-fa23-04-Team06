const express = require('express');
const friendsController = express.Router();
const Friend = require('../models/Friends');
const User = require('../models/User');
const verifyToken = require('../middlewares/verifyToken');

friendsController.post('/add', verifyToken, async (req, res) => {
    try {
        const uid = req.user.id;
        const { friendId } = req.body;

        const friendUser = await User.findById(friendId);
        if (!friendUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const friendExist = await Friend.findOne({
            $or: [
                { user1: uid, user2: friendId },
                { user1: friendId, user2: uid }
            ]
        });

        if (friendExist) {
            return res.status(400).json({ message: 'Users are already friends' });
        }

        const newFriend = new Friend({ user1: uid, user2: friendId });
        await newFriend.save();

        return res.status(201).json(newFriend);
    } catch (error) {
        return res.status(500).json(error);
    }
});

friendsController.get('/', verifyToken, async (req, res) => {
    try {
        const uid = req.user.id;

        const friendships = await Friend.find({
            $or: [
                {user1: uid},
                {user2: uid}
            ]
        }).populate('user1 user2');

        const friends = friendships.map(friendship =>
            String(friendship.user1._id) === uid ? friendship.user2 : friendship.user1);

            return res.status(200).json(friends);
    } catch (error) {
        return res.status(500).json(error);
    }
});

module.exports = friendsController;