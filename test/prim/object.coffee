{match, show} = require '../../src/'

describe 'prim/Object', ->
	describe 'match', ->
		it 'doesnt match undefined/null', ->
			assert -> match({})(undefined) is no
			assert -> match({})(null) is no
			assert -> match({x: Number, y: String})(undefined) is no
			assert -> match({x: Number, y: String})(null) is no
		it 'doesnt match values of any other types', ->
			assert -> match({x: Number, y: String})(true) is no
			assert -> match({x: Number, y: String})(1) is no
			assert -> match({x: Number, y: String})('c') is no
		it 'doesnt match objects with wrong keys', ->
			assert -> match({x: Number, y: String})({}) is no
			assert -> match({x: Number, y: String})({x: 1}) is no
			assert -> match({x: Number, y: String})({x: 1, z: 'a'}) is no
			assert -> match({x: Number, y: String})({x: 1, y: 'abc', z: 2}) is no
		it 'doesnt match objects with correct keys but wrong values', ->
			assert -> match({x: Number, y: String})({x: 1, y: 2}) is no
			assert -> match({x: Number, y: String})({x: 'abc', y: 'abc'}) is no
		it 'matches objects with correct keys and values', ->
			assert -> match({})({}) is yes
			assert -> match({x: Number, y: String})({x: 1, y: ''}) is yes
			assert -> match({x: Number, y: String})({x: 1.23, y: 'abc'}) is yes

