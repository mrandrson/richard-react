import assetPath from '../utils/assetPath';

function MissileSystems() {
  return (
    <div>
      <div className="page-header">
        <h1>Low Cost Missile Systems Design</h1>
      </div>

      <p>
        During this project I worked at the UTEP Aerospace Center as part of a team developing a cost-effective missile
        system. My primary role was to develop an object detection pipeline using Python, OpenCV, TensorFlow, and the YOLOv3
        algorithm. I also contributed preliminary ballistics calculations for sizing the missile according to the required
        range and payload, gaining experience with aerodynamics simulations in Python, MATLAB, and Star-CCM+.
      </p>

      <hr />

      <p>
        Below are examples of the trajectory calculations used to size the missile. A realistic thrust and mass model based
        on the solid rocket engine was used to integrate the motion across the full trajectory, including the post-burn
        coasting phase.
      </p>

      <div className="media-grid">
        <figure className="media-card">
          <img src={assetPath('rocketpath.png')} alt="Missile Path" />
          <figcaption>Figure 1: Missile Path</figcaption>
        </figure>

        <figure className="media-card">
          <img src={assetPath('rocketspeed.png')} alt="Missile Velocity" />
          <figcaption>Figure 2: Missile Velocity</figcaption>
        </figure>
      </div>

      <p>Below is an example of a tracking script locating a triangle based on the trained detection model.</p>

      <div className="media-card">
        <video controls>
          <source src={assetPath('aerospace-tracking.mp4')} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

export default MissileSystems;
