const CategorySchema = require("../SchemaModels/CategorySchema");
const getallCategories = require("../Utils/GetAllCategories");

const createCategory = (req, res) => {
  CategorySchema.create({ ...req.body })
    .then((category) => res.send(category))
    .catch((err) => res.status(500).send(err));
};

const getCategory = async (req, res) => {
  try {
    const allcategories = await CategorySchema.find({});
    const list = await getallCategories(allcategories);

    return res.send(list);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const updateCategory = (req, res) => {
  CategorySchema.findByIdAndUpdate(
    { _id: req.body._id },
    { $set: { ...req.body } },
    { new: true }
  )
    .then((category) => res.send({ message: "Category updated successfully" }))
    .catch((error) => {
      return res.status(500).send(error);
    });
};

const deleteCategory = (req, res) => {
  CategorySchema.deleteMany({
    $or: [{ _id: req.params.category }, { parent: req.params.category }],
  })
    .then((result) => res.send({ message: "Category deleted successfully" }))
    .catch((err) =>
      res.status(500).send({ error: "Error in Deleting category" })
    );
};

module.exports.createCategory = createCategory;
module.exports.getCategory = getCategory;
module.exports.updateCategory = updateCategory;
module.exports.deleteCategory = deleteCategory;
