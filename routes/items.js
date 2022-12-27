const express = require('express')
const router = express.Router()
const Item = require('../schemas/item')

//GET
router.get('/', async (req, res) => {
    try{
        const items = await Item.find()
        res.json(items)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//GET:id
router.get('/:id', getItem, (req, res) => {
    res.json(res.item)
})

//POST
router.post('/', async (req, res) => {
    const item = new Item({
        img: req.body.img,
        name: req.body.name,
        description: req.body.description,
        quests: req.body.quests,
        rank: req.body.rank,
        sources: req.body.sources,
        weapons: req.body.weapons,
        armour: req.body.armour,
        local: req.body.local,
        decorations: req.body.decorations
    })
    try{
        const newItem = await item.save()
        res.status(201).json(newItem)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//PATCH
router.patch('/:id', getItem, async (res, req) => {
    const item = new Item({
        name: req.body.name,
        description: req.body.description,
        quests: req.body.quests
    });
    try {
        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


//DELETE:id
router.delete('/:id', getItem, async (req, res) => {
    try {
      await res.item.remove();
      res.json({ message: 'Deleted Item' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

async function getItem(req, res, next)  {
    let item
    try{
        item = await Item.findById(req.params.id)
        if (item == null) {
            return res.status(404).json({ message: 'Not found'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message })
    }

    res.item = item
    next()
}

module.exports = router