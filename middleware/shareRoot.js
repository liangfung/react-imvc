/**
 * 对 req.url 进行裁剪，以便适应不同的发布路径
 */
module.exports = function shareRoot(rootPath) {
  if (rootPath.charAt(rootPath.length - 1) === '/') {
    rootPath = rootPath.substr(0, rootPath.length - 1)
  }

  var ROOT_RE = new RegExp('^' + rootPath, 'i')
  return function(req, res, next) {
    if (ROOT_RE.test(req.url)) {
      req.url = req.url.replace(ROOT_RE, '')
      req.basename = rootPath
      if (req.url.charAt(0) !== '/') {
        req.url = '/' + req.url
      }
    } else if (!req.basename) {
      req.basename = ''
    }
    next()
  }
}