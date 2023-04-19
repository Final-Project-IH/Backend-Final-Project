const Notification = require("../models/Notification.model");

module.exports.findNotifications = (req, res, next) => {
    const user = req.currentUserId;
    Notification.find({user: user})
    .then((notifications) => {
        const sortedNotifications = notifications.sort((a , b) => b.createdAt - a.createdAt)
        res.json(sortedNotifications);
    })
    .catch(next);
};


module.exports.listNotifications = (req, res, next) => {
    // const { limit } = req.query
    const user = req.currentUserId;
    Notification.find({user: user}).limit(4)
    .populate({ path: 'auction', populate: 'product' })
    .then((notifications)=> {
        res.status(200).json(notifications)
    })
    .catch(next);
}

module.exports.markManyAsRead = (req, res, next) => {
    const { notificationIds } = req.body

    Notification.updateMany({ _id: { $in: notificationIds }, user: req.currentUserId }, { read: true })
        .then(() => {
            res.status(200).json({})
        })
        .catch(next)
}