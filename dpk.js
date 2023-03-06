const crypto = require('crypto')

exports.deterministicPartitionKey = event => {
  const TRIVIAL_PARTITION_KEY = '0'
  const MAX_PARTITION_KEY_LENGTH = 256

  if (!event) return TRIVIAL_PARTITION_KEY

  const candidate =
    event.partitionKey ??
    crypto.createHash('sha3-512').update(JSON.stringify(event)).digest('hex')
  const partitionKey =
    typeof candidate !== 'string' ? String(candidate) : candidate

  return partitionKey.length > MAX_PARTITION_KEY_LENGTH
    ? crypto.createHash('sha3-512').update(partitionKey).digest('hex')
    : partitionKey
}
