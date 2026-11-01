import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const lead = await req.json();

    // Honeypot check for bots
    if (lead.honeypot) {
      return NextResponse.json({ success: true });
    }

    const {
      name,
      email,
      phone,
      companyName,
      requiredService,
      budget,
      projectDetails,
      preferredContactTime,
      sourcePage,
    } = lead;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required to submit lead." },
        { status: 400 }
      );
    }

    const leadRef = `CHAT-${Math.floor(10000 + Math.random() * 90000)}`;

    const messageLines = [
      "New prospective client inquiry captured via AI Chatbot Widget:",
      "",
      `• Required Service: ${requiredService || "General Consultation"}`,
      `• Project Budget: ${budget || "Not specified"}`,
      `• Preferred Contact Time: ${preferredContactTime || "Flexible"}`,
      `• Source Page: ${sourcePage || "Website Chatbot"}`,
      "",
      "Project Details & Scope:",
      projectDetails || "(No additional project details provided)",
    ];

    const emailResult = await sendContactEmail({
      name: name.slice(0, 100),
      email: email.trim().slice(0, 255),
      company: companyName ? companyName.slice(0, 150) : undefined,
      phone: phone ? phone.slice(0, 50) : undefined,
      service: requiredService || "AI Chatbot Lead",
      message: messageLines.join("\n"),
      referenceId: leadRef,
    });

    console.info(
      `[Chatbot Lead Captured] Reference: ${leadRef}, Name: ${name}, Email: ${email}, Sent: ${emailResult.sent}`
    );

    return NextResponse.json({
      success: true,
      referenceId: leadRef,
      message: "Lead received and team notified.",
    });
  } catch (error) {
    console.error("[Chatbot Lead API Error]:", error);
    return NextResponse.json(
      { error: "Failed to record lead information." },
      { status: 500 }
    );
  }
}
