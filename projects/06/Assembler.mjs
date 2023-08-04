import fs from 'fs';
import path from 'path';
import Parser from './Parser.mjs';

// process.argv 是一个包含命令行参数的数组。
// 第一个元素是 'node'，第二个元素是执行的.mjs文件的名称，所以汇编文件路径是第三个元素。
const filePath = process.argv[2];

if (!filePath) {
  console.error('Please provide the file path as a command line argument.');
  process.exit(1);
}

// 检查文件是否具有.asm扩展名
if (path.extname(filePath) !== '.asm') {
  console.error('The file must have a .asm extension.');
  process.exit(1);
}

const precompiledFilePath = path.join(path.dirname(filePath), path.basename(filePath, '.asm') + '.pre');
// 获取文件名的前缀，并附加新的.hack扩展名
const binaryFilePath = path.join(path.dirname(filePath), path.basename(filePath, '.asm') + '.hack');

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('An error occurred:', err);
    return;
  }

  // 在这里处理文件内容
  const parser = new Parser(data, precompiledFilePath);
  const binaryInstrutions = parser.advance();

  // 将修改后的内容写入新的文件
  fs.writeFile(binaryFilePath, binaryInstrutions, (err) => {
    if (err) throw err;
    console.log('The binary content has been saved to a .hack file!');
  });
});
