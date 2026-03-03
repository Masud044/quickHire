const express = require('express');
const router = express.Router();
const { body, param, query, validationResult } = require('express-validator');
const Job = require('../models/Job');

// Helper: format validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

// GET /api/jobs - List all jobs with search & filter
router.get('/', [
  query('search').optional().trim(),
  query('category').optional().trim(),
  query('location').optional().trim(),
  query('type').optional().trim(),
  query('featured').optional().isBoolean(),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 })
], async (req, res) => {
  try {
    const { search, category, location, type, featured, page = 1, limit = 10 } = req.query;
    const filter = { active: true };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    if (category) filter.category = category;
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (type) filter.type = type;
    if (featured === 'true') filter.featured = true;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Job.countDocuments(filter);
    const jobs = await Job.find(filter)
      .sort({ featured: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: jobs,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/jobs/:id - Single job
router.get('/:id', [
  param('id').isMongoId().withMessage('Invalid job ID')
], validate, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
    res.json({ success: true, data: job });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/jobs - Create job (Admin)
router.post('/', [
  body('title').notEmpty().withMessage('Title is required').trim(),
  body('company').notEmpty().withMessage('Company is required').trim(),
  body('location').notEmpty().withMessage('Location is required').trim(),
  body('category').notEmpty().withMessage('Category is required')
    .isIn(['Design', 'Sales', 'Marketing', 'Finance', 'Technology', 'Engineering', 'Business', 'Human Resources'])
    .withMessage('Invalid category'),
  body('type').optional().isIn(['Full Time', 'Part Time', 'Remote', 'Contract', 'Internship']),
  body('description').notEmpty().withMessage('Description is required'),
  body('salary').optional().trim(),
  body('requirements').optional().isArray(),
  body('responsibilities').optional().isArray(),
  body('featured').optional().isBoolean()
], validate, async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json({ success: true, data: job, message: 'Job created successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/jobs/:id - Update job (Admin)
router.put('/:id', [
  param('id').isMongoId().withMessage('Invalid job ID')
], validate, async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
    res.json({ success: true, data: job, message: 'Job updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/jobs/:id - Delete job (Admin)
router.delete('/:id', [
  param('id').isMongoId().withMessage('Invalid job ID')
], validate, async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
    res.json({ success: true, message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/jobs/stats/overview - Stats for admin
router.get('/stats/overview', async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments({ active: true });
    const featuredJobs = await Job.countDocuments({ featured: true, active: true });
    const byCategory = await Job.aggregate([
      { $match: { active: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.json({ success: true, data: { totalJobs, featuredJobs, byCategory } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
