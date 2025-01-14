var crypto = require('crypto');
const session = require('express-session');

// On définit notre algorithme de cryptage
const algorithm = 'aes-256-cbc';

// Notre clé de chiffrement, elle est souvent générée aléatoirement mais elle doit être la même pour le décryptage
const suffixKey = 'Son!cTheH€dg3h0g';

const iv = crypto.randomBytes(16);  // Générer un IV aléatoire (pour chaque chiffrement)


// source : https://www.babeuloula.fr/blog/crypter-et-decrypter-une-chaine-de-caracteres-avec-node-js.html
// updated by ChatGPT


function crypt(ip, echeance, pwdDecrypted) {
    try {
        // Combiner ip, echeance et suffixKey pour créer la clé
        const key = Buffer.from(ip + echeance + suffixKey, 'utf8').slice(0, 32);  // La clé doit être de 32 octets pour aes-256-cbc
        
        // Créer le chiffreur avec la clé et l'IV
        const cipher = crypto.createCipheriv(algorithm, key, iv);

        // Chiffrer le mot de passe
        let crypted = cipher.update(pwdDecrypted, 'utf8', 'hex');
        crypted += cipher.final('hex');

        // Retourner le texte chiffré avec l'IV (pour pouvoir le déchiffrer plus tard)
        // L'IV est généralement stocké avec le texte chiffré ou transmis séparément
        return iv.toString('hex') + crypted; // Préfixer le texte chiffré avec l'IV
    } catch (err) {
        console.error("fct crypted : " + err);
    }
}

function decrypt(req) {
    try {
        // Extraire l'IV et le texte chiffré de la chaîne reçue
        const iv = Buffer.from(req.session.jeton["password"].slice(0, 32), 'hex'); // L'IV est stocké dans les 16 premiers octets
        const encryptedPassword = req.session.jeton["password"].slice(32); // Le texte chiffré commence après l'IV

        // Combiner ip, echeance et suffixKey pour créer la clé
        const key = Buffer.from(req.session.jeton["ip"] + req.session.jeton["echeance"] + suffixKey, 'utf8').slice(0, 32);

        // Créer le déchiffreur avec la clé et l'IV
        const decipher = crypto.createDecipheriv(algorithm, key, iv);

        // Déchiffrer le texte chiffré
        let dec = decipher.update(encryptedPassword, 'hex', 'utf8');
        dec += decipher.final('utf8');

        return dec;
    } catch (err) {
        console.error("fct decrypted : " + err);
    }
}

/*
function crypt(ip, echeance, pwdDecrypted){
    try {
        key = ip + echeance + suffixKey;

        cipher = crypto.createCipher(algorithm,key);
        crypted = cipher.update(pwdDecrypted,'utf8','hex');
        crypted += cipher.final('hex');

        return crypted;
    }
    catch(err){
        console.error("fct crypted : " + err);
    }
}

function decrypt(req){
    try{
        key = req.session.jeton["ip"] + req.session.jeton["echeance"] + suffixKey;

        decipher = crypto.createDecipher(algorithm,key);
        dec = decipher.update(req.session.jeton["password"],'hex','utf8');
        dec += decipher.final('utf8');

        return dec;
    }
    catch(err){
        console.error("fct decrypted : " + err);
    }
}
*/

module.exports = { crypt, decrypt};