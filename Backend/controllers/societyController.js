const Society = require('../models/Society');

// Get all societies by status
exports.getSocietiesByStatus = async (req, res) => {
  try {
    const status = req.query.status || 'Pending';
    const societies = await Society.find({ status });
    res.json(societies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single society by ID
exports.getSocietyById = async (req, res) => {
  try {
    const society = await Society.findById(req.params.id);
    if (!society) return res.status(404).json({ message: 'Society not found' });
    res.json(society);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Approve or Reject a society
exports.updateSocietyStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const updatedSociety = await Society.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(updatedSociety);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
