import MD5 from 'md5.js'
 
 function encryptionMd5(str){

   return new MD5().update(str).digest('hex');

}
export { encryptionMd5 }