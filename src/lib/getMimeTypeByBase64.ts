export default (fileInBase64: string) => {
   const resultMatch = fileInBase64.match(
      /data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/,
   );
   if (!resultMatch)
      throw new Error('Não foi possível identificar o mime type');
   const [, ContentType] = resultMatch;
   if (!ContentType) throw new Error('Mime type not found');
   return ContentType;
};
