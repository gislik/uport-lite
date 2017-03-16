import UportLite from '../index'
const registry = UportLite()
// uPortProfileIPFS1220 => 75506f727450726f66696c654950465331323230
//"uPortProfileIPFS1220","0xb08e78b8E17dC2874818d7F49055aBf08Ee9977D","0xB0F288F8EFA511962E11E37488DB0D2BCC7A5F304B1D4F3977EB0EC65814A52C"

it('finds valid default profile using old API', () => {
  return new Promise((resolve, reject) => {
    registry('2oVdmcz7BkWozm2JE4hHixRV8s5y3STqhPG', (error, profile) => {
      if (error) return reject(error)
      resolve(profile)
    })
  }).then(profile => {
    return expect(profile.publicKey).toEqual('0x0482780d59037778ea03c7d5169dd7cf47a835cb6d57a606b4e6cf98000a28d20d6d6bfae223cc76fd2f63d8a382a1c054788c4fafb1062ee89e718b96e0896d40')
  })
})

it('finds valid advanced profile using new API', () => {
  return new Promise((resolve, reject) => {
    registry('2oVdmcz7BkWozm2JE4hHixRV8s5y3STqhPG', (error, profile) => {
      if (error) return reject(error)
      resolve(profile)
    }, '2oVdmcz7BkWozm2JE4hHixRV8s5y3STqhPG', 'uPortProfileIPFS1220')
  }).then(profile => {
    return expect(profile.publicKey).toEqual('0x0482780d59037778ea03c7d5169dd7cf47a835cb6d57a606b4e6cf98000a28d20d6d6bfae223cc76fd2f63d8a382a1c054788c4fafb1062ee89e718b96e0896d40')
  })
})

it('returns null if it profile doesnt exist', () => {
  return new Promise((resolve, reject) => {
    registry('2oJvyeFwEbtLsuJ7G7bcUFPocuEU8AdeHKs', (error, profile) => {
      if (error) return reject(error)
      resolve(profile)
    })
  }).then(profile => {
    return expect(profile).toBeUndefined()
  })
})

it('returns error for unsupported network', () => {
  return new Promise((resolve, reject) => {
    registry('5A8bRWU3F7j3REx3vkJWxdjQPp4tqmxFPmab1Tr', (error, profile) => {
      if (error) return reject(error)
      resolve(profile)
    })
  }).catch(error => {
    return expect(error.message).toBe('Network id 0x94365e3a is not configured')
  })
})

it('returns error if issuer and subject are on different networks', () => {
  return new Promise((resolve, reject) => {
    registry('2oVdmcz7BkWozm2JE4hHixRV8s5y3STqhPG', (error, profile) => {
      if (error) return reject(error)
      resolve(profile)
    }, '2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX', 'uPortProfileIPFS1220')
  }).catch(error => {
    return expect(error.message).toBe('Issuer and subject must be on the same network')
  })
})
