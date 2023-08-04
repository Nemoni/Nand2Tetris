import Code from "./Code.mjs";
import fs from "fs";

const CmdType = {
  A_COMMAND: "A_command",
  C_COMMAND: "C_command",
  L_COMMAND: "L_command",
};

class Parser {
  constructor(data, precompiledFilePath) {
    this.Code = new Code();
    this.lines = data.split("\n");
    this.currentCommand = "";
    this.precompiledInstructions = [];
    this.precompiledFilePath = precompiledFilePath;
  }
  // 预处理，处理空行、注释、空格、符号等
  precompile() {
    for (let i = 0; i < this.lines.length; i++) {
      let line = this.lines[i].replace(/[ \t]/g, ""); // 去掉空格和制表符

      // 如果行为空，或者以 "//" 开头，则跳过
      if (line.trim() === "" || line.startsWith("//")) {
        continue;
      }

      // 查找 "//" 的位置
      const commentIndex = line.indexOf("//");
      // 如果找到了 "//"，则截取它之前的部分
      if (commentIndex >= 0) {
        line = line.substring(0, commentIndex).trim();
      }

      // 处理符号

      this.precompiledInstructions.push(line);
    }

    const data = this.precompiledInstructions.join('\n');
    // 保存预处理文件
    fs.writeFile(
      this.precompiledFilePath,
      data,
      (err) => {
        if (err) throw err;
        console.log("The precompiled content has been saved to a .pre file!");
      }
    );
  }
  // 将预处理后的指令转换为二进制
  advance() {
    let symbolMnemonic = "";
    let compBinary = "";
    let destBinary = "";
    let jumpBinary = "";
    let commandBinary = "";
    let instructioins = "";

    this.precompile();
    while (this.hasMoreCommands()) {
      this.currentCommand = this.precompiledInstructions.shift();
      let commandType = this.commandType(this.currentCommand);
      if (commandType === CmdType.A_COMMAND) {
        symbolMnemonic = this.Symbol();
        commandBinary = this.decimalToBinary(symbolMnemonic, 16);
      } else if (commandType === CmdType.C_COMMAND) {
        compBinary = this.Code.comp(this.comp());
        destBinary = this.Code.dest(this.dest());
        jumpBinary = this.Code.jump(this.jump());
        commandBinary = "111" + compBinary + destBinary + jumpBinary;
      }
      instructioins += commandBinary + "\n";
    }

    return instructioins;
  }
  // 判断是否还有更多的指令
  hasMoreCommands() {
    return this.precompiledInstructions.length > 0;
  }
  // 返回当前指令的类型
  commandType() {
    if (this.currentCommand.startsWith("@")) {
      return CmdType.A_COMMAND;
    } else if (this.currentCommand.startsWith("(")) {
      return CmdType.L_COMMAND;
    } else {
      return CmdType.C_COMMAND;
    }
  }
  // 返回当前指令的符号或十进制值
  Symbol() {
    return this.currentCommand.substring(1).trim();
  }
  // 返回当前指令的comp助记符
  comp() {
    const compIndex = this.currentCommand.indexOf("=");
    const jumpIndex = this.currentCommand.indexOf(";");
    let compMnemonic = "";
    if (compIndex >= 0) {
      if (jumpIndex >= 0) {
        compMnemonic = this.currentCommand.substring(compIndex + 1, jumpIndex).trim();
      } else {
        compMnemonic = this.currentCommand.substring(compIndex + 1).trim();
      }
    } else if (jumpIndex >= 0) {
      compMnemonic = this.currentCommand.substring(0, jumpIndex).trim();
    } else {
      console.log("compMnemonic is not found, commmand: ", this.currentCommand);
    }
    return compMnemonic;
  }
  // 返回当前指令的dest助记符
  dest() {
    const destIndex = this.currentCommand.indexOf("=");
    let destMnemonic = "";
    if (destIndex >= 0) {
      destMnemonic = this.currentCommand.substring(0, destIndex).trim();
    }
    return destMnemonic;
  }
  // 返回当前指令的jump助记符
  jump() {
    const jumpIndex = this.currentCommand.indexOf(";");
    let jumpMnemonic = "";
    if (jumpIndex >= 0) {
      jumpMnemonic = this.currentCommand.substring(jumpIndex + 1).trim();
    }
    return jumpMnemonic;
  }
  // 将十进制字符串转换为指定长度的二进制字符串
  decimalToBinary(decimalString, length) {
    const decimalNumber = parseInt(decimalString, 10); // 将十进制字符串转换为数字
    const binaryString = decimalNumber.toString(2); // 将数字转换为二进制字符串
    return binaryString.padStart(length, "0"); // 如果需要，用零填充二进制字符串
  }
}

export default Parser;
