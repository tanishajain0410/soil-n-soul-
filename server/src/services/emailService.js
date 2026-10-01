import nodemailer from 'nodemailer';

let transporter = null;

/**
 * Initialize or get the cached Nodemailer transporter.
 */
function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT) || 587;
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  if (host && user && pass) {
    transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
      tls: {
        rejectUnauthorized: process.env.NODE_ENV === 'production',
      },
    });
    console.log(`[EmailService] Configured SMTP transporter: ${host}:${port} (${user})`);
  } else {
    // Development fallback / mock logger
    transporter = {
      isMock: true,
      async sendMail(options) {
        console.log('\n========================================================');
        console.log('📬 [EmailService - MOCK SEND]');
        console.log(`To:      ${options.to}`);
        console.log(`From:    ${options.from}`);
        console.log(`Subject: ${options.subject}`);
        console.log('Preview text:');
        console.log(options.text || '(HTML email sent)');
        console.log('========================================================\n');
        return { messageId: `mock-${Date.now()}@soilnsoultravels.com`, mock: true };
      },
    };
    console.log('[EmailService] SMTP credentials not set. Running in development mock mode (logs to console).');
  }

  return transporter;
}

const SITE_URL = process.env.SITE_URL || 'https://www.soilnsoultravels.com';
const FROM_EMAIL = process.env.SMTP_FROM || '"SoilNSoul Travels" <info@soilnsoultravels.com>';

/**
 * Common luxury email wrapper matching SoilNSoul warm heritage design system
 */
