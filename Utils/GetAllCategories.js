const getallCategories = (allcategories, parentId) => {
  const categoriesList = [];
  let categories;
  if (parentId == null) {
    categories = allcategories.filter((category) => category.parent == null);
  } else {
    categories = allcategories.filter((category) => category.parent == parentId);
  }
  
  for (let category of categories) {
    categoriesList.push({
      main: category.category,
      sub: getallCategories(allcategories, category._id.toString()),
    });
  }
  
  return categoriesList;
};

module.exports = getallCategories;