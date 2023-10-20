import {firebaseAdmin} from '../../firebaseAdmin';

export default async function handler(req, res) {
    if(req.method === "POST"){
        let details = req.body.details;
      const famCheck = firebaseAdmin.firestore().collection('families').doc(details.familyCode);
        const famCheckDoc = await famCheck.get();
        if (!famCheckDoc.exists) {
          if(!details.senior){
          const doc = await famCheck.set({
              members: [
                {name: details.name,
                phone: details.phone,
                pfp: details.pfp
                }
              ], 
              seniors: 0
          });
        }
        else{
            const doc = await famCheck.set({
                members: [
                ],
                seniors: 1
            });
        }
          res.status(201).json(false)

        } else {
            //code to join a family
            console.log(famCheckDoc.data())
          let seniors = famCheckDoc.data().seniors;
          let members = [];
          if(famCheckDoc.data().members){
        members = members.concat(famCheckDoc.data().members);
          }
          members.push({name: details.name,
            phone: details.phone,
            pfp: details.pfp
            })
          
        if(!details.senior){

          const doc = await famCheck.update({
              members: members, 
          });
        }
        else{
            seniors++;

            const doc = await famCheck.update({
               
                seniors: seniors
            });
        }
        res.status(201).json(false)

        }
       
        
       
    }
  }
  