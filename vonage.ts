import { Vonage } from '@vonage/server-sdk';
import { Auth } from '@vonage/auth/dist/auth';
import { Text } from '@vonage/messages/dist/classes/WhatsApp/Text';
import { TemplateMessage } from '@vonage/messages/dist/classes/WhatsApp/TemplateMessage';
import { CustomMessage } from '@vonage/messages/dist/classes/WhatsApp/CustomMessage';

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

export function sendTemplate() {
  vonage.messages
    .send(
      new TemplateMessage(
        {
          name: `${WHATSAPP_TEMPLATE_NAMESPACE}:${WHATSAPP_TEMPLATE_NAME}`,
          parameters: ['Vonage Verification', '64873', '10'],
        },
        TO_NUMBER,
        WHATSAPP_NUMBER,
        'en_GB'
      )
    )
    .then((resp) => console.log(resp.message_uuid))
    .catch((err) => console.error(err));
}

export function sendCustom() {
  vonage.messages
    .send(
      new CustomMessage(
        {
          type: 'template',
          template: {
            namespace: `${WHATSAPP_TEMPLATE_NAMESPACE}`,
            name: `${WHATSAPP_TEMPLATE_NAME}`,
            language: {
              policy: 'deterministic',
              code: 'en',
            },
            components: [
              {
                type: 'body',
                parameters: [
                  {
                    type: 'text',
                    text: '*Ski Trip*',
                  },
                  {
                    type: 'text',
                    text: '2019-12-26',
                  },
                ],
              },
            ],
          },
        },
        TO_NUMBER,
        WHATSAPP_NUMBER
      )
    )
    .then((resp) => console.log(resp.message_uuid))
    .catch((err) => console.error(err));
}

// vonage.messages
//     .send(
//       new CustomMessage(
//         {
//           name: `${WHATSAPP_TEMPLATE_NAMESPACE}:${WHATSAPP_TEMPLATE_NAME}`,
//           components: [
//             {
//               type: 'BODY',
//               parameters: ['value1', 'value2'],
//             },
//           ],
//         },
//         TO_NUMBER,
//         WHATSAPP_NUMBER,
//         'en'
//       )
//     )
//     .then((resp) => console.log(resp.message_uuid))
//     .catch((err) => console.error(err));
