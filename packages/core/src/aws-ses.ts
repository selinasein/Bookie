import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";

export const sesClient = new SESClient({
  region: "us-west-2",
  credentials: {
    accessKeyId: "AKIA5PO6JV2SZXG2EBBF",
    secretAccessKey: "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",
  },
});

export const createSendEmailCommand = (toAddress: string) => {
  var htmlBody = `<!DOCTYPE html>
      <html>
        <body>
          <h1>A user added a comment to your note!!</h1>
          <p>Hi there! Soneone just commented on a note of yours!</p>
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
        Data: "A user added a comment to your note!!",
      },
    },
    Source: "neulmisscj@gmail.com",
    ReplyToAddresses: [],
  });
};
