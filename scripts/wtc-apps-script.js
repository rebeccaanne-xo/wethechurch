/**
 * wtc-apps-script.js
 * ─────────────────────────────────────
 * Job:      Google Apps Script — handles form submissions and data management for We The Church
 * Connects: Deployed as Google Apps Script web app · receives POST from join form
 * Reads:    Form submission data
 * Returns:  Writes to Google Sheet
 */

// ── WE THE CHURCH — Member Signup Script ─────────────────────────────────
// Deploy as: Web App · Execute as: Me · Who has access: Anyone
// After updating, deploy a NEW VERSION — do not edit-in-place
//
// SETUP:
//   1. Replace SHEET_ID below with your Google Sheet ID (from the URL)
//   2. Make sure your sheet has these headers in row 1:
//      Timestamp | Name | Email | Source | Membership
//   3. Deploy → New Deployment → Web App → Anyone → Deploy
//   4. Paste the Web App URL into join.html as SCRIPT_URL

const SHEET_ID   = '1Z9ahuevGDDHyv5f8-U6O6tSbq5iWHx0kcMu7jfdGEWo';
const SHEET_NAME = 'Members';
const FROM_EMAIL = 'rebeccaanne.xo@gmail.com';
const FROM_NAME  = 'We The Church';

// ── HANDLE FORM SUBMISSION ─────────────────────────────────────────────────
function doPost(e) {
  try {
    const data   = JSON.parse(e.postData.contents);
    const name       = (data.name   || '').trim();
    const email      = (data.email  || '').trim();
    const source     = (data.source || 'join-page').trim();
    const newsletter = !!data.newsletter;

    if (!email) {
      return respond({ success: false, error: 'Email is required.' });
    }

    // Write to sheet
    writeToSheet(name, email, source, newsletter);

    // Send welcome email to new member
    sendWelcomeEmail(name, email);

    // Notify Rebecca of new signup
    notifyAdmin(name, email, source);

    return respond({ success: true });

  } catch (err) {
    return respond({ success: false, error: err.message });
  }
}

// ── WRITE TO GOOGLE SHEET ──────────────────────────────────────────────────
function writeToSheet(name, email, source, newsletter) {
  const ss    = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
  sheet.appendRow([
    new Date(),
    name,
    email,
    source,
    newsletter ? 'Member + Newsletter' : 'Member'
  ]);
}

