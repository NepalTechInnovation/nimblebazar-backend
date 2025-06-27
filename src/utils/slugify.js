const generateUniqueSlug = async (name, model, prisma) => {
    let slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '') || `item-${Date.now()}`;
  
    let originalSlug = slug;
    let counter = 1;
  
  
    while (await prisma[model].findUnique({ where: { slug } })) {
      slug = `${originalSlug}-${counter}`;
      counter++;
    }
  
    return slug;
  };
  
  module.exports = generateUniqueSlug;
  