export const getRangePercent = (key: string, value: number) => {
  switch (key) {
    case 'offsetX':
    case 'offsetY':
      return (value + 100) / 2
    case 'blur':
      return value
    case 'transparency':
      return value / 2.55
  }
}
