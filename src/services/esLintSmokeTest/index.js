const { ESLint } = require("eslint");

async function test(options) {
  console.log("@1Marker-No:_354467327");
  // 1. Create an instance.
  const eslint = new ESLint();

  //   a = require('../../../jest.config')
  // 2. Lint files.
  const results = await eslint.lintFiles(["/**/**/**/*.env"]);

  console.log(results);

  //   // 3. Format the results.
  const formatter = await eslint.loadFormatter("stylish");
  //   const resultText = formatter.format(results);

  //   // 4. Output it.
  //   console.log(resultText);

  return options;
}

test();