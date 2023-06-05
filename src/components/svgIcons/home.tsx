import * as React from "react"
import Svg, { Path } from "react-native-svg"
const HomeSvg = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={39}
        height={36}
        fill="none"
        {...props}
    >
        <Path
            stroke="#999"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m9.75 13.582-1.625 1.473V26.78a3 3 0 0 0 3 3h4.125a1 1 0 0 0 1-1v-6.836a1 1 0 0 1 1-1h4.5a1 1 0 0 1 1 1v6.836a1 1 0 0 0 1 1h4.125a3 3 0 0 0 3-3V15.055l-1.625-1.473"
        />
        <Path
            stroke="#999"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m6.5 16.527 13-11.78 13 11.78"
        />
    </Svg>
)
export default HomeSvg
