interface Row {
  select: string;
  input1: string;
  input2: string;
}

export default interface FormData {
  selectSearch: string;
  startDate?: Date;
  endDate?: Date;
  rows: Row[];
}
