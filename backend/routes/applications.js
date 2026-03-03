const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const Application = require('../models/Application');
const Job = require('../models/Job');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

// POST /api/applications - Submit application
router.post('/', [
  body('job').notEmpty().isMongoId().withMessage('Valid job ID is required'),
  body('name').notEmpty().withMessage('Name is required').trim(),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('resumeLink').notEmpty().isURL().withMessage('Valid resume URL is required'),
  body('coverNote').notEmpty().withMessage('Cover note is required').isLength({ min: 50 }).withMessage('Cover note must be at least 50 characters')
], validate, async (req, res) => {
  try {
    // Check if job exists
    const job = await Job.findById(req.body.job);
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });

    // Check duplicate application
    const existing = await Application.findOne({ job: req.body.job, email: req.body.email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'You have already applied for this job' });
    }

    const application = await Application.create(req.body);
    await application.populate('job', 'title company');
    res.status(201).json({ success: true, data: application, message: 'Application submitted successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/applications - List all applications (Admin)
router.get('/', async (req, res) => {
  try {
    const { jobId, page = 1, limit = 20 } = req.query;
    const filter = jobId ? { job: jobId } : {};
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Application.countDocuments(filter);
    const applications = await Application.find(filter)
      .populate('job', 'title company')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: applications,
      pagination: { total, page: parseInt(page), limit: parseInt(limit), pages: Math.ceil(total / parseInt(limit)) }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/applications/:id
router.get('/:id', [param('id').isMongoId()], validate, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate('job');
    if (!application) return res.status(404).json({ success: false, message: 'Application not found' });
    res.json({ success: true, data: application });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
