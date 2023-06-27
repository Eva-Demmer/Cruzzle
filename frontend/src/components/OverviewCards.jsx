import PropTypes from "prop-types";

function OverviewCards({ icon: Icon, title, value }) {
  return (
    <div className="h-36 w-40 md:w-52 shadow-md rounded-2xl flex flex-col relative">
      {Icon && (
        <div className="absolute top-[-10px] md:top-[-18px] left-[-10px] md:left-[-18px]">
          <Icon className="h-8 md:h-10 w-8 md:w-10 text-primary-900 fill-current" />
        </div>
      )}
      <div className="flex flex-col justify-between h-full">
        <h3 className="text-black text-lg md:text-xl px-5 pt-5">{title}</h3>
        <h2 className="text-black text-2xl md:text-3xl px-5 pb-5">{value}</h2>
      </div>
    </div>
  );
}

OverviewCards.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default OverviewCards;
