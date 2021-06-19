export async function validateSchema(body, schema) {
  //! Validate if Schema data exit.

  let shemaVariables = schema.paths;

  for (const key in body) {
    let variableInput = key;
    if (!shemaVariables[variableInput]) {
      throw Error(' The Variable is not define inside of the schema');
    }
  }
  // <<<<
}
