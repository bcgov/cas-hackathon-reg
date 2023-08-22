export const ReadOnlyWidget = function (props) {
  return (
    <input
      id="custom"
      className={props.value ? "checked" : "unchecked"}
      onClick={() => props.onChange(!props.value)}
    >
      {props.value}
    </input>
  );
};
