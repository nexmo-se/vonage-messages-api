import { Vonage } from '@vonage/server-sdk';
import { Auth } from '@vonage/auth/dist/auth';
import { Text } from '@vonage/messages/dist/classes/WhatsApp/Text';
import dotenv from 'dotenv';
dotenv.config();

const VONAGE_API_KEY = process.env.VONAGE_API_KEY;
const VONAGE_API_SECRET = process.env.VONAGE_API_SECRET;
const VONAGE_APPLICATION_ID = process.env.VONAGE_APPLICATION_ID;
const VONAGE_APPLICATION_PRIVATE_KEY_PATH =
  process.env.VONAGE_APPLICATION_PRIVATE_KEY_PATH;

const TO_NUMBER = process.env.TO_NUMBER || '';
const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || '';
const WHATSAPP_TEMPLATE_NAMESPACE = process.env.WHATSAPP_TEMPLATE_NAMESPACE;
const WHATSAPP_TEMPLATE_NAME = process.env.WHATSAPP_TEMPLATE_NAME;

if (
  !TO_NUMBER ||
  !WHATSAPP_NUMBER ||
  !WHATSAPP_TEMPLATE_NAMESPACE ||
  !WHATSAPP_TEMPLATE_NAME
) {
  console.log('TO_NUMBER', TO_NUMBER);
  console.log('WHATSAPP_NUMBER', WHATSAPP_NUMBER);
  console.log('WHATSAPP_TEMPLATE_NAMESPACE', WHATSAPP_TEMPLATE_NAMESPACE);
  console.log('WHATSAPP_TEMPLATE_NAME', WHATSAPP_TEMPLATE_NAME);
}

let auth = new Auth({
  apiKey: VONAGE_API_KEY,
  apiSecret: VONAGE_API_SECRET,
  applicationId: VONAGE_APPLICATION_ID,
  privateKey: VONAGE_APPLICATION_PRIVATE_KEY_PATH,
});

const vonage = new Vonage(auth);
// console.log('vonage', vonage);

export function sendMessage() {
  vonage.messages
    .send(
      new Text(
        'This is a WhatsApp Message text message sent using the Messages API',
        TO_NUMBER,
        WHATSAPP_NUMBER
      )
    )
    .then((resp) => {
      console.log(resp.message_uuid);
      return resp.message_uuid;
    })
    .catch((err) => console.error(err));
}