function wrapEmailTemplate({ title, subtitle, contentHtml, unsubscribeUrl }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { margin: 0; padding: 0; background-color: #f7f1e6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #2a1712; }
    table { border-spacing: 0; border-collapse: collapse; }
    td { padding: 0; }
    img { border: 0; }
    .wrapper { width: 100%; table-layout: fixed; background-color: #f7f1e6; padding: 40px 16px; }
    .main { background-color: #ffffff; margin: 0 auto; width: 100%; max-width: 600px; border: 1px solid rgba(167, 121, 55, 0.2); border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(36, 16, 11, 0.08); }
    .header { background: linear-gradient(145deg, #1c0d09 0%, #2a1712 100%); padding: 36px 32px 30px; text-align: center; border-bottom: 2px solid #d5ae62; }
    .logo-text { font-family: Georgia, 'Times New Roman', serif; font-size: 24px; font-weight: 700; letter-spacing: 3px; color: #f7f1e6; text-transform: uppercase; margin: 0; }
    .logo-sub { font-size: 10px; font-weight: 600; letter-spacing: 2px; color: #d5ae62; text-transform: uppercase; margin-top: 6px; }
    .content { padding: 36px 36px 32px; background-color: #fffdfa; }
    .title { font-family: Georgia, 'Times New Roman', serif; font-size: 26px; line-height: 1.25; color: #24100c; margin: 0 0 16px; font-weight: normal; }
    .title em { font-style: italic; color: #9a5d12; }
    .text { font-size: 15px; line-height: 1.68; color: #4a382e; margin: 0 0 20px; }
    .btn-wrap { text-align: center; margin: 30px 0; }
    .btn { display: inline-block; background: linear-gradient(135deg, #f0cf82 0%, #dda94f 100%); color: #24100c !important; text-decoration: none; font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding: 14px 32px; border-radius: 999px; box-shadow: 0 4px 14px rgba(36, 16, 12, 0.16); }
    .quote-box { background-color: #fbf6ed; border-left: 3px solid #c89a4b; padding: 16px 20px; margin: 24px 0; font-family: Georgia, serif; font-style: italic; font-size: 16px; color: #3a251b; }
    .footer { background-color: #24100c; padding: 28px 32px; text-align: center; color: #d9cbb8; font-size: 12px; line-height: 1.6; }
    .footer a { color: #d5ae62; text-decoration: none; }
    .footer-links { margin: 12px 0 16px; }
    .footer-links a { margin: 0 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; }
    .unsub { font-size: 11px; color: #9a8878; margin-top: 14px; }
  </style>
</head>
<body>
  <div class="wrapper">
    <table class="main" align="center">
      <tr>
        <td class="header">
          <p class="logo-text">SOIL <span style="color:#d5ae62;">&amp;</span> SOUL</p>
          <p class="logo-sub">TRAVELS &bull; VARANASI</p>
        </td>
      </tr>
      <tr>
        <td class="content">
          ${contentHtml}
        </td>
      </tr>
      <tr>
        <td class="footer">
          <p style="margin: 0; font-weight: 600; color: #f7f1e6;">SoilNSoul Travels</p>
          <p style="margin: 4px 0 0; color: #b5a494;">Assi Ghat Road, Varanasi, Uttar Pradesh 221005</p>
          <div class="footer-links">
            <a href="${SITE_URL}/blog">The Soul Blog</a> &bull;
            <a href="${SITE_URL}/journeys">Journeys</a> &bull;
            <a href="${SITE_URL}/experiences">Experiences</a> &bull;
            <a href="https://wa.me/919580417547">WhatsApp Concierge</a>
          </div>
          ${unsubscribeUrl ? `<p class="unsub">You received this email because you subscribed to The Soul Blog. <a href="${unsubscribeUrl}" style="color: #d5ae62; text-decoration: underline;">Unsubscribe</a> at any time.</p>` : ''}
        </td>
      </tr>
    </table>
  </div>
</body>
</html>
  `.trim();
}

/**
 * 1. Send Welcome Email upon Newsletter Subscription
 */
export async function sendWelcomeNewsletterEmail({ toEmail, name = 'Varanasi Traveler' }) {
  if (!toEmail) return { success: false, message: 'Missing recipient email' };

  const unsubUrl = `${SITE_URL}/api/newsletter/unsubscribe?email=${encodeURIComponent(toEmail)}`;
  const contentHtml = `
    <h1 class="title">Welcome to <em>The Soul Blog</em>.</h1>
    <p class="text">
      Namaste ${name && name !== 'Soul Blog Subscriber' ? name : ''},
    </p>
    <p class="text">
      Thank you for subscribing to <strong>Notes from Banaras</strong>. You are now part of a quiet circle of travelers, seekers, and culture enthusiasts who cherish the timeless depth of Kashi.
    </p>
    <div class="quote-box">
      &ldquo;Varanasi is not a city that yields its secrets all at once. Like the morning mist lifting over the Ganga, it reveals itself in layers.&rdquo;
    </div>
    <p class="text">
      Here is what you can look forward to in your inbox:
    </p>
    <ul style="padding-left: 20px; font-size: 14px; line-height: 1.8; color: #4a382e; margin-bottom: 24px;">
      <li><strong>Handcrafted Guides:</strong> Authentic walking routes, ghat mornings, and hidden artisanal studios.</li>
      <li><strong>Local Perspectives:</strong> Intimate stories from Banarasi weavers, boatmen, priests, and elders.</li>
      <li><strong>Traveler Insights:</strong> Mindful tips on when to visit, where to stay, and how to experience Kashi beyond the usual.</li>
    </ul>
    <div class="btn-wrap">
      <a href="${SITE_URL}/blog" class="btn">Explore Our Stories &rarr;</a>
    </div>
    <p class="text" style="font-size: 13px; color: #70594a; border-top: 1px solid #efe2cd; padding-top: 18px; margin-top: 28px;">
      <strong>Planning a journey to Varanasi?</strong> Our personal local concierge is available for one-on-one custom itineraries. Simply reach out via <a href="https://wa.me/919580417547" style="color: #9a5d12; font-weight: 600; text-decoration: underline;">WhatsApp at +91 95804 17547</a>.
    </p>
  `;

  const html = wrapEmailTemplate({
    title: 'Welcome to The Soul Blog | SoilNSoul Travels',
    contentHtml,
    unsubscribeUrl: unsubUrl,
  });

  const mailOptions = {
    from: FROM_EMAIL,
    to: toEmail,
    subject: '✨ Welcome to The Soul Blog — Notes from Banaras | SoilNSoul Travels',
    text: `Namaste,\n\nThank you for subscribing to The Soul Blog — Notes from Banaras.\n\nYou will receive curated stories, travel guides, and local perspectives from Varanasi.\n\nExplore our stories at ${SITE_URL}/blog\n\nWarm regards,\nSoilNSoul Travels Concierge\n+91 95804 17547`,
    html,
  };

  try {
    const t = getTransporter();
    const info = await t.sendMail(mailOptions);
    console.log(`[EmailService] Welcome email sent to ${toEmail} (MessageId: ${info.messageId})`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`[EmailService] Failed to send welcome email to ${toEmail}:`, error);
    return { success: false, error: error.message };
  }
}

/**
 * 2. Send New Blog Post Broadcast to Subscribers
 */
export async function sendNewBlogNotificationEmail({ toEmails, blog }) {
  if (!toEmails || !toEmails.length || !blog) {
    return { success: false, message: 'Missing recipients or blog payload' };
  }

  const blogUrl = `${SITE_URL}/blog/${blog.slug}`;
  const bannerImage = blog.bannerImage || blog.banner_image || `${SITE_URL}/images/hero/hero-3.jpg`;

  const contentHtml = `
    <span style="display: inline-block; background-color: #fbf6ed; border: 1px solid rgba(200, 154, 75, 0.4); color: #8b321a; font-size: 10px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; padding: 4px 12px; border-radius: 999px; margin-bottom: 12px;">
      ${blog.category || 'New Story'}
    </span>
    <h1 class="title">${blog.title}</h1>
    ${bannerImage ? `
      <div style="margin: 18px 0 22px; border-radius: 8px; overflow: hidden; border: 1px solid rgba(167, 121, 55, 0.2);">
        <img src="${bannerImage.startsWith('http') ? bannerImage : `${SITE_URL}${bannerImage.startsWith('/') ? '' : '/'}${bannerImage}`}" alt="${blog.title}" style="width: 100%; max-height: 280px; object-fit: cover; display: block;" />
      </div>
    ` : ''}
    <p class="text" style="font-size: 16px; font-style: italic; color: #3a251b; margin-bottom: 22px;">
      ${blog.excerpt || 'A new reflection from the sacred ghats of Varanasi is now live on The Soul Blog.'}
    </p>
    <div class="btn-wrap">
      <a href="${blogUrl}" class="btn">Read Full Story &rarr;</a>
    </div>
    <p class="text" style="font-size: 13px; color: #70594a; margin-top: 24px; text-align: center;">
      Shared with you by SoilNSoul Travels &bull; Varanasi
    </p>
  `;

  const html = wrapEmailTemplate({
    title: `${blog.title} | SoilNSoul Travels`,
    contentHtml,
    unsubscribeUrl: `${SITE_URL}/api/newsletter/unsubscribe`,
  });

  const t = getTransporter();
  const results = { sent: 0, failed: 0 };

  // Send to subscribers (individual or bcc in small batches)
  for (const email of toEmails) {
    try {
      await t.sendMail({
        from: FROM_EMAIL,
        to: email,
        subject: `📖 New Story: ${blog.title} | SoilNSoul Travels`,
        text: `New on The Soul Blog:\n\n${blog.title}\n\n${blog.excerpt || ''}\n\nRead the full story: ${blogUrl}\n\n— SoilNSoul Travels`,
        html,
      });
      results.sent++;
    } catch (err) {
      console.error(`[EmailService] Failed sending blog broadcast to ${email}:`, err);
      results.failed++;
    }
  }

  console.log(`[EmailService] Broadcast completed for "${blog.title}". Sent: ${results.sent}, Failed: ${results.failed}`);
  return { success: true, ...results };
}

/**
 * 3. Alert Admin about a new subscriber or inquiry
 */
export async function sendAdminNotificationEmail({ type = 'subscriber', data }) {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@soilnsoul.in';
  if (!adminEmail) return;

  const isSub = type === 'subscriber';
  const subject = isSub
    ? `🔔 New Blog Subscriber: ${data.email}`
    : `📩 New Journey Inquiry from ${data.name || 'Traveler'}`;

  const contentHtml = `
    <h2 style="font-family: Georgia, serif; font-size: 20px; color: #24100c; margin-top: 0;">
      ${isSub ? 'New Newsletter Subscriber' : 'New Journey Inquiry'}
    </h2>
    <table style="width: 100%; font-size: 14px; border-collapse: collapse; margin-top: 14px;">
      ${data.name ? `<tr><td style="padding: 6px 0; font-weight: bold; width: 100px;">Name:</td><td>${data.name}</td></tr>` : ''}
      ${data.email ? `<tr><td style="padding: 6px 0; font-weight: bold;">Email:</td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>` : ''}
      ${data.phone ? `<tr><td style="padding: 6px 0; font-weight: bold;">Phone:</td><td><a href="tel:${data.phone}">${data.phone}</a></td></tr>` : ''}
      ${data.service ? `<tr><td style="padding: 6px 0; font-weight: bold;">Service:</td><td>${data.service}</td></tr>` : ''}
      ${data.message ? `<tr><td style="padding: 6px 0; font-weight: bold;">Message:</td><td>${data.message}</td></tr>` : ''}
      <tr><td style="padding: 6px 0; font-weight: bold;">Time:</td><td>${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</td></tr>
    </table>
    <div style="margin-top: 24px;">
      <a href="${SITE_URL}/admin/inquiries" style="display: inline-block; background: #24100c; color: #d5ae62; padding: 10px 20px; font-size: 12px; font-weight: bold; text-decoration: none; border-radius: 4px;">
        Open Admin Panel &rarr;
      </a>
    </div>
  `;

  try {
    const t = getTransporter();
    await t.sendMail({
      from: FROM_EMAIL,
      to: adminEmail,
      subject,
      html: wrapEmailTemplate({ title: subject, contentHtml }),
    });
  } catch (err) {
    console.warn('[EmailService] Could not send admin notification:', err.message);
  }
}
