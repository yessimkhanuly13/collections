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

        const customField1_value = await Item.aggregate([
          {
            $search: {
              index: "autocomplete",
              autocomplete: {
                query: req.query.q,
                path: "customField1_value",
                tokenOrder: "sequential",
              },
            },
          },
          {
            $project: {
              customField1_value: 1,
              _id: 1
            },
          },
          {
            $limit: 10
          }
        ]);

        const customField2_value = await Item.aggregate([
          {
            $search: {
              index: "autocomplete",
              autocomplete: {
                query: req.query.q,
                path: "customField2_value",
                tokenOrder: "sequential",
              },
            },
          },
          {
            $project: {
              customField2_value: 1,
              _id: 1
            },
          },
          {
            $limit: 10
          }
        ]);

        const customField3_value = await Item.aggregate([
          {
            $search: {
              index: "autocomplete",
              autocomplete: {
                query: req.query.q,
                path: "customField3_value",
                tokenOrder: "sequential",
              },
            },
          },
          {
            $project: {
              customField3_value: 1,
              _id: 1
            },
          },
          {
            $limit: 10
          }
        ]);

        const mergedArr = [...topic, ...desc, ...customField1_value, ...customField2_value, ...customField3_value]

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