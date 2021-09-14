import { Registry, makeSingleton } from '@superset-ui/core';

class ChartControlPanelRegistry extends Registry {
  constructor() {
    super({
      name: 'ChartControlPanel'
    });
  }

}

const getInstance = makeSingleton(ChartControlPanelRegistry);
export default getInstance;