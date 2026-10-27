import { NextResponse } from "next/server";
import { Resend } from "resend";
import { inquirySchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const result = inquirySchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Validation failed",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = result.data;

    // Honeypot check: If bot filled the hidden website field, return success silently
    if (data.website && data.website.length > 0) {
      return NextResponse.json({
        ok: true,
        message: "Inquiry received.",
      });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail =
      process.env.INQUIRY_RECIPIENT_EMAIL || "consultations@naqsh.pk";

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);

      await resend.emails.send({
        from: "Naqsh Website <onboarding@resend.dev>",
        to: [recipientEmail],
        replyTo: data.email,
        subject: `New Corporate Gifting Inquiry: ${data.name} · ${data.company}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #2A2725; background: #F7F1E7;">
            <div style="border-bottom: 2px solid #7F3021; padding-bottom: 16px; margin-bottom: 24px;">
              <h1 style="font-size: 24px; margin: 0; color: #000000; letter-spacing: 0.1em; text-transform: uppercase;">NAQSH</h1>
              <p style="margin: 4px 0 0; color: #7F3021; font-size: 13px; letter-spacing: 0.15em; text-transform: uppercase;">Corporate Gifting Consultation Request</p>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #4D4E52; width: 140px;"><strong>Client Name:</strong></td>
                <td style="padding: 8px 0; color: #000000;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #4D4E52;"><strong>Company:</strong></td>
                <td style="padding: 8px 0; color: #000000;">${data.company}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #4D4E52;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; color: #000000;"><a href="mailto:${data.email}">${data.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #4D4E52;"><strong>Phone / WhatsApp:</strong></td>
                <td style="padding: 8px 0; color: #000000;">${data.phone || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #4D4E52;"><strong>Occasion:</strong></td>
                <td style="padding: 8px 0; color: #7F3021; font-weight: bold;">${data.occasion}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #4D4E52;"><strong>Estimated Count:</strong></td>
                <td style="padding: 8px 0; color: #000000;">${data.quantity || "Not specified"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #4D4E52;"><strong>Target Date:</strong></td>
                <td style="padding: 8px 0; color: #000000;">${data.dateNeeded || "Flexible"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #4D4E52;"><strong>Budget Scope:</strong></td>
                <td style="padding: 8px 0; color: #000000;">${data.budgetRange || "To be discussed"}</td>
              </tr>
            </table>

            <div style="background: #EFE8DC; padding: 16px; border-left: 3px solid #7F3021; margin-bottom: 24px;">
              <p style="margin: 0 0 8px; font-weight: bold; color: #000000; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;">Client Project Notes:</p>
              <p style="margin: 0; white-space: pre-wrap; color: #2A2725; font-size: 14px; line-height: 1.6;">${data.message || "No additional notes provided."}</p>
            </div>

            <footer style="font-size: 12px; color: #737478; border-top: 1px solid rgba(0,0,0,0.1); padding-top: 16px;">
              Sent via Naqsh Consultation Portal · Lahore, Pakistan
            </footer>
          </div>
        `,
      });
    } else {
      // Local dev & stub fallback: Log consultation payload cleanly to console
      console.log(
        "\n=======================================================\n" +
          " [DEV INQUIRY LOG] New Corporate Gifting Consultation:\n" +
          "-------------------------------------------------------\n" +
          ` Name:         ${data.name}\n` +
          ` Company:      ${data.company}\n` +
          ` Email:        ${data.email}\n` +
          ` Phone:        ${data.phone || "N/A"}\n` +
          ` Occasion:     ${data.occasion}\n` +
          ` Quantity:     ${data.quantity || "N/A"}\n` +
          ` Date Needed:  ${data.dateNeeded || "N/A"}\n` +
          ` Budget:       ${data.budgetRange || "N/A"}\n` +
          ` Message:      ${data.message || "N/A"}\n` +
          "=======================================================\n"
      );
    }

    return NextResponse.json({
      ok: true,
      message:
        "Thank you for contacting Naqsh. Your inquiry has been received, and our curators will reach out within 24 business hours.",
    });
  } catch (error) {
    console.error("Inquiry API Error:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "An unexpected error occurred while processing your request.",
      },
      { status: 500 }
    );
  }
}
