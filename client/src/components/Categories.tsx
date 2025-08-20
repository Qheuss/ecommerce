interface CategoriesProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const Categories = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoriesProps) => {
  return (
    <aside className='w-48 p-4 border-r'>
      <h2 className='text-xl font-bold mb-4'>Categories</h2>
      <ul className='space-y-2'>
        <li
          className={`cursor-pointer ${
            selectedCategory === null ? 'font-bold' : ''
          }`}
          onClick={() => onSelectCategory(null)}
        >
          All
        </li>
        {categories.map((category) => (
          <li
            key={category}
            className={`cursor-pointer ${
              selectedCategory === category ? 'font-bold' : ''
            }`}
            onClick={
              selectedCategory === category
                ? () => onSelectCategory(null)
                : () => onSelectCategory(category)
            }
          >
            {category}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Categories;
