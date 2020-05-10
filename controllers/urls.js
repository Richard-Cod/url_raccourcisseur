const Url = require('../models/URL');


exports.url_get_all = function (req, res) {
    try {
      Url.find(function (err, docs) {
        res.json(docs)
      });
    } catch (error) {
        res.status(500).json("Erreur du serveur")
    }
  }


exports.url_shortener = async function (req, res) {
  
  const {longueUrl} = req.body
  try {
      let url = await Url.findOne({longueUrl})
  //Si l'url existe déja on la renvoie sans rien faire 
      if(url){
        res.status(200).json({status:"Déja existant ",courteUrl : url.courteUrl})
      }

      //Si l'url n'existe pas il faut donc la raccourcir et l'envoyer
      url = new Url();
      url.setUrlCode();
      url.longueUrl = longueUrl
      url.courteUrl = url.makeRaccourcis()


      //Inserer dans la bdd
      //Url.insert(url)
      await url.save();
      
      res.status(200).json({status:"Insertion ",courteUrl : url.courteUrl})



  } catch (error) {
    res.status(500).json("Erreur du serveur")
    
  }

}


exports.url_get_one = async function (req, res) {
  try {
    urlCode = req.params.urlCode
    const url = await Url.findOne({urlCode})
    res.status(200).json({url})
  }
  catch (error) {
     res.status(500).json("Erreur du serveur")
  }



  
}

