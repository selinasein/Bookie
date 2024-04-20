import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";

export const sesClient = new SESClient({
  region: "us-west-2",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID!,
    secretAccessKey: process.env.ACCESS_KEY!,
  },
});

export const createSendEmailCommand = (toAddress: string) => {
  var htmlBody = `<!DOCTYPE html>
      <html>
        <body>
          <h1>You just created a new Note!</h1>
          <p>Great job creating an all new note!</p>
        </body>
      </html>`;

  return new SendEmailCommand({
    Destination: {
      ToAddresses: [toAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: htmlBody,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "You added a new note!",
      },
    },
    Source: "neulmisscj@gmail.com",
    ReplyToAddresses: [],
  });
};