// ── SEND WELCOME EMAIL ─────────────────────────────────────────────────────
function sendWelcomeEmail(name, email) {
  const firstName = name ? name.split(' ')[0] : 'friend';

  const subject = 'You\'re in. Welcome to We The Church.';

  const body = `${firstName},

You're in. Welcome home.

We The Church is a Bible study community for women who want the Word — real scripture, real conversation, no performance required. We're glad you're here.

Here's what's next:

OPEN THE APP
Everything lives here — the current study, The Truth articles, your notes, session times.
https://wethechurch.pages.dev/app/

JOIN THE DISCORD
This is where we gather every other Saturday morning and talk between sessions.
https://discord.gg/xnQQqs9tm

CURRENT STUDY — GALATIANS
We're working through Paul's most urgent letter right now. You don't need to catch up — just come in at the chapter we're on.

Sessions are every Monday at 4pm PST · 7pm EST. Times show in your local timezone inside the app.

If you have questions, just reply to this email. I actually read them.

— Rebecca
We The Church`;

  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  body { font-family: Georgia, serif; background: #faf8f4; margin: 0; padding: 0; }
  .wrap { max-width: 560px; margin: 40px auto; background: #fff; border: 1px solid #d9d0bc; }
  .header { background: #1B2A4A; padding: 32px 40px; text-align: center; }
  .header-name { font-family: Georgia, serif; font-size: 13px; font-weight: normal; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(247,238,241,0.5); margin-bottom: 6px; }
  .header-cross { font-size: 28px; color: #C2738A; }
  .body { padding: 40px 40px 32px; }
  .greeting { font-size: 22px; color: #1B2A4A; margin-bottom: 6px; }
  .sub { font-size: 14px; color: #6b7280; margin-bottom: 32px; letter-spacing: 0.04em; }
  p { font-size: 16px; color: #2a2420; line-height: 1.85; margin-bottom: 18px; }
  .section { margin: 28px 0; padding: 20px 24px; border-left: 3px solid #C2738A; background: #faf8f4; }
  .section-label { font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #C2738A; margin-bottom: 6px; font-family: Arial, sans-serif; }
  .section-title { font-size: 15px; font-weight: 700; color: #1B2A4A; margin-bottom: 4px; font-family: Arial, sans-serif; }
  .section-desc { font-size: 13px; color: #6b7280; line-height: 1.65; font-family: Arial, sans-serif; }
  .cta { display: block; background: #C2738A; color: white; text-decoration: none; text-align: center; padding: 15px 28px; border-radius: 4px; font-family: Arial, sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 0.04em; margin: 32px 0; }
  .sign-off { font-style: italic; color: #4a4540; font-size: 15px; margin-top: 32px; }
  .sign-off strong { font-style: normal; color: #1B2A4A; }
  .footer { background: #0F1A2E; padding: 20px 40px; text-align: center; }
  .footer p { font-family: Arial, sans-serif; font-size: 11px; color: rgba(255,255,255,0.3); margin: 0; }
  @media(max-width:560px){ .body { padding: 28px 24px; } .header { padding: 24px; } }
</style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <div class="header-name">We The Church</div>
    <div class="header-cross">✝</div>
  </div>
  <div class="body">
    <div class="greeting">You're in. Welcome home.</div>
    <div class="sub">Newsletter · Bible Study Community</div>

    <p>${firstName}, we're glad you're here. Everything you need to get started is below.</p>

    <a href="https://wethechurch.pages.dev/articles/wtc-introduction/" class="section" style="text-decoration:none;display:block">
      <div class="section-label">Start Here</div>
      <div class="section-title">Read the Welcome Newsletter →</div>
      <div class="section-desc">An introduction to We The Church — what it is, who it's for, and why it exists.</div>
    </a>

    <a href="https://wethechurch.pages.dev/app/" class="section" style="text-decoration:none;display:block">
      <div class="section-label">Current Study</div>
      <div class="section-title">Galatians — Faith alone. Christ alone. →</div>
      <div class="section-desc">Paul's most urgent letter. We're working through it chapter by chapter, every other Saturday.</div>
    </a>

    <a href="https://discord.gg/xnQQqs9tm" class="section" style="text-decoration:none;display:block">
      <div class="section-label">The Community</div>
      <div class="section-title">Join us on Discord →</div>
      <div class="section-desc">This is where the Saturday sessions happen and where we talk between studies.</div>
    </a>

    <a href="https://wethechurch.pages.dev/app/" class="cta">Open the App →</a>

    <p class="sign-off">The Word hasn't changed. The noise has. We're just here to read it together.<br><br><strong>— Rebecca, We The Church</strong></p>
  </div>
  <div class="footer">
    <p>We The Church · wethechurch.pages.dev · Reply to unsubscribe</p>
  </div>
</div>
</body>
</html>`;

  MailApp.sendEmail({
    to:       email,
    subject:  subject,
    body:     body,
    htmlBody: html,
    name:     FROM_NAME,
    replyTo:  FROM_EMAIL
  });
}

// ── NOTIFY ADMIN ──────────────────────────────────────────────────────────
function notifyAdmin(name, email, source) {
  const time = new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' });
  const html = `
<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
  body { font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 0; }
  .wrap { max-width: 480px; margin: 32px auto; background: #fff; border: 1px solid #d9d0bc; border-radius: 4px; overflow: hidden; }
  .header { background: #1B2A4A; padding: 20px 28px; display: flex; align-items: center; }
  .header p { margin: 0; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(247,238,241,0.6); }
  .header h2 { margin: 4px 0 0; font-size: 18px; color: #F7EEF1; font-weight: 600; }
  .body { padding: 28px; }
  .row { display: flex; border-bottom: 1px solid #f0ead8; padding: 12px 0; }
  .row:last-child { border-bottom: none; }
  .label { font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: #b5892a; font-weight: 700; width: 80px; flex-shrink: 0; padding-top: 2px; }
  .value { font-size: 15px; color: #1B2A4A; font-weight: 600; }
  .footer { background: #faf8f4; padding: 14px 28px; border-top: 1px solid #d9d0bc; }
  .footer p { font-size: 11px; color: #9a9080; margin: 0; }
</style></head>
<body><div class="wrap">
  <div class="header">
    <div>
      <p>We The Church</p>
      <h2>Someone new found their way home.</h2>
    </div>
  </div>
  <div class="body">
    <div class="row"><span class="label">Name</span><span class="value">${name || '—'}</span></div>
    <div class="row"><span class="label">Email</span><span class="value">${email}</span></div>
    <div class="row"><span class="label">Source</span><span class="value">${source}</span></div>
    <div class="row"><span class="label">Time</span><span class="value">${time}</span></div>
  </div>
  <div class="footer"><p>View all members in your <a href="https://docs.google.com/spreadsheets/d/${SHEET_ID}" style="color:#b5892a">Google Sheet</a></p></div>
</div></body></html>`;

  MailApp.sendEmail({
    to:       FROM_EMAIL,
    subject:  (name || 'Someone') + ' just joined We The Church.',
    body:     'New signup\n\nName: ' + name + '\nEmail: ' + email + '\nSource: ' + source + '\nTime: ' + time,
    htmlBody: html,
    name:     'We The Church'
  });
}

// ── CORS RESPONSE HELPER ───────────────────────────────────────────────────
function respond(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── HANDLE GET (health check) ──────────────────────────────────────────────
function doGet() {
  return respond({ status: 'WTC signup script is running.' });
}
