import fs, { WriteFileOptions } from 'fs'
import { isObject, isRegExp } from './tool'
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
/**
 * 删除文件夹功能
 * @param  {String} url  文件路径，绝对路径
 * @return {Null}
 * @author huangh 20170123
 */
export function deleteDir(url: string) {
  var files = [];

  if (fs.existsSync(url)) {  //判断给定的路径是否存在

    files = fs.readdirSync(url);   //返回文件和子目录的数组
    files.forEach(function (file, index) {
      var curPath = join(url, file);

      if (fs.statSync(curPath).isDirectory()) { //同步读取文件夹文件，如果是文件夹，则函数回调
        deleteDir(curPath);
      } else {
        fs.unlinkSync(curPath);    //是指定文件，则删除
      }

    });
    fs.rmdirSync(url); //清除文件夹
  } else {
    console.log("给定的路径不存在！");
  }
}
export function mkdirSync(url: string) {
  if (!fs.existsSync(url) && !fs.statSync(url).isDirectory()) {  //判断给定的路径是否存在
    fs.mkdirSync(url)
  }
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