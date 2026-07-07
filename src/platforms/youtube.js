import { createEngine } from "../engine/engine.js";
import { featuresByPlatform } from "../shared/registry.js";
import { resolveEnabled } from "../shared/config.js";
import { getConfig, onConfigChanged } from "../shared/storage.js";

const engine = createEngine({ doc: document });
const features = featuresByPlatform("youtube");

async function apply() {
  const config = await getConfig();
  engine.sync(features, resolveEnabled(features, config));
}

onConfigChanged(() => {
  apply();
});

apply();
