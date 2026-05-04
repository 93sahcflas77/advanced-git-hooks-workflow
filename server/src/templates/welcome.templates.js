module.exports = ({ username, ctaLink, appName = 'YourApp' }) => {
  return `
  <!DOCTYPE html>

  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Welcome Email</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;">
  <tr>
    <td align="center">

      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; margin:20px 0; border-radius:8px; overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="background:#4f46e5; padding:20px; text-align:center;">
            <h1 style="color:#ffffff; margin:0;">Welcome to ${appName} 🚀</h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:30px;">
            <h2 style="margin-top:0; color:#333;">Hi ${username || 'User'},</h2>

            <p style="color:#555; font-size:16px; line-height:1.5;">
              Welcome to <strong>${appName}</strong>! We're excited to have you onboard.
            </p>

            <p style="color:#555; font-size:16px;">
              Click below to get started:
            </p>

            <!-- Button -->
            <table align="center" style="margin:20px 0;">
              <tr>
                <td style="background:#4f46e5; border-radius:5px;">
                  <a href="${ctaLink}" target="_blank"
                    style="display:inline-block; padding:12px 25px; color:#ffffff; text-decoration:none; font-weight:bold;">
                    Get Started
                  </a>
                </td>
              </tr>
            </table>

            <p style="color:#777; font-size:14px;">
              If you have questions, just reply to this email.
            </p>

            <p style="color:#555; font-size:14px;">
              Cheers,<br/>
              <strong>${appName} Team</strong>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="border-top:1px solid #eee; padding:20px; text-align:center; font-size:12px; color:#999;">
            © ${new Date().getFullYear()} ${appName}. All rights reserved.
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

  </body>
  </html>
  `;
};
