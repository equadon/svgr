export default (code, opts) => code.replace(new RegExp(opts.old, 'g'), opts.new)
