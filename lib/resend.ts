import { Resend } from "resend";

export async function notifyNewLead(firstName: string, whatsapp: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BRUNO_NOTIFICATION_EMAIL;

  if (!apiKey || !to) return;

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: "Fly Prep <waitlist@flyprep.com>",
    to,
    subject: `New founder lead: ${firstName}`,
    text: `New waitlist signup.\n\nName: ${firstName}\nWhatsApp: ${whatsapp}`,
  });
}
