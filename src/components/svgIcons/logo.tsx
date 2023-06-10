import * as React from "react"
import Svg, { Path, Ellipse } from "react-native-svg"
const LogoSvg = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={39}
        height={36}
        fill="none"
        {...props}
    >
        <Path
            stroke="#14213D"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={0.94}
            strokeWidth={9}
            d="M79.942 33.527c7.912 0 14.326-6.386 14.326-14.263C94.268 11.386 87.854 5 79.942 5c-7.912 0-14.326 6.386-14.326 14.264 0 7.877 6.414 14.263 14.326 14.263ZM107.067 58.686l3.941-17.487c2.466-10.94-10.008-19.043-19.129-12.426M51.242 58.687l-3.661-16.243c-2.632-11.676 10.496-20.464 20.422-13.67M79.485 114.473c7.912 0 14.326 6.386 14.326 14.263 0 7.878-6.414 14.264-14.326 14.264-7.912 0-14.326-6.386-14.326-14.264 0-7.877 6.414-14.263 14.326-14.263ZM106.61 89.314l3.942 17.487c2.466 10.939-10.008 19.043-19.13 12.426M50.786 89.314l-3.661 16.243c-2.632 11.675 10.495 20.463 20.422 13.67"
        />
        <Path
            stroke="#D88806"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={0.94}
            strokeWidth={9}
            d="M124.348 75.035c0 7.877 6.414 14.264 14.326 14.263 7.912 0 14.326-6.386 14.326-14.263 0-7.878-6.414-14.264-14.326-14.264-7.912 0-14.326 6.386-14.326 14.264ZM99.078 102.042l17.427 3.894c11.007 2.46 19.246-9.957 12.617-19.015M99.08 46.461l16.168-3.613c11.749-2.626 20.68 10.443 13.875 20.3M33.652 75.035c0 7.877-6.414 14.264-14.326 14.263C11.414 89.298 5 82.912 5 75.035c0-7.878 6.414-14.264 14.326-14.264 7.912 0 14.326 6.386 14.326 14.264ZM58.92 102.042l-17.427 3.894c-11.007 2.46-19.246-9.957-12.617-19.015M58.92 46.461l-16.17-3.613c-11.747-2.626-20.679 10.443-13.874 20.3"
        />
        <Path
            stroke="#CAC8C8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={9}
            d="M93.803 73.63c.365 7.868-5.747 14.554-13.65 14.934-7.905.38-14.608-5.69-14.973-13.558-.365-7.868 5.746-14.554 13.65-14.934 7.905-.38 14.608 5.69 14.973 13.558Z"
        />
    </Svg>
)
export default LogoSvg