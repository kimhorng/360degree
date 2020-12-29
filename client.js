// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance, Module, Surface} from 'react-360-web';

function init(bundle, parent, options = {}) {
  r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    nativeModules: [
      new surfaceModule(),
    ],
    ...options,
  });

  introPanel = new Surface(
    500, /* width */
    400, /* height */
    Surface.SurfaceShape.Cylinder /* shape */
  );

  introRoot = r360.renderToSurface(
    r360.createRoot('TourismVR', { /* initial props */ }),
    introPanel
  );

  exitPanal = new Surface(
    100,
    100,
    Surface.SurfaceShape.Flat
  )

  exitPanal.setAngle(
    0.90, /* yaw angle */
    0 /* pitch angle */
  );

  museumPanel = new Surface(
    100,
    100,
    Surface.SurfaceShape.Flat
  )

  museumPanel.setAngle(
    Math.PI / 2, /* yaw angle */
    0 /* pitch angle */
  );

  restaurantPanel = new Surface(
    100,
    100,
    Surface.SurfaceShape.Flat
  )

  restaurantPanel.setAngle(
    -Math.PI / 3.4, /* yaw angle */
    -0.01 /* pitch angle */
  );

  receptionistPanel = new Surface(
    100,
    100,
    Surface.SurfaceShape.Flat
  );

  receptionistPanel.setAngle(
    3.4, /* yaw angle */
    -0.1 /* pitch angle */
  );

  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL('restaurant.jpeg'));
}

class surfaceModule extends Module {
  constructor() {
    super('surfaceModule');
  }

  resizeSurface(width, height, id) {
    if (id === 'restaurant') {
      restaurantPanel.resize(width, height);
    } else if (id === 'receptionist') {
      receptionistPanel.resize(width, height);
    } else if (id === 'exit') {
      exitPanal.resize(width, height);
    }
  }

  start() {
    r360.renderToSurface(
      r360.createRoot('InfoPanel', { id: 'exit',
                                     text: 'Exit this way' }),
      exitPanal,
    );

    r360.renderToSurface(
      r360.createRoot('InfoPanel', { id: 'receptionist',
                                     text: 'HERE IS receptionist'}),
      receptionistPanel,
    );

    r360.renderToSurface(
      r360.createRoot('InfoPanel', { id: 'restaurant',
                                     text: 'Enjoy a delicious beer at our restaurants.' }),
      restaurantPanel,
    );

    r360.detachRoot(introRoot);
  }
}


window.React360 = {init};
