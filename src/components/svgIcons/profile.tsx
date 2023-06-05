import * as React from "react"
import Svg, { Ellipse, Path } from "react-native-svg"
const ProfileSvg = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={39}
        height={36}
        fill="none"
        {...props}
    >
        <Ellipse
            cx={17.5}
            cy={9.969}
            stroke="#999"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            rx={4.375}
            ry={4.219}
        />
        <Path
            stroke="#999"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.5 20.006c-10.606 0-11.667 4.22-11.667 6.329a2.11 2.11 0 0 0 2.11 2.109h19.114a2.11 2.11 0 0 0 2.11-2.11c0-2.109-1.061-6.328-11.667-6.328Z"
        />
    </Svg>
)
export default ProfileSvg
