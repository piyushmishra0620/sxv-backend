const Event = require("../../models/events");



exports.getParticipantsh = async (req, res) => {
    try {
        const { eventName } = req.body;
       
        const events = await Event.find({ 'eventName': eventName });
        
    
        if (!events || events.length === 0) {
            console.log('No events found');
            return res.status(404).json({ message: 'No events found' });
        }
    
        const participantsIds = events.map(event => event.participants).flat();
    
        const participantsData = await User.find({ '_id': { $in: participantsIds } });
    
        res.json(participantsData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};