const SAMPLE_PROJECT_NAMES = ["Mobile Banking App", "Design System — Bedrock"];

export function isSampleProject(name: string) {
  return SAMPLE_PROJECT_NAMES.includes(name);
}
