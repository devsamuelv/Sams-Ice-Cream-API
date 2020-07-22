import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { IceCream, Admin } from './models';
import { HttpsError } from 'firebase-functions/lib/providers/https';

admin.initializeApp(functions.config());
const DB = admin.firestore();
const iceCreamDB = DB.collection('ice-cream');
const adminDB = DB.collection('users');

export const createIceCream = functions.https.onRequest((req, res) => {
    const data: IceCream = req.body;
    
    if (data.name === null) { throw new HttpsError('invalid-argument', "ice cream name not sent"); }

    if (data.photoURL === null) { throw new HttpsError('invalid-argument', "ice cream photoURL not sent"); }

    if (data.price === null) { throw new HttpsError('invalid-argument', "ice cream price not sent"); }

    if (data.status === null) { throw new HttpsError('invalid-argument', "ice cream status not sent"); }

    if (data.id === null) { throw new HttpsError('invalid-argument', "ice cream id not sent"); }

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

export const CreateAdmin = functions.https.onRequest((req, res) => {
    const data: Admin = req.body;

    if (data.name === null) { throw new HttpsError('invalid-argument', "admin name not sent"); }

    if (data.admin === null) { throw new HttpsError('invalid-argument', "admin value not sent"); }

    if (data.profileLogoURL === null) { throw new HttpsError('invalid-argument', "admin profileURL not sent"); }

    if (data.sentInvite === null) { throw new HttpsError('invalid-argument', "admin sentInvite not sent"); }

    if (data.uid === null) { throw new HttpsError('invalid-argument', "admin uid not sent"); }

    if (data.waiting === null) { throw new HttpsError('invalid-argument', "admin waiting not sent"); }

    const admindata = {
        admin: true
    }

    adminDB.doc(data.uid).set(admindata, { merge: true }).catch((err) => {
        console.error(err);
    })

})