const functions = require("firebase-functions");
const admin = require("firebase-admin");
const twilio = require("twilio");

admin.initializeApp();

const accountSid = functions.config().twilio.sid;
const authToken = functions.config().twilio.token;
const twilioNumber = functions.config().twilio.number;
const twilioClient = twilio(accountSid, authToken);

exports.sendSmsOnChange = functions.firestore
    .document("orders/{docId}")
    .onWrite(async (change, context) => {
      const newValue = change.after.data();

      if (newValue) {
        const {
          address,
          package,
          date,
          email,
          name,
          phone,
          service,
          status,
          time,
          c2,
          c5,
          c8,
          fauteuil,
          matelat,
          traitementCeramique,
        } = newValue;


        const formattedPhone =
        phone.startsWith("0") ?
        `+243${phone.slice(1)}` : phone;


        let messageBody = `Mise à jour de la commande :\n`;

        if (name) messageBody += `Nom : ${name}\n`;
        if (address) messageBody += `Adresse : ${address}\n`;
        if (formattedPhone) messageBody += `Téléphone : ${formattedPhone}\n`;
        if (email) messageBody += `Email : ${email}\n`;
        if (service) messageBody += `Service : ${service}\n`;
        if (package) messageBody += `Forfait : ${package}\n`;
        if (date) messageBody += `Date : ${date}\n`;
        if (status) messageBody += `Statut : ${status}\n`;
        if (time) messageBody += `Heure : ${time}\n`;
        if (c2) messageBody += `Canapé 2 à 4 places: ${c2}\n`;
        if (c5) messageBody += `Canapé 5 à 7 places: ${c5}\n`;
        if (c8) messageBody += `Canapé 8 places et plus: ${c8}\n`;
        if (fauteuil) messageBody += `Fauteuil : ${fauteuil}\n`;
        if (matelat) messageBody += `Matelat : ${matelat}\n`;
        if (traitementCeramique) {
          messageBody += `Traitement Céramique : ${traitementCeramique}\n`;
        }
        messageBody += `\nMerci de votre confiance !`;
        messageBody += `\nFM Mobile Car Wash Detailing`;

        const recipientNumbers = [
          formattedPhone,
          "+243838584839",
          "+243892310580",
          "+243972508968",
        ];
        try {
          const sendSmsPromises = recipientNumbers.map(async (recipient) => {
            return await twilioClient.messages.create({
              body: messageBody.trim(),
              from: twilioNumber,
              to: recipient,
            });
          });
          const messages = await Promise.all(sendSmsPromises);
          messages.forEach((message) => console.log("SMS sent:", message.sid));
        } catch (error) {
          console.error("Error sending SMS:", error);
        }
      }
      return null;
    });
