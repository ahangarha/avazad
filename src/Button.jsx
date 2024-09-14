import PropTypes from 'prop-types';
import classnames from "classnames";

export default function Button({ onClick, disabled, classNames, children }) {
  return (
    <button
      className={
        classnames(
          "px-6 py-3 rounded font-semibold disabled:bg-gray-500 text-white",
          classNames
        )
      }
      type="button"
      onClick={onClick}
      disabled={Boolean(disabled)}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  classNames: PropTypes.string,
  children: PropTypes.string.isRequired
};
