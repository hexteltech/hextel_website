import "server-only";
import { Resend } from "resend";
import { BRAND_CONFIG } from "@/lib/constants";

interface ContactEmailParams {
  name: string;
  email: string;
  service: string;
  message: string;
  referenceId: string;
  company?: string;
  phone?: string;
  ndaPassword?: string;
  utm?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
  };
}

export interface EmailResult {
  sent: boolean;
  provider: "resend" | "none";
  id?: string;
  note?: string;
}

/**
 * Generates an executive-styled HTML email notification for incoming leads.
 */
function buildAdminNotificationHtml(params: ContactEmailParams): string {
  const { name, email, service, message, referenceId, ndaPassword, utm } = params;

  const utmRows = utm && Object.keys(utm).length > 0
    ? Object.entries(utm)
        .filter(([, v]) => Boolean(v))
        .map(
          ([k, v]) => `
          <tr>
            <td style="padding: 6px 12px; font-size: 12px; color: #71717A; text-transform: uppercase;">${k}</td>
            <td style="padding: 6px 12px; font-size: 13px; color: #18181B; font-weight: 500;">${v}</td>
          </tr>`
        )
        .join("")
    : `<tr><td colspan="2" style="padding: 6px 12px; font-size: 12px; color: #A1A1AA;">Direct / Organic</td></tr>`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Project Inquiry — ${referenceId}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F4F5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F4F4F5; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05); border: 1px solid #E4E4E7;">
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #120E0E; padding: 32px; text-align: left; border-bottom: 3px solid #B88849;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <h1 style="margin: 0; font-size: 20px; font-weight: 800; color: #FFFFFF; letter-spacing: 0.5px;">
                      ${BRAND_CONFIG.name}
                    </h1>
                    <p style="margin: 4px 0 0; font-size: 12px; color: #B88849; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">
                      New Lead Notification
                    </p>
                  </td>
                  <td align="right" valign="middle">
                    <span style="display: inline-block; background-color: rgba(184, 136, 73, 0.15); border: 1px solid #B88849; color: #B88849; font-family: monospace; font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 8px;">
                      ${referenceId}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding: 32px;">
              <!-- Lead Core Info Grid -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FBFBFC; border-radius: 12px; border: 1px solid #EDEDF0; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 14px 16px; border-bottom: 1px solid #EDEDF0; width: 35%; font-size: 12px; color: #71717A; font-weight: 600; text-transform: uppercase;">
                    Client Name
                  </td>
                  <td style="padding: 14px 16px; border-bottom: 1px solid #EDEDF0; font-size: 14px; color: #18181B; font-weight: 700;">
                    ${name}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 16px; border-bottom: 1px solid #EDEDF0; font-size: 12px; color: #71717A; font-weight: 600; text-transform: uppercase;">
                    Client Email
                  </td>
                  <td style="padding: 14px 16px; border-bottom: 1px solid #EDEDF0; font-size: 14px; color: #18181B;">
                    <a href="mailto:${email}" style="color: #B88849; text-decoration: none; font-weight: 600;">${email}</a>
                  </td>
                </tr>
                ${
                  params.phone
                    ? `
                <tr>
                  <td style="padding: 14px 16px; border-bottom: 1px solid #EDEDF0; font-size: 12px; color: #71717A; font-weight: 600; text-transform: uppercase;">
                    Phone Number
                  </td>
                  <td style="padding: 14px 16px; border-bottom: 1px solid #EDEDF0; font-size: 14px; color: #18181B; font-weight: 600;">
                    <a href="tel:${params.phone.replace(/\\s+/g, '')}" style="color: #18181B; text-decoration: none;">${params.phone}</a>
                  </td>
                </tr>`
                    : ""
                }
                ${
                  params.company
                    ? `
                <tr>
                  <td style="padding: 14px 16px; border-bottom: 1px solid #EDEDF0; font-size: 12px; color: #71717A; font-weight: 600; text-transform: uppercase;">
                    Company
                  </td>
                  <td style="padding: 14px 16px; border-bottom: 1px solid #EDEDF0; font-size: 14px; color: #18181B; font-weight: 600;">
                    ${params.company}
                  </td>
                </tr>`
                    : ""
                }
                <tr>
                  <td style="padding: 14px 16px; border-bottom: 1px solid #EDEDF0; font-size: 12px; color: #71717A; font-weight: 600; text-transform: uppercase;">
                    Interested Service
                  </td>
                  <td style="padding: 14px 16px; border-bottom: 1px solid #EDEDF0; font-size: 14px; color: #18181B; font-weight: 600;">
                    ${service}
                  </td>
                </tr>
                ${
                  ndaPassword
                    ? `
                <tr>
                  <td style="padding: 14px 16px; border-bottom: 1px solid #EDEDF0; font-size: 12px; color: #71717A; font-weight: 600; text-transform: uppercase;">
                    Client / NDA Key
                  </td>
                  <td style="padding: 14px 16px; border-bottom: 1px solid #EDEDF0; font-family: monospace; font-size: 13px; color: #D97706; font-weight: 700;">
                    ${ndaPassword}
                  </td>
                </tr>`
                    : ""
                }
              </table>

              <!-- Project Message Box -->
              <h3 style="margin: 0 0 10px; font-size: 13px; color: #18181B; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">
                Project Scope & Details
              </h3>
              <div style="background-color: #FAFAFA; border: 1px solid #E4E4E7; border-left: 4px solid #B88849; border-radius: 8px; padding: 18px; margin-bottom: 24px;">
                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #27272A; white-space: pre-wrap;">
                  ${message}
                </p>
              </div>

              <!-- Quick Action Reply Button -->
              <div style="text-align: center; margin-bottom: 28px;">
                <a href="mailto:${email}?subject=Re:%20${encodeURIComponent(service)}%20Inquiry%20[%20${referenceId}%20]"
                   style="display: inline-block; background-color: #120E0E; color: #FFFFFF; font-size: 13px; font-weight: 700; text-decoration: none; padding: 14px 28px; border-radius: 10px; text-transform: uppercase; letter-spacing: 0.5px;">
                  Reply directly to ${name} &rarr;
                </a>
              </div>

              <!-- Marketing Attribution Telemetry -->
              <div style="margin-top: 24px; padding-top: 18px; border-top: 1px dashed #E4E4E7;">
                <h4 style="margin: 0 0 10px; font-size: 11px; text-transform: uppercase; color: #A1A1AA; letter-spacing: 1px;">
                  Campaign Attribution (UTM)
                </h4>
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F8F8F9; border-radius: 8px;">
                  ${utmRows}
                </table>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F4F4F5; padding: 20px 32px; text-align: center; border-top: 1px solid #E4E4E7;">
              <p style="margin: 0; font-size: 11px; color: #71717A;">
                Automated lead dispatched via ${BRAND_CONFIG.name} Contact Routing &bull; ${new Date().toUTCString()}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Generates an automatic confirmation email receipt sent back to the prospect.
 */
