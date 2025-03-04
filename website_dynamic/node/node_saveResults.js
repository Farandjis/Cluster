const express = require('express');
const bodyParser = require('body-parser');
const { format } = require('date-fns');
const router = express.Router();
const { userIsConnected } = require('./node_functions');
const du = require('du')
const diskusage = require('diskusage');
const path = require('path');

const fsPromises = require('fs').promises;
const fs = require('fs');

const data = JSON.stringify({ key: 'value' }, null, 2); // Exemple de données JSON


async function notifPreparation(saveAuthorization, deletionAuthorization, stdout, req, res, module, dbUser){

          let stringlistOfDeletedSaves = ""
          let varNotif_title = undefined;
          let varNotif_aboutFiles = "";
          let varNotif_message = "";


          
          try{
            const resDB = await dbUser.promise().query(
              'SELECT saveUserSettings_AutoSave, saveUserSettings_AutoDeletion FROM view_USER_SETTINGS'
            );

            saveUserSettings_AutoSave = Boolean(resDB[0][0]['saveUserSettings_AutoSave'])
            saveUserSettings_AutoDeletion = Boolean(resDB[0][0]['saveUserSettings_AutoDeletion'])

            if (saveUserSettings_AutoSave != saveAuthorization || saveUserSettings_AutoDeletion != deletionAuthorization){
              const updateInfo = `UPDATE view_USER_SETTINGS SET saveUserSettings_AutoSave = ?, saveUserSettings_AutoDeletion = ?`;
              dbUser.promise().query(updateInfo, [saveAuthorization, deletionAuthorization]);
            }
          }
          catch(error){
            console.error("⚠️ Pb lors de la sauvegarde des paramètres sauvegardes auto:", error.message);
          }


          if(saveAuthorization){
              let [saveSuccessResultatFct, listFiles, titleFile] = await saveResultInOnDisk(stdout, module, req, res, deletionAuthorization);

              let saveSuccess = saveSuccessResultatFct[0]
              varNotif_message = saveSuccessResultatFct[1]

              for (const file of listFiles){
                  stringlistOfDeletedSaves += `${file}<br>`
              } 

              if (saveSuccess == true){
                  varNotif_title = `Sauvegarde réussite !`;
              }
              else {
                varNotif_title = `Erreur: ${saveSuccess}`;
              }

              if (titleFile == undefined){
                varNotif_aboutFiles = "Le fichier n'a pas été créé.<br><br>"
              }
              else {
                varNotif_aboutFiles = `Fichier créé :<br>${titleFile}.json<br><br>`
              }

              if (stringlistOfDeletedSaves == ""){
                varNotif_aboutFiles += `Aucune suppression.`
              }
              else if(listFiles.length == 1) {
                varNotif_aboutFiles += `Fichier supprimé :<br>${stringlistOfDeletedSaves}`
              }
              else {
                varNotif_aboutFiles += `Fichiers supprimés :<br>${stringlistOfDeletedSaves}`
              }


          }

          return [varNotif_title, varNotif_message, varNotif_aboutFiles]
}


async function getSizeFolder(pathRepertoryUser ) {
  return new Promise((resolve, reject) => {
      du(pathRepertoryUser , (err, size) => {
          if (err) {
              console.error('Erreur:', err);
              reject(err);
              return;
          }
          resolve(size);
      });
  });
}


