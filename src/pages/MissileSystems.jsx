function MissileSystems() {
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', margin: 0, color: '#111' }}>Low Cost Missile Systems Design</h1>
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

      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
        <div style={{ textAlign: 'center', flex: 1, minWidth: '300px' }}>
          <img src="/assets/files/rocketpath.png" alt="Missile Path" style={{ width: 'auto', height: '400px', maxWidth: '100%' }} />
          <p>Figure 1: Missile Path</p>
        </div>

        <div style={{ textAlign: 'center', flex: 1, minWidth: '300px' }}>
          <img src="/assets/files/rocketspeed.png" alt="Missile Velocity" style={{ width: 'auto', height: '400px', maxWidth: '100%' }} />
          <p>Figure 2: Missile Velocity</p>
        </div>
      </div>

      <p>Below is an example of a tracking script locating a triangle based on the trained detection model.</p>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <video controls style={{ width: '100%', maxWidth: '600px', height: 'auto' }}>
          <source src="/assets/files/aerospace-tracking.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

export default MissileSystems;
