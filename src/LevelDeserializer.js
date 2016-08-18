const levels = ["_:2.10...", "/:2.4..."]; // should be serialized levels array (TODO)

export default (levelIndex) => {
    return parse(levels[levelIndex]); // should be a Level
  }

const parse = (levelStr) => {
  //TODO
  return {}; // should be a Level
}
