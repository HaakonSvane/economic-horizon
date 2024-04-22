type BaseInfo = {
  salary: number;
  taxes: number;
};

export type BaseInfoSlice = {
  baseInfo: BaseInfo | null;
  setBaseInfo: (baseInfo: BaseInfo) => void;
};
