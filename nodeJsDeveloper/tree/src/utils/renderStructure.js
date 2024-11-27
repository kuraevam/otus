function render(structure, depth = 0) {
  const rows = [];

  let str = structure.name;

  if (depth > 0) {
    str = `|${
      [...Array(depth - 1)].map((value, index) => {
        if (index === 0) {
          return ' '.repeat(3);
        }
        return `|${' '.repeat(2)}`;
      }).join('')
    }${depth > 1 ? '|' : '-'
    }${'-'.repeat(5)
    }${structure.name}`;
  }

  rows.push(str);

  if (Array.isArray(structure.items)) {
    depth += 1;
    for (const structureChild of structure.items) {
      const rowsChild = render(structureChild, depth);
      rows.push(...rowsChild);
    }
  }

  return rows;
}

export default function renderStructure(structure) {
  const rows = render(structure);
  return rows.join('\n');
}
