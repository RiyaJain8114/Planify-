const Policy = require('../models/Policy');

// Get all policies
exports.getAllPolicies = async (req, res) => {
  try {
    const policies = await Policy.find().sort({ updatedAt: -1 });
    res.json(policies);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new policy
exports.createPolicy = async (req, res) => {
  try {
    const { title, category, content } = req.body;

    const newPolicy = new Policy({ title, category, content });
    await newPolicy.save();

    res.status(201).json(newPolicy);
  } catch (err) {
    res.status(400).json({ message: 'Error creating policy' });
  }
};

// Update a policy
exports.updatePolicy = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, content } = req.body;

    const updatedPolicy = await Policy.findByIdAndUpdate(
      id,
      { title, category, content, updatedAt: Date.now() },
      { new: true }
    );

    res.json(updatedPolicy);
  } catch (err) {
    res.status(400).json({ message: 'Error updating policy' });
  }
};

// Delete a policy
exports.deletePolicy = async (req, res) => {
  try {
    const { id } = req.params;
    await Policy.findByIdAndDelete(id);
    res.json({ message: 'Policy deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting policy' });
  }
};
