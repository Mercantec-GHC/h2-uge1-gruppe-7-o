export interface CountryAPIData {
  name: {
    common: string;
    official: string;
    nativeName: {
      ron: {
        common: string;
        official: string;
      };
    };
  };
  flags: {
    png: string;
    svg: string;
  };
}

export interface Country extends CountryAPIData {
  isGuessed: boolean;
  answerOptions: string[];
}
