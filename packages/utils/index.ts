import path from 'path';
import ejs from 'ejs';
import fs, { WriteFileOptions } from 'fs'
import { isRegExp } from './tool'
import { join } from 'path'

export const readFileNames = (reg: RegExp | string, path: string): string[] => {
  try {
    const _regExp = isRegExp(reg) ? reg : new RegExp(reg)

    return fs
      .readdirSync(path)
      .filter((file: string) => _regExp.test(file))
      .map((file) => join(path, file))
  } catch (error) {
    console.log('读取文件失败:', path)
  }
  return []
}

export const writeFileSync = (
  path: string,
  data: any,
  options?: WriteFileOptions
) => {
  try {
    const template = typeof data === 'object' ? JSON.stringify(data, null, 2) : data
    fs.writeFileSync(path, template, options)
  } catch (error) {
    console.log('读取文件失败:', error)
  }
}

export const toUpperCameCase = (str: string) => {
  return str
    .replace(/^(\w)/, (match, $1) => $1.toUpperCase())
    .replace(/[_\.-]([a-z])/g, function (all, i) {
      return i.toUpperCase();
    });
};
export const toLocaleLowerCameCase = (str: string) => {
  return str
    .replace(/^(\w)/, (match, $1) => $1.toLocaleLowerCase())
    .replace(/[_\.-]([a-z])/g, function (all, i) {
      return i.toUpperCase();
    });
};
export const readFileSync = (file: string) => {
  return fs.readFileSync(path.resolve(__dirname, file), 'utf-8');
};
export const replaceEjsTemplate = (
  templatePath: string,
  filePath: string,
  data: any
) => {
  const template: any = readFileSync(templatePath);
  const html = ejs.render(template, data);

  try {
    fs.writeFileSync(filePath, html);
  } catch (error) {
    console.error('创建文件失败:', error);
  }
};
