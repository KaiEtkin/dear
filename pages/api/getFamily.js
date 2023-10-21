import {firebaseAdmin} from '../../firebaseAdmin';

export default async function handler(req, res) {
    if(req.method === "POST"){
       

          const postRef = firebaseAdmin.firestore().collection('families').doc(req.body.familyCode);
        
        const snapshot = await postRef.get();
        
          res.status(201).json(snapshot.data().members)

        }
       
  }
  