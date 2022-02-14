import { Range, getTrackBackground } from "react-range";

const STEP = 5;
const MIN = 0;
const MAX = 500;

const PriceRange = ({ values, setPrices }) => {
  return (
    <div className="range-selector">
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={(values) => setPrices(values)}
        renderTrack={({ props, children }) => (
          <div
            className="yo"
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "40px",
              display: "flex",
              width: "100%",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values,
                  colors: ["#e7e7e7", "#09b0ba", "#e7e7e7"],
                  min: MIN,
                  max: MAX,
                }),
                alignSelf: "center",
              }}
            >
              {console.log("props=", props)}
              {children}
            </div>
          </div>
        )}
        renderThumb={({ index, props, isDragged }) => (
          <div
            className="yes"
            {...props}
            style={{
              ...props.style,
              height: "24px",
              padding: "0px 3px",
              borderRadius: "4px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #AAA",
            }}
          >
            {values[index]} €
          </div>
        )}
      />
    </div>
  );
};
export default PriceRange;
