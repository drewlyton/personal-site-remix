import client from "@sendgrid/client";
import mail from "@sendgrid/mail";
client.setApiKey(process.env.SENDGRID_API_KEY);
mail.setApiKey(process.env.SENDGRID_API_KEY);

export { client as sendgridClient, mail as sendgridMailer };
