class Code {
  constructor() {
    this.destMap = {
      null: "000",
      M: "001",
      D: "010",
      MD: "011",
      A: "100",
      AM: "101",
      AD: "110",
      AMD: "111",
    };
    this.compMap = {
      "0": "0101010",
      "1": "0111111",
      "-1": "0111010",
      "D": "0001100",
      "A": "0110000",
      "!D": "0001101",
      "!A": "0110001",
      "-D": "0001111",
      "-A": "0110011",
      "D+1": "0011111",
      "A+1": "0110111",
      "D-1": "0001110",
      "A-1": "0110010",
      "D+A": "0000010",
      "D-A": "0010011",
      "A-D": "0000111",
      "D&A": "0000000",
      "D|A": "0010101",
      "M": "1110000",
      "!M": "1110001",
      "-M": "1110011",
      "M+1": "1110111",
      "M-1": "1110010",
      "D+M": "1000010",
      "D-M": "1010011",
      "M-D": "1000111",
      "D&M": "1000000",
      "D|M": "1010101",
    };
    this.jumpMap = {
      null: "000",
      JGT: "001",
      JEQ: "010",
      JGE: "011",
      JLT: "100",
      JNE: "101",
      JLE: "110",
      JMP: "111",
    };
  }
  dest(mnemonic) {
    if (mnemonic === "" | mnemonic === null) {
      return this.destMap['null'];
    }
    let value = "";
    if (this.destMap.hasOwnProperty(mnemonic)) {
      value = this.destMap[mnemonic];
    } else {
      console.log(`The key ${mnemonic} does not exist in the destMap`);
    }
    return value;
  }
  comp(mnemonic) {
    let value = "";
    if (this.compMap.hasOwnProperty(mnemonic)) {
      value = this.compMap[mnemonic];
    } else {
      console.log(mnemonic);
    }
    return value;
  }
  jump(mnemonic) {
    if (mnemonic === "" | mnemonic === null) {
      return this.jumpMap['null'];
    }
    let value = "";
    if (this.jumpMap.hasOwnProperty(mnemonic)) {
      value = this.jumpMap[mnemonic];
    } else {
      console.log(`The key ${mnemonic} does not exist in the jumpMap`);
    }
    return value;
  }
}

export default Code;
