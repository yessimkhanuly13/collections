const Router = require('express');
const searchRouter = new Router();
const Item = require('../models/Item')


searchRouter.get('/', async(req, res) => {
    try {
      if(req.query.q){
        const topic = await Item.aggregate([
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

        const desc = await Item.aggregate([
          {
            $search: {
              index: "autocomplete",
              autocomplete: {
                query: req.query.q,
                path: "desc",
                tokenOrder: "sequential",
              },
            },
          },
          {
            $project: {
              desc: 1,
              _id: 1
            },
          },
          {
            $limit: 10
          }
        ]);

        const mergedArr = [...topic, ...desc]
        console.log(mergedArr)

        res.json(mergedArr || []);
      }else{
        res.json([])
      }

    } catch (e) {
        console.log(e);
        res.json({message : "Something wen wrong!"})
    }
});


module.exports = searchRouter;