import PropTypes from "prop-types";
import { Paper } from "@mui/material";

function IdeaCard({
  icon: Icon = null,
  rotate,
  cardTitle,
  state,
  isIcon = true,
}) {
  return (
    <Paper
      elevation={3}
      className="py-2 px-5 md:px-8 h-28 xl:h-24 xxl:h-28 w-full md:w-auto rounded-2xl flex flex-col relative"
    >
      {isIcon && (
        <Icon
          className={`h-8 md:h-10 w-8 md:w-10 absolute top-[-10px] md:top-[-18px] left-[-10px] md:left-[-18px] text-primary-900 fill-current rotate-${rotate}`}
        />
      )}

      {!isIcon && (
        <img
          src={Icon}
          alt={Icon}
          className={`h-8 md:h-10 w-8 md:w-10 absolute top-[-10px] md:top-[-18px] left-[-10px] md:left-[-18px] text-primary-900 fill-current rotate-${rotate}`}
        />
      )}

      <div className="flex flex-col justify-around h-full">
        <h3 className="text-black text-base md:text-xl pb-0 xl:pt-0 xxl:pt-2">
          {cardTitle}
        </h3>
        <h2 className="text-black text-3xl md:text-4xl xl:text-3xl xl:pb-0 xxl:pb-2 xxl:text-4xl pt-0">
          {state}
        </h2>
      </div>
    </Paper>
  );
}

IdeaCard.propTypes = {
  isIcon: PropTypes.bool,
  icon: PropTypes.elementType,
  rotate: PropTypes.number.isRequired,
  cardTitle: PropTypes.string.isRequired,
  state: PropTypes.node.isRequired,
};

IdeaCard.defaultProps = {
  isIcon: false,
  icon: null,
};

export default IdeaCard;
