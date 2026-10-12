import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, service, message, honeypot, referenceId, ndaPassword, utm } = body;

    // Silent honeypot drop for bot crawlers
    if (honeypot) {
      return NextResponse.json({ success: true, message: "Message received." });
    }

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message content is required." },
        { status: 400 }
      );
    }

    const leadRef = referenceId || `HEX-${Math.floor(10000 + Math.random() * 90000)}`;

    console.log("[Hextel Tech] Processing Lead Submission:", {
      referenceId: leadRef,
      name,
      email,
      service,
      hasNdaCode: Boolean(ndaPassword),
      utmAttribution: utm || {},
      timestamp: new Date().toISOString(),
    });

    // Direct mailing dispatch via Resend (isolated server-side)
    const emailResult = await sendContactEmail({
      name: name.trim().slice(0, 100),
      email: email.trim().slice(0, 255),
      service: typeof service === "string" ? service.trim().slice(0, 100) : "General Inquiry",
      message: message.trim().slice(0, 5000),
      referenceId: leadRef,
      ndaPassword: typeof ndaPassword === "string" ? ndaPassword.trim().slice(0, 100) : undefined,
      utm,
    });

    console.info(`[Hextel Tech] Email dispatch completed for ${leadRef}. Sent: ${emailResult.sent}`);

    return NextResponse.json(
      {
        success: true,
        referenceId: leadRef,
        message: "Your message has been sent successfully. We will get in touch shortly.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Hextel Tech] API Error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
