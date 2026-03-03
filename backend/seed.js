require('dotenv').config();
const mongoose = require('mongoose');
const Job = require('./models/Job');

const sampleJobs = [
  {
    title: 'Senior UI/UX Designer',
    company: 'Dropbox',
    location: 'San Francisco, CA',
    category: 'Design',
    type: 'Full Time',
    salary: '$90k–$120k/yr',
    description: 'We are looking for a talented Senior UI/UX Designer to join our growing design team. You will work closely with product managers and engineers to create beautiful, intuitive interfaces that delight our millions of users.\n\nYou will be responsible for the entire design process from concept to launch, including user research, wireframing, prototyping, and final visual design.',
    requirements: [
      '5+ years of UI/UX design experience',
      'Proficiency in Figma and prototyping tools',
      'Strong portfolio demonstrating product design work',
      'Experience with design systems and component libraries',
      'Ability to collaborate effectively with cross-functional teams'
    ],
    responsibilities: [
      'Lead end-to-end design for key product features',
      'Conduct user research and usability testing',
      'Maintain and evolve our design system',
      'Collaborate with engineering on implementation',
      'Present designs to stakeholders and incorporate feedback'
    ],
    featured: true,
    active: true
  },
  {
    title: 'Brand Designer',
    company: 'Shopify',
    location: 'Remote',
    category: 'Design',
    type: 'Full Time',
    salary: '$80k–$100k/yr',
    description: 'Join Shopify\'s brand team and help shape the visual identity of one of the world\'s leading e-commerce platforms. You\'ll work on everything from marketing campaigns to product launches.',
    requirements: [
      '3+ years of brand design experience',
      'Strong typography and color theory skills',
      'Experience with motion graphics',
      'Portfolio of brand identity work'
    ],
    responsibilities: [
      'Create brand assets for marketing campaigns',
      'Design illustrations and visual content',
      'Maintain brand guidelines consistency',
      'Collaborate with marketing and product teams'
    ],
    featured: true,
    active: true
  },
  {
    title: 'Email Marketing Specialist',
    company: 'Mailchimp',
    location: 'Atlanta, GA',
    category: 'Marketing',
    type: 'Full Time',
    salary: '$60k–$75k/yr',
    description: 'Drive customer engagement and retention through strategic email marketing campaigns. You will manage our entire email marketing pipeline from strategy to execution and analysis.',
    requirements: [
      '2+ years of email marketing experience',
      'Experience with marketing automation platforms',
      'Strong analytical and data interpretation skills',
      'Excellent copywriting skills'
    ],
    responsibilities: [
      'Plan and execute email marketing campaigns',
      'A/B test subject lines and content',
      'Analyze campaign performance metrics',
      'Grow and segment email subscriber lists'
    ],
    featured: false,
    active: true
  },
  {
    title: 'React Frontend Developer',
    company: 'Vercel',
    location: 'Remote',
    category: 'Technology',
    type: 'Full Time',
    salary: '$110k–$140k/yr',
    description: 'Build the future of the web with Vercel. We are looking for a passionate React developer to work on our core platform and help millions of developers deploy their applications.',
    requirements: [
      '4+ years of React development experience',
      'Deep understanding of JavaScript and TypeScript',
      'Experience with Next.js',
      'Knowledge of web performance optimization',
      'Familiarity with CI/CD pipelines'
    ],
    responsibilities: [
      'Build and maintain React components',
      'Optimize application performance',
      'Write clean, maintainable code',
      'Review PRs and mentor junior developers',
      'Collaborate with design team on UI implementation'
    ],
    featured: true,
    active: true
  },
  {
    title: 'Product Marketing Manager',
    company: 'Notion',
    location: 'New York, NY',
    category: 'Marketing',
    type: 'Full Time',
    salary: '$95k–$115k/yr',
    description: 'Lead go-to-market strategy for Notion\'s key product initiatives. You\'ll work cross-functionally with product, design, and sales to bring new features and products to market.',
    requirements: [
      '5+ years in product marketing',
      'Experience at a SaaS company',
      'Strong storytelling and communication skills',
      'Data-driven approach to marketing'
    ],
    responsibilities: [
      'Develop product messaging and positioning',
      'Launch new features and products',
      'Create sales enablement materials',
      'Track and report on marketing metrics'
    ],
    featured: false,
    active: true
  },
  {
    title: 'DevOps Engineer',
    company: 'GitHub',
    location: 'Remote',
    category: 'Engineering',
    type: 'Remote',
    salary: '$120k–$150k/yr',
    description: 'Help maintain and improve GitHub\'s infrastructure that serves millions of developers worldwide. You\'ll work on critical systems that power the world\'s largest developer platform.',
    requirements: [
      '4+ years of DevOps/SRE experience',
      'Expertise in Kubernetes and Docker',
      'Experience with AWS or GCP',
      'Strong scripting skills (Python, Bash)',
      'Experience with monitoring and observability tools'
    ],
    responsibilities: [
      'Manage and scale cloud infrastructure',
      'Implement CI/CD pipelines',
      'Monitor system performance and reliability',
      'Respond to and resolve incidents',
      'Improve deployment processes'
    ],
    featured: true,
    active: true
  },
  {
    title: 'HR Business Partner',
    company: 'Stripe',
    location: 'San Francisco, CA',
    category: 'Human Resources',
    type: 'Full Time',
    salary: '$85k–$105k/yr',
    description: 'Partner with business leaders to develop and implement HR strategies that enable Stripe to attract, develop, and retain world-class talent.',
    requirements: [
      '5+ years HR experience',
      'SHRM-CP or PHR certification preferred',
      'Experience with HRIS systems',
      'Strong knowledge of employment law'
    ],
    responsibilities: [
      'Partner with managers on people strategy',
      'Lead talent planning and performance reviews',
      'Drive employee engagement initiatives',
      'Manage employee relations issues'
    ],
    featured: false,
    active: true
  },
  {
    title: 'Financial Analyst',
    company: 'Robinhood',
    location: 'Menlo Park, CA',
    category: 'Finance',
    type: 'Full Time',
    salary: '$75k–$95k/yr',
    description: 'Join Robinhood\'s finance team and help democratize finance for all. You\'ll build financial models, conduct analysis, and support strategic decision-making across the company.',
    requirements: [
      '2-4 years of financial analysis experience',
      'Advanced Excel and financial modeling skills',
      'CFA Level 1 preferred',
      'Strong attention to detail'
    ],
    responsibilities: [
      'Build and maintain financial models',
      'Prepare monthly financial reports',
      'Support budgeting and forecasting processes',
      'Conduct market research and analysis'
    ],
    featured: false,
    active: true
  },
  {
    title: 'Sales Development Representative',
    company: 'HubSpot',
    location: 'Boston, MA',
    category: 'Sales',
    type: 'Full Time',
    salary: '$55k–$70k + Commission',
    description: 'Drive growth at HubSpot by identifying and qualifying new business opportunities. You\'ll be the first point of contact for prospective customers and play a key role in our sales pipeline.',
    requirements: [
      '1+ years of sales or customer-facing experience',
      'Excellent communication skills',
      'Proficiency with CRM tools',
      'Goal-oriented mindset'
    ],
    responsibilities: [
      'Prospect and qualify new leads',
      'Conduct outbound outreach via email, phone, social',
      'Schedule demos for Account Executives',
      'Maintain accurate CRM records',
      'Meet and exceed monthly quotas'
    ],
    featured: false,
    active: true
  },
  {
    title: 'Business Development Manager',
    company: 'Airbnb',
    location: 'San Francisco, CA',
    category: 'Business',
    type: 'Full Time',
    salary: '$100k–$130k/yr',
    description: 'Identify and develop new business opportunities for Airbnb. You\'ll work on strategic partnerships and market expansion initiatives.',
    requirements: [
      '6+ years in business development or consulting',
      'Strong negotiation and deal-closing skills',
      'Experience with partnership agreements',
      'MBA preferred'
    ],
    responsibilities: [
      'Identify and pursue new partnership opportunities',
      'Negotiate and close strategic deals',
      'Develop go-to-market strategies',
      'Build and maintain executive relationships'
    ],
    featured: false,
    active: true
  }
];

async function seed() {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/quickhire';
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing
    await Job.deleteMany({});
    console.log('🗑️  Cleared existing jobs');

    // Insert sample data
    const inserted = await Job.insertMany(sampleJobs);
    console.log(`✅ Inserted ${inserted.length} sample jobs`);

    console.log('\n🎉 Seed complete! Jobs added:');
    inserted.forEach(job => console.log(`   • ${job.title} @ ${job.company}`));

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
}

seed();
