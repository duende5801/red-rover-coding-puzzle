const input =
  "(id, name, email, type(id, name, customFields(c1, c2, c3)), externalId)";

// Static/Brute force method
const parseStatic = (input:string, reorder?: boolean) => {
  const tokens = input.split("(");
  const id = tokens[1].split(",")[0];
  const externalName = tokens[1].split(",")[1].trim();
  const externalEmail = tokens[1].split(",")[2].trim();
  const typeId = tokens[2].split(",")[0].trim();
  const typeName = tokens[2].split(",")[1].trim();
  const customFields = tokens[tokens.length - 1].split(")")[0];
  const fields = customFields.split(",").map((field) => field.trim());
  const externalId = tokens[tokens.length - 1]
    .split(",")[3]
    .trim()
    .replace(")", "");
  const typeNormal = {
    type: [typeId, typeName, { customFields: [...fields] }],
  };
  const typeReorded = {
    type: [{ customFields: [...fields] }, typeId, typeName],
  };

  return reorder
    ? [externalEmail, externalId, id, externalName, typeReorded]
    : [id, externalName, externalEmail, typeNormal, externalId];
};

// Dynamic method
function parseDynamic(input:string, needsReorder?:boolean) {
  let index = 1;
  function recursiveParse():any[] {
    let result = [];
    let accumulatedChars = "";

    while (index < input.length) {
      const char = input[index];
      index++;

      if (char === "(") {
        const nestedDirectory = recursiveParse();
        result.push({ [accumulatedChars.trim()]: nestedDirectory });
        accumulatedChars = "";
      } else if (char === ")") {
        if (accumulatedChars.trim()) result.push(accumulatedChars.trim());
        return result;
      } else if (char === ",") {
        if (accumulatedChars.trim()) result.push(accumulatedChars.trim());
        accumulatedChars = "";
      } else {
        accumulatedChars += char;
      }
    }

    if (accumulatedChars.trim()) result.push(accumulatedChars.trim());
    return result;
  }

  const result = recursiveParse();
  const values: any[] = Object.values(result[3]);
  const reOrderedType = {
    type: [values[0][2], values[0][0], values[0][1]],
  };
  const resultReordered = [
    result[2],
    result[4],
    result[0],
    result[1],
    reOrderedType,
  ];
  return !needsReorder ? result : resultReordered;
}

const output = parseStatic(input);
const output2 = parseStatic(input, true);

const output3 = parseDynamic(input);
const output4 = parseDynamic(input, true);

console.log(JSON.stringify(output, null, 2));
console.log(JSON.stringify(output2, null, 2));
console.log(JSON.stringify(output3, null, 2));
console.log(JSON.stringify(output4, null, 2));