async function autoDeletion(dbUser, errorName, sizeFile = undefined){
  [res] = await dbUser.promise().query('SELECT id_user FROM view_USER_PROFILE;');
  const id = res[0].id_user;

  let pathRepertoryUser = `/DATA_USERS/${id}/`

  let listOfDeletedSaves = [];


  if (errorName == "error_count"){
    // delete old files (remind : 20 files max by users)

    let [res] = await dbUser.promise().query('SELECT filename FROM `Paralix`.User_History ORDER BY time DESC LIMIT 100 OFFSET 19;');

    for (const row of res){

      filename = row.filename

      await dbUser.promise().query(
        'DELETE FROM User_History WHERE filename = ?', 
        [filename]
      );

      try{
        fs.unlinkSync(pathRepertoryUser  + filename);
        listOfDeletedSaves.push(filename);
      }catch(err){
      }

    }

  }
  else if (errorName == "error_sizeFolder"){
    let [res] = await dbUser.promise().query('SELECT filename FROM `Paralix`.User_History ORDER BY time DESC;');

    sizeDirectory = await getSizeFolder(pathRepertoryUser );

    let i = 0;
    while(i < res.length && (sizeDirectory - 4096) > 102400){
        filename = res[i].filename;

        await dbUser.promise().query(
          'DELETE FROM User_History WHERE filename = ?', 
          [filename]
        );

        try{
          fs.unlinkSync(pathRepertoryUser  + filename);
          listOfDeletedSaves.push(filename);
        }catch(err){
        }

        sizeDirectory = await getSizeFolder(pathRepertoryUser );
        i++;
    }
  }
  else if (sizeFile != undefined && (errorName == "error_noRepertorySpaceLeft" || errorName == "error_NoDiskSpaceLeft")){
    // deletes old files until there's enough room for a new one -- NOTE: if the file exceeds the limit allowed per directory, it is not affected by this if

    let [res] = await dbUser.promise().query('SELECT filename FROM `Paralix`.User_History ORDER BY time DESC;');

    sizeDirectory = await getSizeFolder(pathRepertoryUser );

    let i = 0;
    while(i < res.length && (102400 - sizeDirectory) < sizeFile){
        filename = res[i].filename;

        await dbUser.promise().query(
          'DELETE FROM User_History WHERE filename = ?', 
          [filename]
        );

        try{
          fs.unlinkSync(pathRepertoryUser  + filename);
          listOfDeletedSaves.push(filename);
        }catch(err){
        }

        sizeDirectory = await getSizeFolder(pathRepertoryUser );
        i++;
    }
  }

  return listOfDeletedSaves;
}



async function possibleToSave(dbUser, sizeFile = undefined){
  /**
   * PRINCIPLE :
   *    Test if it's possible to save the results on the disk
   * INPUT :
   *    dbUser -> connection to the db
   * RETURN :
   *    true -> if it's possible
   *    [string, info] -> errors
   */

  if (sizeFile != undefined && sizeFile > 102400){
    // If the file exceeds the directory size limit
    return ["error_fileTooBig", "La sauvegarde dépasse la taille de sauvegarde autorisé."];
  }

  let [res] = await dbUser.promise().query('SELECT COUNT(*) AS count FROM Paralix.User_History;');
  const count = res[0].count;


  const diskPath = path.resolve('/DATA_USERS');
  const free = diskusage.checkSync(diskPath).free;

  if (sizeFile != undefined && sizeFile > free){
    if (count == 0){
      return ["error_noDiskSpaceLeft_And_NoFileToDelete", "Il n'y a plus d'espace disponible sur le disque malgré votre répertoire vide, veuillez contacter l'administrateur."];
    }
    // if no disk space left
    return ["error_noDiskSpaceLeft", "Il n'y a plus d'espace disponible sur le disque, veuillez contacter l'administrateur."];
  }




  [res] = await dbUser.promise().query('SELECT id_user FROM view_USER_PROFILE;');
  const id = res[0].id_user;


  pathRepertoryUser = `/DATA_USERS/${id}/`
  
  if (!fs.existsSync(pathRepertoryUser)){
      return true;
  }


  const sizeDirectory = await getSizeFolder(pathRepertoryUser);

  
  if (count >= 20){
    return ["error_count", "Vous avez atteint la limite de 20 fichiers sauvegardés autorisés."];
  }
  else if((sizeDirectory - 4096) > 102400){
    // 102400 == 100ko
    // "- 4096" because sizeDirectory includes  the size of the directory element in addition to the size of all the files it contains
    if (count == 0){
      return ["error_sizeFolder_And_NoFileToDelete", "Votre répertoire dépasse la taille autorisé mais aucun fichier n'est répertorié, veuillez contacter l'administrateur."];
    }
    return ["error_sizeFolder", "Votre répertoire dépasse la taille autorisé, des fichiers."];
  }
  else if ((102400 - sizeDirectory) < sizeFile){
    // if tiles take to much place to save a new file
    if (count == 0){
      return ["error_noRepertorySpaceLeft_And_NoFileToDelete", "Il n'y a plus d'espace libre disponible dans votre répertoire mais aucun fichier n'est répertorié, veuillez contacter l'administrateur."]
    }
    return ["error_noRepertorySpaceLeft", "Il n'y a plus d'espace libre disponible dans votre répertoire."]
  }
  else {
    return [true, "Votre sauvegarde a été enregistré avec succès !"];
  }

}


