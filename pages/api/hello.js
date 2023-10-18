import {firebaseAdmin} from '../../firebaseAdmin';

export default async function handler(req, res) {
    if(req.method === "POST"){

        const userRef = firebaseAdmin.firestore().collection('users').doc(req.body.uid);
        const doc = await userRef.set({
            textbooks: ["hMFck6Cx9VxrhRG8JkPo"]
        });
        
            res.status(201).json(false)
       
    }
  }
  