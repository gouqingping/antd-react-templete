export const dictionariesColor = [
  { default: '#0EA5E9', text: '#0284C7', mark: '#B7E4F8' },
  { default: '#84CC16', text: '#65A30D', mark: '#DAF0B9' },
  { default: '#6366F1', text: '#4338CA', mark: '#D0D1FB' },
  { default: '#D946EF', text: '#A21CAF', mark: '#F4C7FA' },
  { default: '#FACC15', text: '#CA8A04', mark: '#FEF0B9' },
  { default: '#EC4899', text: '#BE185D', mark: '#F9C8E0' },
  { default: '#8B5CF6', text: '#6D28D9', mark: '#DCCEFC' },
  { default: '#F97316', text: '#D46213', mark: '#FDD5B9' },
  { default: '#A855F7', text: '#7E22CE', mark: '#DBCCFD' },
  { default: '#08BFCB', text: '#0699A2', mark: '#B5ECEF' },
  { default: '#F59E0B', text: '#D97706', mark: '#FCE2B6' },
  { default: '#10B981', text: '#059669', mark: '#B7EAD9' },
  { default: '#3B82F6', text: '#1D4ED8', mark: '#C4DAFC' },
  { default: '#D7CC15', text: '#ACA311', mark: '#F3F0B9' },
  { default: '#EF4444', text: '#BF3636', mark: '#FCDADA' },
];

const getDefault2color = () => {
  const obj: Record<string, { text: string; mark: string }> = {};
  dictionariesColor.forEach((item) => {
    obj[item.default] = item;
  });
  return obj;
};

export const getRandomColor = (max = dictionariesColor.length) => {
  const randNum = Math.floor(Math.random() * max);
  return dictionariesColor[randNum].default;
};

export const default2color = getDefault2color();
