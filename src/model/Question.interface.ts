interface Option {
  id: string;
  label: string;
  value: string;
}

interface Config {
  options: Option[];
  key: string;
  hint: string;
}

export interface Question {
  id: string;
  stem: string;
  type: string;
  strand: string;
  config: Config;
}
