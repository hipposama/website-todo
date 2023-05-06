const ProgressBar = ({progress}) => {
    let color;
    if (progress <= 30) {
        color = 'rgb(255,175,163)';
      } else if (progress >= 31 && progress <= 70) {
        color = 'rgb(255,214,161)';
      } else if (progress >= 71 && progress <= 90) {
        color = 'rgb(140,255,143)';
      } else if (progress >= 90) {
        color = 'rgb(140,255,255)';
      }

    return (
        <div className="outer-bar">
            <div className="inner-bar"
            style={{width: `${progress}%`, backgroundColor: color}}
            ></div>
        </div>

    )
}

export default ProgressBar