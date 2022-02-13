import serialize from 'serialize-javascript';

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const renderObject = (data: unknown) => serialize(data).replace(/</g, '\\\u003c');
