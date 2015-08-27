(function() {
  var NamedType, expandBlockHead, htmlBlock, htmlInline, instance, match, ref, ref1, sample, samples, show, typeclass;

  require('coffee-mate/global');

  ref = require('./typeclass'), typeclass = ref.typeclass, instance = ref.instance;

  ref1 = require('./typespec'), match = ref1.match, show = ref1.show, samples = ref1.samples, sample = ref1.sample, htmlInline = ref1.htmlInline, htmlBlock = ref1.htmlBlock;

  expandBlockHead = require('./helpers').expandBlockHead;

  NamedType = (function() {
    function NamedType(arg) {
      var check, desc, name, samples, spec;
      name = arg.name, spec = arg.spec, desc = arg.desc, check = arg.check, samples = arg.samples;
      if ((name == null) || (spec == null)) {
        throw Error('name & spec must be specified for a NamedType declaration');
      }
      assert(function() {
        return typeclass('TypeSpec').hasInstance(spec.constructor);
      });
      if ((samples != null) && !all(match(spec))(take(100)(samples))) {
        log(function() {
          return name;
        });
        log(function() {
          return spec;
        });
        log(function() {
          return samples;
        });
        log(function() {
          return match(spec)(samples[0]);
        });
        throw TypeError('bad samples');
      }
      return {
        constructor: NamedType,
        name: name,
        spec: spec,
        desc: desc,
        check: check,
        samples: samples
      };
    }

    return NamedType;

  })();

  instance('TypeSpec')(NamedType).where({
    match: function(arg) {
      var check, spec;
      spec = arg.spec, check = arg.check;
      return function(v) {
        return match(spec)(v) && (check != null ? check(v) : true);
      };
    },
    show: function(arg) {
      var name, spec;
      name = arg.name, spec = arg.spec;
      return name || (show(spec));
    },
    samples: function(arg) {
      var ls, spec;
      spec = arg.spec, ls = arg.samples;
      if (ls != null) {
        return concat(repeat(ls));
      } else {
        return samples(spec);
      }
    },
    htmlInline: function(arg) {
      var name, spec;
      name = arg.name, spec = arg.spec;
      if (name != null) {
        return "<span class='type-name'>" + name + "</span>";
      } else {
        return htmlInline(spec);
      }
    },
    htmlBlock: function(arg) {
      var name, ref2, spec;
      name = arg.name, spec = arg.spec;
      return (ref2 = expandBlockHead(function(head) {
        return "<span><span class='type-name'>" + name + "</span><span class='spliter'>spec:</span>" + head + "</span>";
      })(spec)) != null ? ref2 : {
        head: "<span><span class='type-name'>" + name + "</span><span class='spliter'>spec:</span>" + (htmlInline(spec)) + "</span>"
      };
    },
    showHtml: function(t) {
      var check, checkPart, desc, descriptionPart, name, namePart, samplePart, spec, specPart;
      name = t.name, desc = t.desc, spec = t.spec, check = t.check;
      namePart = name == null ? '' : "<div class='name'>\n<span class='meta-field'>name</span>: <span class='type-name'>" + name + "</span>\n</div>";
      descriptionPart = desc == null ? '' : (function() {
        var s;
        s = desc;
        return "<div class='desc'>\n<span class='meta-field'>desc</span>: " + (/\n/.test(s) ? "<pre class='text'>" + s + "</pre>" : "<span class='text'>" + s + "</span>") + "\n</div>";
      })();
      specPart = (function() {
        var block, ref2, ref3;
        block = htmlBlock(spec);
        return ("<div class='spec'>\n<div class='" + (block != null ? 'fold' : 'inline') + "'><span class='meta-field'>spec</span>: " + (htmlInline(spec)) + "</div>\n" + (block != null ? "<div class='unfold'>\n	<span class='meta-field'>spec</span>: " + block.head + "\n	" + ((ref2 = block.body) != null ? ref2 : '') + "\n	" + ((ref3 = block.tail) != null ? ref3 : '') + "\n</div>" : '') + "\n</div>").replace(/(\t|\n)/g, '');
      })();
      samplePart = (function() {
        var s;
        s = json(sample(t), 4);
        return "<div class='sample'>\n<span class='meta-field'>sample</span>: " + (/\n/.test(s) ? "<pre class='code'>" + s + "</pre>" : "<span class='code'>" + s + "</span>") + "\n</div>";
      })();
      checkPart = check == null ? '' : (function() {
        var s;
        s = check.toString();
        return "<div class='check'>\n<span class='meta-field'>constraint</span>: " + (/\n/.test(s) ? "<pre class='code'>" + s + "</pre>" : "<span class='code'>" + s + "</span>") + "\n</div>";
      })();
      return "<div class='typespec'>" + (namePart + descriptionPart + specPart + samplePart + checkPart) + "</div>";
    }
  });

  module.exports = {
    NamedType: NamedType
  };

}).call(this);

//# sourceMappingURL=prim-namedtype.js.map