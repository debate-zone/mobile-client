import * as React from "react"
import Svg, { Path, Ellipse } from "react-native-svg"
const CreateSvg = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={36}
        height={36}
        fill="none"
        {...props}
    >
        <Path
            stroke="#999"
            strokeLinecap="round"
            strokeWidth={2}
            d="M13.5 18h9M18 22.5v-9M33 18c0 8.284-6.716 15-15 15-8.284 0-15-6.716-15-15C3 9.716 9.716 3 18 3c8.284 0 15 6.716 15 15Z"
        />
    </Svg>
)
export default CreateSvg
