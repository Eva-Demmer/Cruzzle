import PropTypes from "prop-types";
import CategoryIcon from "../../assets/dashboard/Category_icon.svg";

function CategoryCards({ categoryName, categoryColor }) {
  // Change opacity of color which is in rgba format in db
  const color = categoryColor.split("(")[1].split(")")[0].split(",");

  return (
    <div className="px-2 py-4 w-28 h-32 flex flex-col justify-between items-center text-center gap-1 rounded-3xl border border-solid border-gray-400">
      <div
        className="h-10 w-10 flex justify-center items-center rounded-full"
        style={{
          backgroundColor: `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.3)`,
        }}
      >
        <img src={CategoryIcon} alt="categories" className="h-5" />
      </div>
      <span className="h-10 flex items-center">{categoryName}</span>
    </div>
  );
}

CategoryCards.propTypes = {
  categoryName: PropTypes.string.isRequired,
  categoryColor: PropTypes.string.isRequired,
};

export default CategoryCards;
