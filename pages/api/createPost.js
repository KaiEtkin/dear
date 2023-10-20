import {firebaseAdmin} from '../../firebaseAdmin';

export default async function handler(req, res) {
    if(req.method === "POST"){
        const date = new Date();
        let dateString = date.toLocaleString();
        dateString = dateString.split('/').join('-')

          const postRef = firebaseAdmin.firestore().collection('families').doc(req.body.familyCode).collection("posts").doc(dateString);
        
          const doc = await postRef.set({
              file: req.body.file,
              name: req.body.name,
                caption: req.body.caption,
          });
        }
       
  }
  