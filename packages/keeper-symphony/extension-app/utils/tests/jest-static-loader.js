module.exports = {
  process(src, filename) {
    const last = filename.split('/');

    return `module.exports = ${JSON.stringify(last[last.length - 1])}`;
  },
};
