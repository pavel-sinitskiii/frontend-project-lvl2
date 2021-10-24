const result = {
  flat: `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`,
  nested: `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`,
  plaint: `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`,
  json: '[{"name":"common","type":"nested","value":[{"name":"follow","type":"added","value":false},{"name":"setting1","type":"unchanged","value":"Value 1"},{"name":"setting2","type":"removed","value":200},{"name":"setting3","type":"updated","value1":true,"value2":null},{"name":"setting4","type":"added","value":"blah blah"},{"name":"setting5","type":"added","value":{"key5":"value5"}},{"name":"setting6","type":"nested","value":[{"name":"doge","type":"nested","value":[{"name":"wow","type":"updated","value1":"","value2":"so much"}]},{"name":"key","type":"unchanged","value":"value"},{"name":"ops","type":"added","value":"vops"}]}]},{"name":"group1","type":"nested","value":[{"name":"baz","type":"updated","value1":"bas","value2":"bars"},{"name":"foo","type":"unchanged","value":"bar"},{"name":"nest","type":"updated","value1":{"key":"value"},"value2":"str"}]},{"name":"group2","type":"removed","value":{"abc":12345,"deep":{"id":45}}},{"name":"group3","type":"added","value":{"deep":{"id":{"number":45}},"fee":100500}}]',
};
export default result;
