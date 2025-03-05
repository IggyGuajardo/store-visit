const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service (e.g., Gmail, Outlook)
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

// Form submission endpoint
app.post('/submit-form', (req, res) => {
  const {
    date_time,
    store_number,
    observer_name,
    advocate_name,
    warmly_welcome,
    acknowledge_greet,
    uncover_needs,
    listen_attention,
    review_account,
    recommend_phone_options,
    recommend_rate_plan,
    recommend_accessories,
    recommend_features,
    ask_sale,
    overcome_objections,
    discuss_mycricket,
    assist_setup,
    educate_bill_cycle,
    comments,
    what_went_well,
    opportunities,
    next_review_date,
    max_setup_tested,
    aia_offered_addressed,
    // New fields for the 10 boxes
    activations,
    upgrades,
    rpm,
    ppp_apps,
    wtr,
    autopay,
    cricket_protect,
    apo,
    max_box, // Renamed to avoid conflict with existing "max" field
    aia_checks,
  } = req.body;

  console.log('Form Data Received:', req.body); // Debugging: Log the entire request body

  // Email content with the new fields included
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'New Form Submission',
    text: `
      Date/Time: ${date_time}
      Store Number: ${store_number}
      Observer Name: ${observer_name}
      Advocate Name: ${advocate_name}

      Activations: ${activations}
      Upgrades: ${upgrades}
      $60 RPM: ${rpm}
      PPP Apps: ${ppp_apps}
      WTR: ${wtr}
      AutoPay: ${autopay}
      Cricket Protect: ${cricket_protect}
      APO: ${apo}
      Max: ${max_box}
      AIA Checks: ${aia_checks}

      Warmly Welcome: ${warmly_welcome}
      Acknowledge and Greet: ${acknowledge_greet}
      Uncover Needs: ${uncover_needs}
      Listen and Provide Attention: ${listen_attention}
      Review Account: ${review_account}
      Recommend Phone Options: ${recommend_phone_options}
      Recommend Rate Plan: ${recommend_rate_plan}
      Recommend Accessories: ${recommend_accessories}
      Recommend Features: ${recommend_features}
      Ask for Sale: ${ask_sale}
      Overcome Objections: ${overcome_objections}
      Discuss myCricket App: ${discuss_mycricket}
      Assist with Setup: ${assist_setup}
      Educate on Bill Cycle: ${educate_bill_cycle}
      Comments: ${comments}
      What Went Well: ${what_went_well}
      Opportunities: ${opportunities}
      Next Review Date: ${next_review_date}
      Max Setup and Tested: ${max_setup_tested}
      AIA Offered and Addressed: ${aia_offered_addressed}
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error submitting form');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Form submitted successfully');
    }
  });
});

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});