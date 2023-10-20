
export default async function handler(req, res) {
    var twilio = require('twilio');

const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID;
const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN;
var client = new twilio(accountSid, authToken);



client.messages
  .create({
     body: "🤗 It's time to upload a photo or video for your senior! 🤗 \n Go upload at dear.fam/post!",
     from: '+18333564170',
     to: '+16502292092'
   })
  .then(message => res.status(201).json("done")
  );
  //gotta validate any phone numbers i wanna use
//set up cron job
}