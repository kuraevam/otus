function render(structure, depth = 0) {
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

  console.log(str);

  if (Array.isArray(structure.items)) {
    depth += 1;
    for (const structureChild of structure.items) {
      render(structureChild, depth);
    }
  }
}

export default function renderStructure(structure) {
  render(structure);
}
