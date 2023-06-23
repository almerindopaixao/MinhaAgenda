import { createHash } from 'crypto'

export function createHashMD5(value) {
    return createHash('md5').update(value).digest('hex')
}