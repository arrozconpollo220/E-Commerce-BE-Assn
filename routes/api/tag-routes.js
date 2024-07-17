const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
try {
  const tags = await Tag.findAll({include: [{ model: Product }],
  });
  res.status(200).json(tags)
} catch (error) {
  res.status(500).json(error.message)
}
});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, {include: [{ model: Product }]
    });
    res.status(200).json(tag)
  } catch (error) {
    res.status(500).json(error.message)
  }
});

router.post('/', async(req, res) => {
  // create a new tag
  try {
    const tag = await Tag.create(req.body)
    res.status(201).json(tag)
  } catch (error) {
    res.status(500).json(error.message)
  }
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagUpdate = await Tag.update(req.body, {where: {id:req.params.id}});
    res.status(200).json(tagUpdate)
  } catch (error) {
    res.status(500).json(error.message)
  }
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = await Tag.destroy({where: {id:req.params.id}})
  res.status(200).json(tag)
  } catch (error) {
    res.status(500).json(error.message) 
  }
});

module.exports = router;