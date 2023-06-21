import * as React from "react"
import Svg, { G, Circle, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const NotificationSvg = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={11}
        height={11}
        fill="none"
        {...props}
    >
        <G filter="url(#a)">
            <Circle cx={5.5} cy={1.5} r={1.5} fill="#F50000" />
        </G>
        <Defs></Defs>
    </Svg>
)
export default NotificationSvg