function buildClientReceiptHtml(params: ContactEmailParams): string {
  const { name, service, referenceId } = params;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>We received your inquiry — ${BRAND_CONFIG.name}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F4F5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F4F4F5; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 580px; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #E4E4E7;">
          <tr>
            <td style="background-color: #120E0E; padding: 32px; border-bottom: 3px solid #B88849;">
              <h1 style="margin: 0; font-size: 20px; font-weight: 800; color: #FFFFFF;">${BRAND_CONFIG.name}</h1>
              <p style="margin: 4px 0 0; font-size: 12px; color: #B88849; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">
                Inquiry Received
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <h2 style="margin: 0 0 12px; font-size: 20px; color: #18181B;">Hello ${name},</h2>
              <p style="margin: 0 0 20px; font-size: 14px; line-height: 1.6; color: #3F3F46;">
                Thank you for reaching out to <strong>${BRAND_CONFIG.name}</strong> regarding <strong>${service}</strong>.
              </p>
              <p style="margin: 0 0 24px; font-size: 14px; line-height: 1.6; color: #3F3F46;">
                Our engineering leadership has received your project brief. A senior solutions architect will review your scope and follow up with initial insights and next steps within 24 hours.
              </p>

              <div style="background-color: #F8F8F9; border: 1px solid #E4E4E7; border-radius: 10px; padding: 16px; margin-bottom: 24px;">
                <div style="font-size: 11px; text-transform: uppercase; color: #71717A; font-weight: 600; margin-bottom: 4px;">
                  Your Reference Ticket
                </div>
                <div style="font-family: monospace; font-size: 16px; font-weight: 700; color: #B88849;">
                  ${referenceId}
                </div>
              </div>

              <p style="margin: 0; font-size: 13px; color: #71717A; line-height: 1.5;">
                Need urgent assistance? Reply directly to this email or reach us at <a href="mailto:${BRAND_CONFIG.email}" style="color: #B88849; text-decoration: none;">${BRAND_CONFIG.email}</a>.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #F4F4F5; padding: 18px 32px; text-align: center; border-top: 1px solid #E4E4E7;">
              <p style="margin: 0; font-size: 11px; color: #71717A;">
                &copy; ${new Date().getFullYear()} ${BRAND_CONFIG.name}. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Direct mailing dispatcher using Resend.
 * If RESEND_API_KEY is not provided, it logs the lead safely without crashing.
 */
export async function sendContactEmail(params: ContactEmailParams): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn(
      "[Hextel Tech Mailer] RESEND_API_KEY is not defined. Email dispatch skipped. Lead recorded in console."
    );
    return {
      sent: false,
      provider: "none",
      note: "RESEND_API_KEY not configured. Set RESEND_API_KEY in .env.local to enable live delivery.",
    };
  }

  const resend = new Resend(apiKey);
  const toEmail = process.env.CONTACT_TO_EMAIL || BRAND_CONFIG.email;
  // Resend default verified sender for development is onboarding@resend.dev,
  // or custom domain like contact@hexteltech.com once domain DNS is added in Resend dashboard:
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "Hextel Tech Leads <onboarding@resend.dev>";

  try {
    // 1. Dispatch internal team notification email
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: params.email,
      subject: `[New Lead] ${params.service} — ${params.name} (${params.referenceId})`,
      html: buildAdminNotificationHtml(params),
    });

    if (error) {
      console.error("[Hextel Tech Mailer] Resend API Error:", error);
      return {
        sent: false,
        provider: "resend",
        note: error.message,
      };
    }

    // 2. Optionally send confirmation receipt to the prospective client
    if (process.env.SEND_CLIENT_RECEIPT === "true") {
      try {
        await resend.emails.send({
          from: fromEmail,
          to: [params.email],
          replyTo: toEmail,
          subject: `We received your inquiry — ${BRAND_CONFIG.name} [${params.referenceId}]`,
          html: buildClientReceiptHtml(params),
        });
      } catch (receiptErr) {
        console.warn("[Hextel Tech Mailer] Client receipt email skipped:", receiptErr);
      }
    }

    return {
      sent: true,
      provider: "resend",
      id: data?.id,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    console.error("[Hextel Tech Mailer] Unexpected dispatch failure:", errorMsg);
    return {
      sent: false,
      provider: "resend",
      note: errorMsg,
    };
  }
}
