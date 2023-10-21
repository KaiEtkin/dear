import {firebaseAdmin} from '../../firebaseAdmin';

export default async function handler(req, res) {
    if(req.method === "POST"){
       

          const postRef = firebaseAdmin.firestore().collection('families').doc(req.body.familyCode).collection("posts");
        
        const snapshot = await postRef.get();
        if (snapshot.empty) {
            console.log('No matching documents.');
            res.status(201).json("no docs");
          }  
          let posts = [];
          snapshot.forEach(doc => {
            console.log(doc.id)
            posts.push({timestamp: doc.id, data: doc.data()})
          });
          res.status(201).json(posts)

        }
       
  }
  