require 'coffee-mate/global'
{typeclass, instance} = require '../typeclass'
{match, show, samples, sample, htmlInline, htmlBlock} = require '../typespec'
{genBlockBody} = require '../helpers'

class Fn
	constructor: (ispec) ->
		unless ispec? and typeclass('TypeSpec').hasInstance(ispec.constructor)
			throw Error "Bad Fn Definition: TypeSpec as ispec Expected, But Got #{ispec}"
		return (ospec) ->
			unless ospec? and typeclass('TypeSpec').hasInstance(ospec.constructor)
				throw Error "Bad Fn Definition: TypeSpec as ospec Expected, But Got #{ospec}"
			constructor: Fn
			ispec: ispec
			ospec: ospec

instance('TypeSpec')(Fn).where
	match: ({ispec, ospec}) -> (v) ->
		v? and v.constructor is Function #TODO: how to be precise ?
	withSpec: ({ispec, ospec}) -> (v) ->
		if not (v? and v.constructor is Function)
			throw TypeError {expected: 'Function', got: v}
		else
			return (x) ->
				withSpec(ispec)(x)
				y = v(x)
				withSpec(ospec)(y)
				return y
	show: ({ispec, ospec}) ->
		"Fn(#{show ispec})(#{show ospec})"
	samples: ({ispec, ospec}) ->
		repeat {"[input]": (sample ispec), "[output]": (sample ospec)}
	htmlInline: ({ispec, ospec}) ->
		"<span class='type-maker unwrapped'>#{htmlInline ispec} -> #{htmlInline ospec}</span>"
	htmlBlock: ({ispec, ospec}) ->
		head: "<span class='type-maker'>Function (</span>"
		body: genBlockBody('function', 'meta-field') {input: ispec, output: ospec}
		tail: "<span class='type-maker'>)</span>"

module.exports = {Fn}
