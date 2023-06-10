import * as React from "react"
import Svg, { G, Rect, Path, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const GoogleSvg = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={326}
        height={65}
        fill="none"
        {...props}
    >
        <G filter="url(#a)">
            <Rect
                width={318}
                height={57}
                x={4}
                fill="#fff"
                fillOpacity={0.69}
                rx={20.997}
            />
            <Path
                fill="#4285F4"
                fillRule="evenodd"
                d="M55.412 27.898c0-1.241-.115-2.435-.329-3.58H38.067v6.77h9.724c-.42 2.187-1.692 4.04-3.606 5.28v4.392h5.84c3.416-3.047 5.387-7.533 5.387-12.862Z"
                clipRule="evenodd"
            />
            <Path
                fill="#34A853"
                fillRule="evenodd"
                d="M38.067 44.999c4.878 0 8.968-1.567 11.957-4.24l-5.839-4.39c-1.618 1.05-3.687 1.67-6.118 1.67-4.706 0-8.689-3.078-10.11-7.215h-6.036v4.534c2.973 5.72 9.083 9.64 16.146 9.64Z"
                clipRule="evenodd"
            />
            <Path
                fill="#FBBC05"
                fillRule="evenodd"
                d="M27.958 30.825a10.221 10.221 0 0 1-.567-3.325c0-1.154.206-2.275.567-3.325V19.64h-6.036A17.048 17.048 0 0 0 20 27.5c0 2.823.698 5.496 1.922 7.859l6.036-4.534Z"
                clipRule="evenodd"
            />
            <Path
                fill="#EA4335"
                fillRule="evenodd"
                d="M38.067 16.96c2.653 0 5.034.883 6.907 2.617l5.182-5.02C47.026 11.735 42.937 10 38.067 10c-7.063 0-13.173 3.921-16.146 9.64l6.037 4.535c1.42-4.137 5.403-7.215 10.109-7.215Z"
                clipRule="evenodd"
            />
            <Path
                fill="#000"
                fillOpacity={0.54}
                d="M113.49 30.283h2.92c-.059.957-.323 1.807-.791 2.549-.463.742-1.11 1.322-1.944 1.738-.827.417-1.823.625-2.988.625-.911 0-1.729-.156-2.451-.468a5.221 5.221 0 0 1-1.856-1.368c-.507-.592-.895-1.308-1.162-2.148-.267-.84-.4-1.78-.4-2.822v-.987c0-1.041.137-1.982.41-2.822.28-.846.677-1.566 1.191-2.158a5.31 5.31 0 0 1 1.866-1.367c.722-.32 1.53-.479 2.422-.479 1.184 0 2.184.215 2.998.645.82.43 1.455 1.022 1.904 1.777.456.755.729 1.615.82 2.578H113.5c-.033-.573-.147-1.058-.342-1.455a1.943 1.943 0 0 0-.889-.908c-.391-.208-.911-.313-1.562-.313-.489 0-.915.091-1.28.274-.364.182-.67.459-.918.83-.247.371-.433.84-.556 1.406-.118.56-.176 1.218-.176 1.973v1.006c0 .735.055 1.383.166 1.943.111.553.28 1.022.508 1.406.234.378.534.664.898.86.371.188.817.283 1.338.283.612 0 1.117-.098 1.514-.293.397-.195.7-.485.908-.87.215-.383.342-.862.381-1.435Zm4.218-.459v-.205c0-.775.111-1.488.333-2.139a4.944 4.944 0 0 1 .966-1.709 4.337 4.337 0 0 1 1.563-1.123c.618-.273 1.328-.41 2.129-.41.801 0 1.513.137 2.138.41a4.324 4.324 0 0 1 1.573 1.123 4.87 4.87 0 0 1 .976 1.71 6.59 6.59 0 0 1 .332 2.138v.205c0 .768-.11 1.481-.332 2.139a4.989 4.989 0 0 1-.976 1.709 4.337 4.337 0 0 1-1.563 1.123c-.618.267-1.328.4-2.129.4-.801 0-1.513-.133-2.138-.4a4.427 4.427 0 0 1-1.573-1.123 5.066 5.066 0 0 1-.966-1.71 6.647 6.647 0 0 1-.333-2.138Zm2.813-.205v.205c0 .443.039.856.117 1.24.078.385.202.723.371 1.016.176.287.404.511.684.674.28.163.622.244 1.025.244.391 0 .726-.081 1.006-.244.28-.163.505-.387.674-.674.169-.293.293-.631.371-1.015.085-.385.127-.798.127-1.24v-.206c0-.43-.042-.833-.127-1.21a3.188 3.188 0 0 0-.381-1.016 1.888 1.888 0 0 0-.674-.704c-.28-.169-.618-.253-1.015-.253-.397 0-.736.084-1.016.253-.273.17-.498.404-.674.704a3.355 3.355 0 0 0-.371 1.015 5.98 5.98 0 0 0-.117 1.211Zm11.68-2.93V35h-2.813V24.434h2.637l.176 2.255Zm-.41 2.657h-.762c0-.782.101-1.485.303-2.11a4.798 4.798 0 0 1 .849-1.611c.365-.45.798-.791 1.299-1.025a3.914 3.914 0 0 1 1.699-.362c.495 0 .947.072 1.358.215.41.143.761.371 1.054.684.3.312.528.726.684 1.24.163.514.244 1.143.244 1.885V35h-2.832v-6.748c0-.469-.065-.833-.195-1.094a1.103 1.103 0 0 0-.576-.547c-.248-.11-.554-.166-.918-.166-.378 0-.707.075-.987.225a1.96 1.96 0 0 0-.683.625c-.176.26-.31.566-.401.918a4.51 4.51 0 0 0-.136 1.133Zm14.042-4.912v1.992h-6.152v-1.992h6.152Zm-4.628-2.608h2.812v9.99c0 .306.039.54.117.704a.707.707 0 0 0 .371.341c.163.059.368.088.616.088.175 0 .332-.006.468-.02.144-.019.264-.038.362-.058l.009 2.07a5.26 5.26 0 0 1-.781.186c-.28.045-.589.068-.928.068-.618 0-1.158-.1-1.621-.302a2.233 2.233 0 0 1-1.054-.996c-.248-.456-.371-1.055-.371-1.797V21.826Zm9.199 2.608V35h-2.822V24.434h2.822Zm-2.998-2.754c0-.41.143-.749.429-1.016.287-.267.671-.4 1.153-.4.475 0 .856.133 1.142.4.293.267.44.605.44 1.016 0 .41-.147.748-.44 1.015-.286.267-.667.4-1.142.4-.482 0-.866-.133-1.153-.4a1.329 1.329 0 0 1-.429-1.015Zm8.076 5.01V35h-2.813V24.434h2.637l.176 2.255Zm-.41 2.656h-.762c0-.782.101-1.485.303-2.11.202-.631.485-1.168.849-1.611.365-.45.798-.791 1.299-1.025a3.914 3.914 0 0 1 1.699-.362c.495 0 .948.072 1.358.215a2.6 2.6 0 0 1 1.055.684c.299.312.527.726.683 1.24.163.514.244 1.143.244 1.885V35h-2.832v-6.748c0-.469-.065-.833-.195-1.094a1.096 1.096 0 0 0-.576-.547c-.248-.11-.554-.166-.918-.166-.378 0-.707.075-.987.225a1.96 1.96 0 0 0-.683.625c-.176.26-.309.566-.401.918a4.51 4.51 0 0 0-.136 1.133Zm15.117 3.125v-8.037h2.812V35h-2.646l-.166-2.53Zm.312-2.168.831-.02a7.53 7.53 0 0 1-.245 1.963 4.656 4.656 0 0 1-.732 1.563 3.431 3.431 0 0 1-1.23 1.025c-.495.24-1.078.361-1.749.361-.514 0-.989-.071-1.425-.215-.43-.15-.801-.38-1.114-.693-.306-.319-.546-.726-.722-1.22-.17-.502-.254-1.104-.254-1.807v-6.826h2.812v6.845c0 .313.036.576.108.791.078.215.185.39.322.528.137.136.296.234.479.293.188.058.397.087.625.087.579 0 1.035-.117 1.367-.351.338-.234.576-.553.713-.957.143-.41.214-.866.214-1.367Zm9.512 4.892c-.82 0-1.556-.13-2.207-.39a4.849 4.849 0 0 1-1.66-1.104 4.91 4.91 0 0 1-1.035-1.63 5.489 5.489 0 0 1-.361-1.993v-.39c0-.801.113-1.534.341-2.198.228-.664.554-1.24.977-1.728a4.29 4.29 0 0 1 1.562-1.123c.612-.267 1.302-.4 2.071-.4.748 0 1.412.123 1.992.37a3.91 3.91 0 0 1 1.455 1.055 4.54 4.54 0 0 1 .898 1.64c.202.632.303 1.335.303 2.11v1.172h-8.398V28.71h5.634v-.215c0-.39-.071-.739-.214-1.045a1.66 1.66 0 0 0-.625-.742c-.28-.182-.638-.273-1.075-.273-.371 0-.69.08-.957.244-.267.162-.485.39-.654.683a3.723 3.723 0 0 0-.371 1.035c-.078.391-.117.82-.117 1.29v.39c0 .423.058.814.176 1.172.123.358.296.667.517.928.228.26.501.462.82.605.326.143.694.215 1.104.215.508 0 .98-.098 1.416-.293a3.065 3.065 0 0 0 1.143-.908l1.367 1.484c-.222.32-.524.625-.908.918a4.858 4.858 0 0 1-1.368.723c-.533.182-1.142.273-1.826.273Zm13.936-2.93 2.197-7.831h1.787l-.576 3.076L195.16 35h-1.494l.283-2.734Zm-1.114-7.831 1.573 7.822.146 2.744h-1.758l-2.675-10.566h2.714Zm7.11 7.695 1.533-7.695h2.725L201.527 35h-1.748l.166-2.871Zm-1.768-7.695 2.188 7.773.302 2.793h-1.503l-2.198-7.48-.556-3.086h1.767Zm10.41 0V35h-2.822V24.434h2.822Zm-2.998-2.754c0-.41.144-.749.43-1.016.287-.267.671-.4 1.152-.4.476 0 .857.133 1.143.4.293.267.439.605.439 1.016 0 .41-.146.748-.439 1.015-.286.267-.667.4-1.143.4-.481 0-.865-.133-1.152-.4a1.33 1.33 0 0 1-.43-1.015Zm10.498 2.754v1.992h-6.152v-1.992h6.152Zm-4.629-2.608h2.813v9.99c0 .306.039.54.117.704a.707.707 0 0 0 .371.341c.163.059.368.088.616.088.175 0 .332-.006.468-.02.143-.019.264-.038.362-.058l.009 2.07a5.29 5.29 0 0 1-.781.186c-.28.045-.589.068-.928.068-.618 0-1.158-.1-1.621-.302a2.233 2.233 0 0 1-1.054-.996c-.248-.456-.372-1.055-.372-1.797V21.826ZM220.433 20v15h-2.812V20h2.812Zm-.4 9.346h-.772a7.16 7.16 0 0 1 .293-2.032 4.98 4.98 0 0 1 .811-1.62 3.73 3.73 0 0 1 1.26-1.075 3.535 3.535 0 0 1 1.64-.38c.521 0 .993.074 1.416.224.43.143.798.377 1.104.703.312.319.553.739.722 1.26.17.52.254 1.152.254 1.894V35h-2.832v-6.7c0-.468-.068-.836-.205-1.103a1.128 1.128 0 0 0-.576-.576c-.247-.117-.553-.176-.918-.176-.404 0-.749.075-1.035.225-.28.15-.505.358-.674.625-.169.26-.293.566-.371.918-.078.351-.117.73-.117 1.133Zm25.293-1.778v5.635c-.222.267-.563.557-1.026.87-.462.305-1.058.569-1.787.79-.729.222-1.611.332-2.646.332-.918 0-1.755-.15-2.51-.449a5.426 5.426 0 0 1-1.953-1.338c-.541-.586-.957-1.302-1.25-2.148-.293-.853-.44-1.826-.44-2.92v-.889c0-1.094.14-2.067.42-2.92.287-.853.694-1.572 1.221-2.158a5.223 5.223 0 0 1 1.885-1.338c.729-.306 1.539-.459 2.431-.459 1.237 0 2.253.202 3.047.606.795.397 1.4.95 1.817 1.66.423.703.683 1.51.781 2.422h-2.842a3.616 3.616 0 0 0-.41-1.26 2.124 2.124 0 0 0-.869-.84c-.371-.202-.853-.303-1.445-.303-.489 0-.925.101-1.309.303a2.582 2.582 0 0 0-.957.87c-.261.383-.459.859-.596 1.425-.137.566-.205 1.224-.205 1.973v.908c0 .742.072 1.4.215 1.973.143.566.355 1.044.635 1.435.286.384.638.674 1.054.87.417.194.902.292 1.455.292.463 0 .847-.039 1.153-.117.312-.078.563-.173.752-.283.195-.117.345-.228.449-.332v-2.52h-2.676v-2.09h5.606Zm1.738 2.256v-.205c0-.775.111-1.488.332-2.139a4.946 4.946 0 0 1 .967-1.709 4.334 4.334 0 0 1 1.562-1.123c.619-.273 1.328-.41 2.129-.41.801 0 1.514.137 2.139.41a4.312 4.312 0 0 1 1.572 1.123c.43.482.755 1.052.977 1.71.221.65.332 1.363.332 2.138v.205c0 .768-.111 1.481-.332 2.139a4.991 4.991 0 0 1-.977 1.709 4.333 4.333 0 0 1-1.562 1.123c-.619.267-1.328.4-2.129.4-.801 0-1.514-.133-2.139-.4a4.424 4.424 0 0 1-1.572-1.123 5.069 5.069 0 0 1-.967-1.71 6.674 6.674 0 0 1-.332-2.138Zm2.812-.205v.205c0 .443.04.856.118 1.24.078.385.201.723.371 1.016.176.287.403.511.683.674.28.163.622.244 1.026.244.39 0 .726-.081 1.006-.244.28-.163.504-.387.673-.674.17-.293.293-.631.372-1.015.084-.385.126-.798.126-1.24v-.206c0-.43-.042-.833-.126-1.21a3.236 3.236 0 0 0-.381-1.016c-.17-.3-.394-.534-.674-.704-.28-.169-.619-.253-1.016-.253s-.735.084-1.015.253c-.274.17-.498.404-.674.704-.17.293-.293.631-.371 1.015a5.979 5.979 0 0 0-.118 1.211Zm8.477.205v-.205c0-.775.111-1.488.332-2.139a4.946 4.946 0 0 1 .967-1.709 4.334 4.334 0 0 1 1.562-1.123c.619-.273 1.328-.41 2.129-.41.801 0 1.514.137 2.139.41a4.312 4.312 0 0 1 1.572 1.123c.43.482.755 1.052.977 1.71.221.65.332 1.363.332 2.138v.205c0 .768-.111 1.481-.332 2.139a4.991 4.991 0 0 1-.977 1.709 4.333 4.333 0 0 1-1.562 1.123c-.619.267-1.328.4-2.129.4-.801 0-1.514-.133-2.139-.4a4.432 4.432 0 0 1-1.572-1.123 5.069 5.069 0 0 1-.967-1.71 6.674 6.674 0 0 1-.332-2.138Zm2.813-.205v.205c0 .443.039.856.117 1.24.078.385.202.723.371 1.016.176.287.403.511.683.674.28.163.622.244 1.026.244.39 0 .726-.081 1.006-.244.28-.163.504-.387.673-.674.17-.293.293-.631.372-1.015a5.8 5.8 0 0 0 .127-1.24v-.206c0-.43-.043-.833-.127-1.21a3.236 3.236 0 0 0-.381-1.016c-.17-.3-.394-.534-.674-.704-.28-.169-.619-.253-1.016-.253s-.735.084-1.015.253c-.274.17-.498.404-.674.704a3.355 3.355 0 0 0-.371 1.015 5.98 5.98 0 0 0-.117 1.211Zm15.615-5.185h2.549v10.214c0 .964-.215 1.781-.645 2.452a3.976 3.976 0 0 1-1.777 1.533c-.762.351-1.647.527-2.657.527-.442 0-.911-.058-1.406-.176a5.625 5.625 0 0 1-1.406-.547 3.705 3.705 0 0 1-1.113-.937l1.24-1.66c.325.377.703.67 1.133.879.429.215.905.322 1.426.322.507 0 .937-.094 1.289-.283.351-.183.621-.453.81-.81.189-.352.283-.779.283-1.28v-7.793l.274-2.441Zm-7.11 5.41v-.205c0-.808.098-1.54.293-2.198.202-.664.485-1.233.85-1.709.371-.475.82-.843 1.348-1.103.527-.26 1.123-.39 1.787-.39.703 0 1.292.13 1.767.39.476.26.866.631 1.172 1.113.306.475.544 1.039.713 1.69.176.644.313 1.35.41 2.119V30c-.097.736-.244 1.42-.439 2.05a6.322 6.322 0 0 1-.772 1.66 3.413 3.413 0 0 1-1.191 1.095c-.469.26-1.029.39-1.68.39s-1.24-.133-1.767-.4a3.946 3.946 0 0 1-1.338-1.123 5.36 5.36 0 0 1-.86-1.7 7.392 7.392 0 0 1-.293-2.128Zm2.813-.205v.205c0 .436.042.843.127 1.22.084.378.215.713.39 1.006.183.287.407.511.674.674.274.156.596.234.967.234.514 0 .934-.107 1.26-.322.325-.221.57-.524.732-.908.163-.384.257-.827.283-1.328v-1.28a4.304 4.304 0 0 0-.166-1.103 2.629 2.629 0 0 0-.41-.85 1.764 1.764 0 0 0-.683-.546c-.28-.13-.612-.196-.996-.196a1.8 1.8 0 0 0-.967.254 2.08 2.08 0 0 0-.674.674 3.402 3.402 0 0 0-.4 1.016c-.092.384-.137.8-.137 1.25ZM284.486 20v15h-2.822V20h2.822Zm7.187 15.195c-.82 0-1.556-.13-2.207-.39a4.849 4.849 0 0 1-1.66-1.104 4.91 4.91 0 0 1-1.035-1.63 5.489 5.489 0 0 1-.361-1.993v-.39c0-.801.114-1.534.341-2.198.228-.664.554-1.24.977-1.728.43-.489.951-.863 1.563-1.123.612-.267 1.302-.4 2.07-.4.749 0 1.413.123 1.992.37a3.91 3.91 0 0 1 1.455 1.055c.397.456.697 1.003.899 1.64.201.632.302 1.335.302 2.11v1.172h-8.398V28.71h5.635v-.215c0-.39-.072-.739-.215-1.045a1.66 1.66 0 0 0-.625-.742c-.28-.182-.638-.273-1.074-.273-.372 0-.691.08-.957.244-.267.162-.486.39-.655.683a3.723 3.723 0 0 0-.371 1.035c-.078.391-.117.82-.117 1.29v.39c0 .423.059.814.176 1.172.123.358.296.667.517.928.228.26.502.462.821.605a2.71 2.71 0 0 0 1.103.215c.508 0 .98-.098 1.416-.293a3.065 3.065 0 0 0 1.143-.908l1.367 1.484c-.221.32-.524.625-.908.918a4.865 4.865 0 0 1-1.367.723c-.534.182-1.143.273-1.827.273Z"
            />
        </G>
        <Defs></Defs>
    </Svg>
)
export default GoogleSvg