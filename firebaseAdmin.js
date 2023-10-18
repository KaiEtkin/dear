
import * as firebaseAdmin from 'firebase-admin';

// get this JSON from the Firebase board
// you can also store the values in environment variables

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: process.env.NEXT_PUBLIC_PRIVATEKEY.replace(/\\n/g, '\n'),
      clientEmail: process.env.NEXT_PUBLIC_CLIENTEMAIL,
      projectId: process.env.NEXT_PUBLIC_PROJECTID,
    }),
    
  });
}

export { firebaseAdmin };