async function saveResultInOnDisk(data, module, req, res, deletionAllowed){
  /**
   * PRINCIPLE : 
   *       Save data in a json file and lists it in the database for the user
   * INPUT :
   *       data -> data to save (the results)
   *       module -> name of the module
   */

  dbUser = await userIsConnected(req, res);

  if (dbUser != undefined){

    const [id_user] = await dbUser.promise().query('SELECT id_user FROM view_USER_PROFILE;');
    const id = id_user[0].id_user;

    pathRepertoryUser = `/DATA_USERS/${id}/`

    fsPromises.mkdir(pathRepertoryUser , { recursive: true }, (err) => {
              if (err && err.code !== 'EEXIST') {
                // Une autre erreur s'est produite
                console.error('node_saveResults - Erreur lors de la création du dossier:', err);
              } else {
                // console.log('Dossier créé ou déjà existant.');
              }
            });


    let listOfDeletedSaves = []
    resultatFctPossible = await possibleToSave(dbUser)
    possible = resultatFctPossible[0];
    possibleInfo = resultatFctPossible[1];

    isItNecessaryToProceedWithADeletion = (possible == "error_noDiskSpaceLeft" || possible == "error_noDiskSpaceLeft" || possible == "error_sizeFolder" || possible == "error_noRepertorySpaceLeft" || possible == "error_count")

    if ((!deletionAllowed) && isItNecessaryToProceedWithADeletion){
      return [[possible + "_AutoDeletionProhibited", possibleInfo + "Suppression automatique non autorisé par l'utilisateur."], listOfDeletedSaves, undefined];
    }
    while (isItNecessaryToProceedWithADeletion){
      listOfDeletedSaves.push(...await autoDeletion(dbUser, possible)); // According to ChatGPT : To add the individual elements of the returned array to your main array, use the decomposition operator (...).
      resultatFctPossible = await possibleToSave(dbUser)
      possible = resultatFctPossible[0];
      possibleInfo = resultatFctPossible[1];
      isItNecessaryToProceedWithADeletion = (possible == "error_noDiskSpaceLeft" || possible == "error_noDiskSpaceLeft" || possible == "error_sizeFolder" || possible == "error_noRepertorySpaceLeft" || possible == "error_count")

    }
    if (possible != true){
        // console.log("aille aille aille " + possible );
        return [[possible, possibleInfo], listOfDeletedSaves, undefined];
    }




    timestamp = format(new Date(), 'yyMMdd-HHmmss');
    random = Math.floor(Math.random() * 100000000);

    title_file = `${timestamp}_${module}_${random}`;




    // Écriture du fichier (le contenu sera remplacé s'il existe déjà)
    const success = await fsPromises.writeFile(`${pathRepertoryUser}${title_file}.json`, data, 'utf8')
    .then(() => {
      dbUser.promise().query(
        'INSERT INTO HISTORY(module, filename) VALUES (?, ?)', [module, `${title_file}.json`]
      );


      dbUser.end();
      return true;

    })
    .catch((err) => {
    console.error(`Erreur lors de l\'écriture du fichier de l\'user n°${id}:`, err);
    return err;
    });

    return [[success, possibleInfo], listOfDeletedSaves, title_file];
  }
  else {
    return [["dbUser is not defined", "Vous n'êtres pas connecté à la base de données. Veuillez vous reconnecter à Paralix, le cas échéant, veuillez contacter l'administrateur."], [], undefined];
  }
}

// Export functions
module.exports = { saveResultInOnDisk, possibleToSave, autoDeletion, notifPreparation};