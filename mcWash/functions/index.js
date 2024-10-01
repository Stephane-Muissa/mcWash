const functions = require("firebase-functions");
const admin = require("firebase-admin");


admin.initializeApp();

const username = "sandbox";
const apiKey = "atsk_95ad7a6aff58f993082c9563f61027126cb51d4ffb596f1"+
"671ea3af334c1af8"+
"dddde4b2a";
const senderId = "6512";
const africasTalkingClient = require("africastalking")({username, apiKey});

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
          const response = await africasTalkingClient.SMS.send({
            to: recipientNumbers,
            message: messageBody,
            from: senderId,
          });
          console.log("SMS sent:", response);
        } catch (error) {
          console.error("Error sending SMS:", error);
        }
      }
      return null;
    });
