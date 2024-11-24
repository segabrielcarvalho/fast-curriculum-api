import { fileTypeFromBuffer } from 'file-type';

interface FileTypeResult {
   mime: string;
}

async function detectContentType(buffer: Buffer): Promise<string | null> {
   const result: FileTypeResult | undefined = await fileTypeFromBuffer(buffer);
   return result ? result.mime : null;
}
export default detectContentType;
