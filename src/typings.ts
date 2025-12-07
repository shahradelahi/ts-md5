export type Message = ArrayBufferLike | Uint8Array | Iterable<number> | string;

export interface Options {
  encoding?: 'binary' | 'utf8';
}

export type Md5 = (message: Message, options?: Options) => Uint8Array;
