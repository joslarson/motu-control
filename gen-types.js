const  { readFile, writeFile } = require('fs/promises');

const typesMap = {
  'semver_opt': '`${number}.${number}.${number}`',
  'string_list': 'string',
  'int': 'number',
  'string_opt': 'string',
  'int_bool': '0 | 1',
  'int_list': 'string',
  'int_bool_opt': 'number',
  'int_pair_opt': '`${number}:${number}`',
  'int_opt': 'number',
  'string_pair': 'string',
  'real': 'number',
  'real_bool': '0 | 1',
  'real_enum': 'number',

}

const parseData = async () => {
  const raw = await readFile('./api.md', 'utf8');

  let group = null;
  let endpoint = null;

  const result = {};

  for (let line of raw.split('\n')) {
    if (line.startsWith('## ')) {
      group = line.slice(3).trim();
      result[group] = {};
      endpoint = null;

      continue;
    } else if (line.startsWith('### ')) {
      if (!line.includes(': ')) throw new Error('Missing type!')

      const endpointAndType = line.slice(4).trim().split(': ');
      endpoint = endpointAndType[0].trim();
      result[group][endpoint] = { type: endpointAndType[1].trim() };

      continue;
    } else if (line.startsWith('@')) {
      const [attr, ...rest] = line.slice(1).split(' ');
      const value = rest.join(' ').trim();
      if (endpoint) {
        result[group][endpoint][attr.trim()] = value;
      } else {
        result[group][attr.trim()] = value;
      }

      continue;
    }
  }

  return result;
}

async function main() {
  const data = await parseData();
  let result = '';

  const groupKeys = Object.keys(data);
  groupKeys.forEach((groupKey, i) => {
    if (i > 0) result +=  `\n`;
    if (groupKey.description) result +=  `/** ${groupKey.description} */\n`;
    result += `export type ${groupKey} = {\n`;

    Object.keys(data[groupKey]).forEach((propKey, ii) => {
      const { description, type, ...attrs } = data[groupKey][propKey];

      if (ii > 0) result +=  `} & {\n`;
      result += `  /**\n`;
      if (description) result += `   * ${description}\n`;
      Object.keys(attrs).forEach((attrKey) => {
        result += `   * @${attrKey} ${attrs[attrKey]}\n`
      });
      result += `   **/\n`;
      result += `  [key in \`${propKey}\`]: ${typesMap[type] || type};\n`;
    });

    result += `}\n`;
  })

  result += `
export type Datastore = ${groupKeys.join(' & ')};

type PossiblePaths<T extends string> = T extends infer K
  ? (
      K extends \`\${infer S}/\${infer REST}\`
        ? S | \`\${S}/\${PossiblePaths<REST>}\`
        : K
    )
  : never;

export type DatastoreKey = PossiblePaths<keyof Datastore>

export type ExtractDataStoreKey<T extends DatastoreKey> =
  keyof { [K in DatastoreKey as T extends K ? K : never]: unknown };\n`

  await writeFile('./api.ts', result, 'utf-8');

  console.log(result);
}

if (require.main === module) main();
