const Router = require('express');
const searchRouter = new Router();
const Item = require('../models/Item')

searchRouter.get('/', async(req, res) => {
    try {
        const searchQuery = req.query.q;
        
        const pipeline = [];

        pipeline.push({
            $search: {
              index: "search",
              text: {
                query: `{desc: ${searchQuery} }`,
                path: {
                  wildcard: "*"
                }
              }
            }
          })
          
          const result = await Item.aggregate(pipeline);

          res.json(result);

    } catch (e) {
        console.log(e);
    }
});


module.exports = searchRouter;