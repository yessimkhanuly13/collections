const Router = require('express');
const searchRouter = new Router();
const Item = require('../models/Item')


searchRouter.get('/', async(req, res) => {
    try {
      if(req.query.q){
        let result = await Item.aggregate([
          {
            $search: {
              index: "autocomplete",
              autocomplete: {
                query: req.query.q,
                path: "topic",
                tokenOrder: "sequential",
              },
            },
          },
          {
            $project: {
              topic: 1,
              _id: 1
            },
          },
          {
            $limit: 10
          }
        ]);

        res.json(result || []);
      }else{
        res.json([])
      }

    } catch (e) {
        console.log(e);
        res.json({message : "Something wen wrong!"})
    }
});


module.exports = searchRouter;