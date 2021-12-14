import { REQUEST_STATUS } from '../../hooks/useRequestDelay';
const LoadingSpinner = ({ requestStatus }) => {
    return (
    requestStatus === REQUEST_STATUS.LOADING ?
        <div className="svgMain">
            <svg width="51px" height="50px" viewBox="0 0 51 50">
                <rect y="0" width="50" height="13" fill="#1fa2ff">
                    <animate attributeName="width" values="50;10;50" begin="0s" dur="1s" repeatCount="indefinite" />
                    <animate attributeName="x" values="0;20;0" begin="0s" dur="1s" repeatCount="indefinite" />
                </rect>
                <rect x="0 " y="19" width="50" height="13" fill="#12d8fa">
                    <animate attributeName="width" values="50;10;50" begin="0.2s" dur="1s" repeatCount="indefinite" />
                    <animate attributeName="x" values="0;20;0" begin="0.2s" dur="1s" repeatCount="indefinite" />
                </rect>
                <rect x="0" y="38" width="50" height="13" fill="#06ffcb">
                    <animate attributeName="width" values="50;10;50" begin="0.4s" dur="1s" repeatCount="indefinite" />
                    <animate attributeName="x" values="0;20;0" begin="0.4s" dur="1s" repeatCount="indefinite" />
                </rect>
            </svg>
            </div>
            : <> </>
    );
}
export default LoadingSpinner;