(function() {
  var Tree, expandBlockHead, htmlBlock, htmlInline, instance, match, ref, ref1, sample, samples, show, typeclass;

  require('coffee-mate/global');

  ref = require('./typeclass'), typeclass = ref.typeclass, instance = ref.instance;

  ref1 = require('./typespec'), match = ref1.match, show = ref1.show, samples = ref1.samples, sample = ref1.sample, htmlInline = ref1.htmlInline, htmlBlock = ref1.htmlBlock;

  expandBlockHead = require('./helpers').expandBlockHead;

  Tree = (function() {
    function Tree(labelSpec) {
      assert(function() {
        return typeclass('TypeSpec').hasInstance(labelSpec.constructor);
      });
      return {
        constructor: Tree,
        labelSpec: labelSpec
      };
    }

    return Tree;

  })();

  instance('TypeSpec')(Tree).where({
    match: function(t) {
      return function(v) {
        var labelSpec, ml;
        labelSpec = t.labelSpec;
        ml = match(labelSpec);
        return (v != null) && typeof v === 'object' && ml(v.rootLabel) && all(ml)(map(pluck('rootLabel'))(v.subForest));
      };
    },
    show: function(arg) {
      var labelSpec;
      labelSpec = arg.labelSpec;
      return "Tree " + (show(labelSpec));
    },
    samples: function(arg) {
      var labelSpec, ls, s0, s1;
      labelSpec = arg.labelSpec;
      ls = list(take(2)(samples(labelSpec)));
      s0 = {
        rootLabel: ls[0],
        subForest: []
      };
      s1 = {
        rootLabel: ls[1],
        subForest: [s0]
      };
      return concat(repeat([s0, s1]));
    },
    htmlInline: function(arg) {
      var labelSpec;
      labelSpec = arg.labelSpec;
      return "<span class='type-maker unwrapped'>Tree " + (htmlInline(labelSpec)) + "</span>";
    },
    htmlBlock: function(arg) {
      var labelSpec;
      labelSpec = arg.labelSpec;
      return expandBlockHead(function(head) {
        return "<span class='type-maker'>Tree " + head + "</span>";
      })(labelSpec);
    }
  });

  module.exports = {
    Tree: Tree
  };

}).call(this);

//# sourceMappingURL=prim-tree.js.map