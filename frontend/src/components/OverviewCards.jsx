import PropTypes from "prop-types";

function OverviewCards({ icon: Icon, title, value }) {
  return (
    <div className="h-32 w-68 shadow-md rounded-2xl flex flex-col relative">
      {Icon && (
        <div className="absolute top-[-18px] left-[-18px]">
          <Icon className="h-10 w-10 text-primary-900 fill-current" />
        </div>
      )}
      <div className="m-5">
        <h3 className="text-black">{title}</h3>
        <h2 className="text-black text-4xl">{value}</h2>
      </div>
    </div>
  );
}

OverviewCards.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default OverviewCards;
