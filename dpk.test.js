const { deterministicPartitionKey } = require('./dpk')
const crypto = require('crypto')

describe('deterministicPartitionKey', () => {
  test('should return "0" for undefined or null event', () => {
    expect(deterministicPartitionKey(undefined)).toBe('0')
    expect(deterministicPartitionKey(null)).toBe('0')
  })

  test('should return the event.partitionKey if present', () => {
    const event = { partitionKey: 'partition-key' }
    expect(deterministicPartitionKey(event)).toBe(event.partitionKey)
  })

  test('should hash the event data if no partitionKey is present', () => {
    const event = { data: 'event-data' }
    const hash = crypto
      .createHash('sha3-512')
      .update(JSON.stringify(event))
      .digest('hex')
    expect(deterministicPartitionKey(event)).toBe(hash)
  })

  test('should convert non-string partitionKey candidates to string', () => {
    const event = { partitionKey: 123 }
    expect(deterministicPartitionKey(event)).toBe('123')
  })

  test('should hash the partitionKey if its length exceeds MAX_PARTITION_KEY_LENGTH', () => {
    const partitionKey = 'x'.repeat(257)
    const hash = crypto
      .createHash('sha3-512')
      .update(partitionKey)
      .digest('hex')
    const event = { partitionKey }
    expect(deterministicPartitionKey(event)).toBe(hash)
  })
})
