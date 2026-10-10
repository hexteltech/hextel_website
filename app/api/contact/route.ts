import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, service, message, honeypot } = body;

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

    // In production, integrate here with Resend, SendGrid, AWS SES, or database:
    // await resend.emails.send({ ... });
    console.log("[Hextel Tech] New Lead Received:", {
      name,
      email,
      service,
      messagePreview: message.slice(0, 100),
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
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
