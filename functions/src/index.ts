import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { IceCream } from './models';
import { HttpsError } from 'firebase-functions/lib/providers/https';

admin.initializeApp(functions.config());
const DB = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const iceCreamDB = DB.collection('ice-cream');

export const createIceCream = functions.https.onRequest((req, res) => {
    const data: IceCream = req.body;
    
    if (data.name == null) { throw new HttpsError('invalid-argument', "ice cream name not sent"); }

    if (data.photoURL == null) { throw new HttpsError('invalid-argument', "ice cream photoURL not sent"); }

    if (data.price == null) { throw new HttpsError('invalid-argument', "ice cream price not sent"); }

    if (data.status == null) { throw new HttpsError('invalid-argument', "ice cream status not sent"); }

    if (data.id == null) { throw new HttpsError('invalid-argument', "ice cream id not sent"); }

    const iceCreamData: IceCream = {
        id: data.id,
        name: data.name,
        photoURL: data.photoURL,
        price: data.price,
        status: data.status
    }

    iceCreamDB.doc(data.id).set(iceCreamData).catch((err) => {
        console.error(err);
    })
})