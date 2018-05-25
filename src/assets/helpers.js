class Helpers {
  splitQueryParams = (queryString) => {
    const arr = queryString.split('&');
    const output = {};
    arr.forEach((param) => {
      const key = param.split('=')[0];
      const val = param.split('=')[1];
      output[key] = val;
    });
    return output;
  }
}

export default Helpers;
