import * as React from "react"
import Svg, { G, Path, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const JoinItemBtnSvg = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={23}
        height={27}
        fill="none"
        {...props}
    >
        <G filter="url(#a)">
            <Path
                fill="black"
                fillRule="evenodd"
                d="M4.478.334c.637-.445 1.67-.445 2.307 0l11.578 8.091c.85.594.85 1.556 0 2.15L6.785 18.666c-.637.445-1.67.445-2.307 0s-.637-1.167 0-1.612L15.287 9.5 4.477 1.946c-.636-.445-.636-1.167 0-1.612Z"
                clipRule="evenodd"
            />
        </G>
        <Defs></Defs>
    </Svg>
)
export default  JoinItemBtnSvg
